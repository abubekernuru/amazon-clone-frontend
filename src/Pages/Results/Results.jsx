import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout/Layout'
import classes from './Results.module.css'
import Loader from '../../components/Loader/Loader'
import ProductCard from '../../components/Product/ProductCard'
import { useParams } from 'react-router'
import axios from 'axios'

function Results() {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { categoryName } = useParams(); // Get category from URL if needed

  // This would typically fetch filtered products based on search or category
  useEffect(() => {
    const fetchResults = async () => {
      try {
        setIsLoading(true);
        // Example: Fetch all products or filtered products
        const response = await axios.get('https://fakestoreapi.com/products');
        setResults(response.data);
        setError(null);
      } catch (err) {
        console.log('Error fetching results:', err);
        setError('Failed to load results');
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, []); // Add dependencies here if you want to refetch when category changes

  return (
    <Layout>
      <section>
        <h1 style={{ padding: '30px' }}>Results</h1>
        <p style={{ padding: '30px' }}>
          {categoryName ? `Category / ${categoryName}` : 'All Products'}
        </p>
        <hr />
        
        {isLoading ? (
          <Loader />
        ) : error ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <h2>{error}</h2>
          </div>
        ) : (
          <div className={classes.products_container}>
            {results.length > 0 ? (
              results.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: '50px' }}>
                <h2>No products found</h2>
              </div>
            )}
          </div>
        )}
      </section>
    </Layout>
  )
}

export default Results