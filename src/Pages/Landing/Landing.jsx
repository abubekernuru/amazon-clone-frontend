import React from 'react'
import AmazonCarousel from '../../components/Carousel/CarouselEffect'
import Category from '../../components/Category/Category'
import Product from '../../components/Product/Product'
import Layout from '../../components/Layout/Layout'


function Landing() {
  return (
    <Layout>
        <AmazonCarousel />
        <Category />
        <Product />
    </Layout>
  )
}

export default Landing