import React from 'react';
import { Link } from 'react-router';
import classes from './category.module.css';

const CategoryCard = ({ data }) => {
  return (
    <div className={classes.category}>
      <Link to={`/results/${data.name}`} className={classes.categoryLink}>
        <span className={classes.categoryContent}>
          <h2 className={classes.categoryTitle}>{data.title}</h2>
          <img 
            src={data.imageLink} 
            alt={data.title}
            className={classes.categoryImage}
          />
          <p className={classes.categoryShop}>Shop now</p>
        </span>
      </Link>
    </div>
  );
};

export default CategoryCard;
