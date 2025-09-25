import React from 'react';
import classes from './category.module.css';

const CategoryCard = ({ data }) => {
  return (
    <div className={classes.category}>
      <a href="/" className={classes.categoryLink}>
        <span className={classes.categoryContent}>
          <h2 className={classes.categoryTitle}>{data.title}</h2>
          <img 
            src={data.imageLink} 
            alt={data.title}
            className={classes.categoryImage}
          />
          <p className={classes.categoryShop}>Shop now</p>
        </span>
      </a>
    </div>
  );
};

export default CategoryCard;