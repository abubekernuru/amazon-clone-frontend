import React, { useContext } from 'react';
import Layout from '../../components/Layout/Layout';
import { DataContext } from '../../components/DataProvider/DataProvider';
import CurrencyFormat from '../../components/CurrencyFormat/CurrencyFormat';
import ProductCard from '../../components/Product/ProductCard';
import styles from './Cart.module.css';

function Cart() {
  const [{ basket }] = useContext(DataContext);

  // Total price
  const total = basket.reduce(
    (amount, item) => amount + item.price * (item.qty || 1),
    0
  );

  // Total items
  const itemCount = basket.reduce(
    (count, item) => count + (item.qty || 1),
    0
  );

  return (
    <Layout>
      <section className={styles.cart}>
        {/* Left side - Basket Items */}
        <div className={styles.cart__items}>
          <h2>Hello</h2>
          <h3>Your shopping basket</h3>
          <hr />

          {basket.length === 0 ? (
            <p>Oops! No item in your cart</p>
          ) : (
            basket.map((item, i) => (
              <ProductCard
                key={i}
                product={item}
                renderDest={true}
                flex={true}
                renderAdd={false} // hide "Add to Cart" button
              />
            ))
          )}
        </div>

        {/* Right side - Subtotal */}
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
            <button className={styles.cart__checkout}>
              Proceed to Checkout
            </button>
          </div>
        )}
      </section>
    </Layout>
  );
}

export default Cart;
