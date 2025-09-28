import React from 'react'
import Layout from '../../components/Layout/Layout'
import classes from './ProductDetail.module.css'
import { useParams } from 'react-router'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { productUrl } from '../../Api/endPoints';
import Loader from '../../components/Loader/Loader';

function ProductDetail() {
  const { productId } = useParams();
  console.log("Product ID:", productId);
  
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${productUrl}/${productId}`);
        setProduct(response.data);
        setError(null);
      } catch (err) {
        console.log("Error fetching product:", err);
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]); 

  if (loading) {
    return (
      <Layout>
        <Loader />
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className={classes.error}>{error}</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={classes.productDetail}>
        <h1>Product Details</h1>
        <div className={classes.productContent}>
          <img src={product.image} alt={product.title} className={classes.productImage} />
          <div className={classes.productInfo}>
            <h2>{product.title}</h2>
            <p className={classes.price}>${product.price}</p>
            <p className={classes.description}>{product.description}</p>
            <p className={classes.category}>Category: {product.category}</p>
            <button className={classes.addToCart}>Add to Cart</button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ProductDetail;