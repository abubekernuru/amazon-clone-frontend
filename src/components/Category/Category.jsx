import React from 'react';
import CategoryCard from './CategoryCard';
import { categoryInfos } from './categoryFullInfos';
import classes from './category.module.css';

const Category = () => {
  return (
    <section className={classes.category__container}>
      {categoryInfos.map((info, index) => (
        <CategoryCard key={index} data={info} />
      ))}
    </section>
  );
};

export default Category;
