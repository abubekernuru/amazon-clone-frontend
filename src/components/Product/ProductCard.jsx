import React, { useContext } from 'react'
import Rating from '@mui/material/Rating'
import CurrencyFormat from '../CurrencyFormat/CurrencyFormat'
import styles from './Product.module.css'
import { Link } from 'react-router'
import { DataContext } from '../DataProvider/DataProvider'
import { Type } from '../../Utility/action.type'

function ProductCard({ product, renderAdd }) {
  const { image, title, id, rating, price } = product;
  const productRating = rating?.rate || 0;
  const ratingCount = rating?.count || 0;

  const [, dispatch] = useContext(DataContext);

  const addToBasket = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: {
        id,
        title,
        image,
        price,
        rating
      }
    });
  };

  return (
    <div className={styles.productCard}>
      <Link to={`/product/${id}`} className={styles.productLink}> 
        <img 
          src={image} 
          alt={title} 
          className={styles.productImage}
        />
      </Link>
      <div className={styles.productInfo}>
        <h3 className={styles.productTitle}>{title}</h3>
        <div className={styles.productRating}>
          <Rating 
            value={productRating} 
            precision={0.1} 
            readOnly
            size="small"
          />
          <small className={styles.ratingCount}>({ratingCount})</small>
        </div>
        <div className={styles.productPrice}>
          <CurrencyFormat amount={price} />
        </div>
      </div>
      { renderAdd && <button 
        className={styles.button}
        onClick={addToBasket}
      >
        Add to Cart
      </button>}
    </div>
  );
}

export default ProductCard;
