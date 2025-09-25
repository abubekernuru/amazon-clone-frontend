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

/*
  for my amazone clone website I've currently created the category component i will paste the four files included in this file and give you corrections you will do after finishing pasting the four files

  for categoryFullInfos.js change only the categories to Electronics, Discover fashion trends,Men's Clothing and Jewelery with only three key-value pair: title, name and imageLink

  for category.module.css style it beginner friendly simply like for example the 
    .category{
    height: 350px
    width: 350px
    bgc: white
    boxshadow; black .2 opacity
    }

    .category__container{
    position: relative
    margin-top: -10%
    display: grid
    grid-template-columns: repeat(4,1fr)
    place-items: center
    }
*/