import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import classes from './Results.module.css';
import Loader from '../../components/Loader/Loader';
import ProductCard from '../../components/Product/ProductCard';
import { useParams } from 'react-router';
import axios from 'axios';

function Results() {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { categoryName } = useParams();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setIsLoading(true);

        let url = 'https://fakestoreapi.com/products';
        if (categoryName) {
          url = `https://fakestoreapi.com/products/category/${categoryName}`;
        }

        const response = await axios.get(url);
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
  }, [categoryName]);

  return (
    <Layout>
      <section className={classes.results_container}>
        <div className={classes.results_header}>
          <h1>Results</h1>
          <p>{categoryName ? `Category / ${categoryName}` : 'All Products'}</p>
        </div>
        <hr />

        {isLoading ? (
          <Loader />
        ) : error ? (
          <div className={classes.no_results}>
            <h2>{error}</h2>
          </div>
        ) : (
          <div className={classes.products_container}>
            {results.length > 0 ? (
              results.map((product) => (
                <div key={product.id} className={classes.product_card}>
                  <ProductCard
                    product={product}
                    renderAdd={true}
                  />
                </div>
              ))
            ) : (
              <div className={classes.no_results}>
                <h2>No products found</h2>
              </div>
            )}
          </div>
        )}
      </section>
    </Layout>
  );
}

export default Results;
