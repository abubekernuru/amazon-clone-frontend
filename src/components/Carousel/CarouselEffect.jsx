import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import classes from './Carousel.module.css';
import { img } from './img/data';

const AmazonCarousel = () => {
  return (
    <div className={classes.carousel}>
      <Carousel
        autoPlay
        infiniteLoop
        interval={8000}
        showStatus={false}
        showThumbs={false}
        showIndicators={false}
        stopOnHover={false}
        transitionTime={1000} 
      >
        {img.map((image, index) => (
          <div key={index}>
            <img 
              src={image} 
              alt={`Amazon Deal ${index + 1}`}
              className={classes.carousel__image}
            />
          </div>
        ))}
      </Carousel>
      
      {/* Simple gradient */}
      <div className={classes.carousel__gradient}></div>
    </div>
  );
};

export default AmazonCarousel;