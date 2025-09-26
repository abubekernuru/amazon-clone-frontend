import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCard from './ProductCard';
import styles from './Product.module.css';


function Product() {
    const [products, setProducts] = useState([]);
    useEffect(()=>{
        axios.get('https://fakestoreapi.com/products')
        .then((res)=>{
            setProducts(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    }, [])
    return (
        <section className={styles.productsContainer}>
            {products.length > 0 ? (
                products.map((singleProduct) => (
                    <ProductCard key={singleProduct.id} product={singleProduct} />
                ))
            ) : (
                <h2>No products found</h2>
            )}
        </section>
    );
}
export default Product;