import React, { useContext, useEffect, useState } from "react";
import classes from "./Orders.module.css";
import Layout from "../../components/Layout/Layout";
import { db } from "../../Utility/firebase";
import { DataContext } from "../../components/DataProvider/DataProvider";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import CurrencyFormat from "../../components/CurrencyFormat/CurrencyFormat";

function Orders() {
  const [{ user }] = useContext(DataContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      const ordersRef = collection(db, "users", user.uid, "orders");
      const q = query(ordersRef, orderBy("created", "desc"));
      const querySnapshot = await getDocs(q);

      const fetchedOrders = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setOrders(fetchedOrders);
    };

    fetchOrders();
  }, [user]);

  // Function to format Firestore timestamp
  const formatDate = (timestamp) => {
    if (!timestamp?.seconds) return "";
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Layout>
      <section className={classes.orders}>
        <h2>Your Orders</h2>

        {orders.length === 0 ? (
          <p className={classes.noOrders}>You have no orders yet.</p>
        ) : (
          orders.map((order) => (
            <div key={order.id} className={classes.order}>
              <div className={classes.orderHeader}>
                <p><strong>Order ID:</strong> {order.id}</p>
                <p><strong>Ordered on:</strong> {formatDate(order.created)}</p>
                <p className={classes.total}>
                  <CurrencyFormat amount={order.amount} />
                </p>
              </div>

              <div className={classes.orderItems}>
                {order.basket.map((item) => (
                  <div key={item.id} className={classes.item}>
                    <img src={item.image} alt={item.title} />
                    <div className={classes.itemDetails}>
                      <p>{item.title}</p>
                      <p>
                        <CurrencyFormat amount={item.price} /> × {item.qty}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </section>
    </Layout>
  );
}

export default Orders;
