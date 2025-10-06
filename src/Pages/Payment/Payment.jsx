import React, { useContext, useState } from "react";
import classes from "./Payment.module.css";
import Layout from "../../components/Layout/Layout";
import { DataContext } from "../../components/DataProvider/DataProvider";
import CurrencyFormat from "../../components/CurrencyFormat/CurrencyFormat";

function Payment() {
  const [{ basket, user }] = useContext(DataContext);

  // form states
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardError, setCardError] = useState("");
  const [success, setSuccess] = useState(false);

  // calculate totals
  const totalItems = basket.reduce((count, item) => count + (item.qty || 1), 0);
  const totalPrice = basket.reduce(
    (amount, item) => amount + item.price * (item.qty || 1),
    0
  );

  // simple form validation
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!cardNumber || !expiry || !cvv) {
      setCardError("Please fill in all card details.");
      setSuccess(false);
      return;
    }

    if (cardNumber.length < 16) {
      setCardError("Invalid card number. Must be 16 digits.");
      setSuccess(false);
      return;
    }

    setCardError("");
    setSuccess(true);
  };

  return (
    <Layout>
      {/* Header */}
      <div className={classes.payment__header}>
        <h2>
          Checkout (<span>{totalItems}</span> items)
        </h2>
      </div>

      <section className={classes.payment}>
        {/* 1️⃣ Address */}
        <div className={classes.payment__section}>
          <div className={classes.payment__title}>
            <h3>Delivery Address</h3>
          </div>
          <div className={classes.payment__address}>
            <p>{user?.email || "guest@example.com"}</p>
            <p>Addis Ababa, Ethiopia</p>
            <p>Phone: +251 978 146 473</p>
          </div>
        </div>

        <hr />

        {/* 2️⃣ Review Items */}
        <div className={classes.payment__section}>
          <div className={classes.payment__title}>
            <h3>Review Items</h3>
          </div>
          <div className={classes.payment__items}>
            {basket.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              basket.map((item, index) => (
                <div key={index} className={classes.payment__item}>
                  <img src={item.image} alt={item.title} />
                  <div>
                    <p>{item.title}</p>
                    <p>${item.price.toFixed(2)}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <hr />

        {/* 3️⃣ Card Form */}
        <div className={classes.payment__section}>
          <div className={classes.payment__title}>
            <h3>Payment Method</h3>
          </div>

          <form className={classes.payment__form} onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Card Number (16 digits)"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className={classes.card}
              maxLength="16"
            />
            <div style={{ display: "flex", gap: "10px" }}>
              <input
                type="text"
                placeholder="MM/YY"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                className={classes.card}
              />
              <input
                type="text"
                placeholder="CVV"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                className={classes.card}
                maxLength="3"
              />
            </div>

            <div>
              <p>
                Total order: <CurrencyFormat amount={totalPrice} />
              </p>
            </div>

            {cardError && <small className={classes.error}>{cardError}</small>}
            {success && (
              <small className={classes.success}>
                ✅ Payment successful! Your order has been placed.
              </small>
            )}

            <button type="submit" className={classes.payment__button}>
              Place Your Order
            </button>
          </form>
        </div>
      </section>
    </Layout>
  );
}

export default Payment;
