import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { axiosInstance } from "../../Api/axios"; 
import { DataContext } from "../../components/DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";
import CurrencyFormat from "../../components/CurrencyFormat/CurrencyFormat";
import classes from "./Payment.module.css";

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

  // calculate total price
  const getBasketTotal = (basket) =>
    basket?.reduce((amount, item) => item.price * item.qty + amount, 0);

  // Generate Stripe client secret whenever basket changes
  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axiosInstance.post(
        `/payments/create?total=${Math.round(getBasketTotal(basket) * 100)}`
      );
      setClientSecret(response.data.clientSecret);
    };
    if (basket.length > 0) getClientSecret();
  }, [basket]);

  // Handle payment
  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        setSucceeded(true);
        setError(null);
        setProcessing(false);

        // clear basket
        dispatch({
          type: Type.EMPTY_BASKET,
        });

        navigate("/orders");
      })
      .catch((err) => {
        setError(err.message);
        setProcessing(false);
      });
  };

  const handleChange = (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  return (
    <div className={classes.payment}>
      <h1>
        Checkout (<span>{basket?.length} items</span>)
      </h1>

      {/* Delivery section */}
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

      {/* Review section */}
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

      {/* Payment section */}
      <div className={classes.payment__section}>
        <div className={classes.payment__title}>
          <h3>Payment Method</h3>
        </div>
        <div className={classes.payment__details}>
          <form onSubmit={handleSubmit}>
            <CardElement
              onChange={handleChange}
              className={classes.cardElement}
            />

            <div className={classes.payment__priceContainer}>
              <CurrencyFormat amount={getBasketTotal(basket)} />
              <button
                disabled={processing || disabled || succeeded}
                type="submit"
              >
                {processing ? "Processing..." : "Pay Now"}
              </button>
            </div>

            {error && <div className={classes.error}>{error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Payment;
