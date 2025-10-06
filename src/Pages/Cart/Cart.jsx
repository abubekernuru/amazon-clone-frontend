import React, { useContext } from 'react';
import Layout from '../../components/Layout/Layout';
import { DataContext } from '../../components/DataProvider/DataProvider';
import CurrencyFormat from '../../components/CurrencyFormat/CurrencyFormat';
import styles from './Cart.module.css';
import { Type } from '../../Utility/action.type';
import { AiOutlineUp, AiOutlineDown } from 'react-icons/ai'; 
import { Link } from 'react-router';

// Cart item component
const CartItem = ({ item }) => {
  const [, dispatch] = useContext(DataContext);

  const increment = () => {
    dispatch({ type: Type.ADD_TO_BASKET, item });
  };

  const decrement = () => {
    if (item.qty > 1) {
      dispatch({ type: Type.DECREASE_QTY, id: item.id });
    } else {
      dispatch({ type: Type.REMOVE_FROM_BASKET, id: item.id });
    }
  };

  return (
    <div className={styles.cartItem}>
      <img src={item.image} alt={item.title} className={styles.cartItemImg} />
      <div className={styles.cartItemInfo}>
        <h4>{item.title}</h4>
        <p>${item.price}</p>
        <div className={styles.qtyControl}>
          <button onClick={increment} className={styles.qtyBtn}>
            <AiOutlineUp size={16} />
          </button>
          <span>{item.qty}</span>
          <button onClick={decrement} className={styles.qtyBtn}>
            <AiOutlineDown size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

function Cart() {
  const [{ basket }] = useContext(DataContext);

  const total = basket.reduce(
    (amount, item) => amount + item.price * (item.qty || 1),
    0
  );

  const itemCount = basket.reduce(
    (count, item) => count + (item.qty || 1),
    0
  );

  return (
    <Layout>
      <section className={styles.cart}>
        <div className={styles.cart__items}>
          <h2>Hello</h2>
          <h3>Your shopping basket</h3>
          <hr />
          {basket.length === 0 ? (
            <p>Oops! No item in your cart</p>
          ) : (
            basket.map((item) => <CartItem key={item.id} item={item} />)
          )}
        </div>

        {basket.length !== 0 && (
          <div className={styles.cart__summary}>
            <p>
              Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'}):{' '}
              <strong>
                <CurrencyFormat amount={total.toFixed(2)} />
              </strong>
            </p>
            <div className={styles.cart__gift}>
              <input type="checkbox" />
              <span>This order contains a gift</span>
            </div>
            <Link to="/payments" className={styles.cart__checkout}>
              Proceed to Checkout
            </Link>
          </div>
        )}
      </section>
    </Layout>
  );
}

export default Cart;
