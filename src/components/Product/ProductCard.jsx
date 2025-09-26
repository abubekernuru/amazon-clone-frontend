import React from 'react'
import Rating from '@mui/material/Rating'
import CurrencyFormat from '../CurrencyFormat/CurrencyFormat'
import styles from './Product.module.css'; // Add this import

function ProductCard({ product }) {
    const { image, title,  rating, price } = product;
    
    const productRating = rating?.rate || 0;
    const ratingCount = rating?.count || 0;

    return (
        <div className={styles.productCard}>
            <a href="/" className={styles.productLink}>
                <img 
                    src={image} 
                    alt={title} 
                    className={styles.productImage}
                />
            </a>
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
            <button 
                className={styles.button}
            >
                Add to Cart
            </button>
        </div>
    );
}


export default ProductCard;