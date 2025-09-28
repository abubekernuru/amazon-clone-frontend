import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCard from './ProductCard';
import styles from './Product.module.css';
import Loader from '../../components/Loader/Loader'; // Import Loader

function Product() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('https://fakestoreapi.com/products')
        .then((res) => {
            setProducts(res.data);
            setError(null);
        }).catch((err) => {
            console.log(err);
            setError('Failed to load products');
        }).finally(() => {
            setLoading(false); // This runs whether success or error
        });
    }, []);

    // Show loader while loading
    if (loading) {
        return <Loader />;
    }

    // Show error message if there's an error
    if (error) {
        return (
            <div style={{ textAlign: 'center', padding: '50px' }}>
                <h2>{error}</h2>
            </div>
        );
    }

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