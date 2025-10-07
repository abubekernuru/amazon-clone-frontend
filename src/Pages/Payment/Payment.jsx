import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { axiosInstance } from "../../Api/axios";
import { DataContext } from "../../components/DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";
import CurrencyFormat from "../../components/CurrencyFormat/CurrencyFormat";
import classes from "./Payment.module.css";
import Layout from "../../components/Layout/Layout";

// Firestore imports
import { db } from "../../Utility/firebase";
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";

const Payment = () => {
  const [{ basket, user }, dispatch] = useContext(DataContext);
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");

  // Calculate total basket amount
  const getBasketTotal = (basket) =>
    basket?.reduce((amount, item) => item.price * item.qty + amount, 0);

  // 🔹 Generate Stripe client secret whenever basket changes
  useEffect(() => {
    const getClientSecret = async () => {
      if (basket.length === 0) return;
      try {
        const response = await axiosInstance.post(
          `/payments/create?total=${Math.round(getBasketTotal(basket) * 100)}`
        );
        console.log("Client Secret fetched:", response.data.clientSecret);
        setClientSecret(response.data.clientSecret);
      } catch (err) {
        console.error("Error fetching client secret:", err);
        setError("Failed to initialize payment. Try again.");
      }
    };
    getClientSecret();
  }, [basket]);

  // 🔹 Handle payment submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setError(null);

    if (!stripe || !elements) {
      setError("Stripe has not loaded yet. Try again.");
      setProcessing(false);
      return;
    }

    if (!clientSecret) {
      setError("Payment system not ready. Please wait...");
      setProcessing(false);
      return;
    }

    try {
      console.log("Starting payment...");
      const cardElement = elements.getElement(CardElement);
      
      const { paymentIntent, error: stripeError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: user?.displayName || "Guest User",
            email: user?.email || "guest@example.com",
          },
        },
      });

      console.log("Payment result:", { paymentIntent, stripeError });

      if (stripeError) {
        console.error("Payment failed:", stripeError);
        setError(stripeError.message || "Payment failed");
        setProcessing(false);
        return;
      }

      if (paymentIntent && paymentIntent.status === "succeeded") {
        // ✅ Payment succeeded
        setSucceeded(true);
        setProcessing(false);
        setError(null);

        // Save order to Firestore
        if (user && paymentIntent.id) {
          try {
            await setDoc(
              doc(collection(db, "users", user.uid, "orders"), paymentIntent.id),
              {
                basket: basket,
                amount: paymentIntent.amount,
                created: serverTimestamp(),
              }
            );
            console.log("Order saved to Firestore:", paymentIntent.id);
          } catch (err) {
            console.error("Failed to save order:", err);
            // Don't fail the whole process if order saving fails
          }
        }

        // Clear basket from context
        dispatch({ type: Type.EMPTY_BASKET });

        // Navigate to orders page after a brief delay
        setTimeout(() => {
          navigate("/orders", { 
            state: { 
              paymentSuccess: true,
              orderId: paymentIntent.id 
            } 
          });
        }, 1500);

      } else {
        throw new Error("Payment did not succeed");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setError(err.message || "Payment failed, please try again.");
      setProcessing(false);
    }
  };

  // 🔹 Handle changes in CardElement
  const handleChange = (event) => {
    setDisabled(event.empty || !event.complete);
    setError(event.error ? event.error.message : "");
  };

  return (
    <Layout>
      <div className={classes.payment}>
        <h1>Checkout (<span>{basket?.length} items</span>)</h1>

        {/* Delivery Section */}
        <div className={classes.payment__section}>
          <div className={classes.payment__title}>
            <h3>Delivery Address</h3>
          </div>
          <div className={classes.payment__address}>
            <p>{user?.email || "guest@example.com"}</p>
            <p>123 React Lane</p>
            <p>Addis Ababa, Ethiopia</p>
          </div>
        </div>

        {/* Review Items */}
        <div className={classes.payment__section}>
          <div className={classes.payment__title}>
            <h3>Review Items</h3>
          </div>
          <div className={classes.payment__items}>
            {basket.map((item) => (
              <div key={item.id} className={classes.payment__item}>
                <img src={item.image} alt={item.title} />
                <div>
                  <p>{item.title}</p>
                  <p>
                    <CurrencyFormat amount={item.price} /> × {item.qty}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Method */}
        <div className={classes.payment__section}>
          <div className={classes.payment__title}>
            <h3>Payment Method</h3>
          </div>
          <div className={classes.payment__details}>
            <form onSubmit={handleSubmit}>
              <CardElement
                onChange={handleChange}
                className={classes.cardElement}
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#424770',
                      '::placeholder': {
                        color: '#aab7c4',
                      },
                    },
                  },
                }}
              />

              <div className={classes.payment__priceContainer}>
                <div className={classes.total}>
                  Order Total: <CurrencyFormat amount={getBasketTotal(basket)} />
                </div>
                <button
                  disabled={processing || disabled || succeeded || !clientSecret}
                  type="submit"
                  className={classes.payButton}
                >
                  {processing ? "Processing..." : succeeded ? "Payment Successful!" : `Pay Now`}
                </button>
              </div>

              {error && <div className={classes.error}>{error}</div>}
              {succeeded && (
                <div className={classes.success}>
                  Payment succeeded! Redirecting to orders...
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Payment;