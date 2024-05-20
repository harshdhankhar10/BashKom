import React from 'react'
import Navbar from "../components/Navbar";
import Carousel from '../components/Carousel';
import ProductsData from '../Products/ProductsData';
import CategoriesSection from '../Products/CategoriesSection';
const Home = () => {
  return (
    <>
      <Navbar />
      <Carousel />
      <ProductsData />
      <CategoriesSection />


    </>
  )
}

export default Home