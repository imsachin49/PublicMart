import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Carousel from '../components/Carousel/Carousel'
import Categories from '../components/categories/Categories'
import Products from '../components/products/Products'
import Footer from '../components/footer/Footer'

const Home = () => {
  return (
    <>
      <Carousel /> 
      <Categories />
      <Products />
      <Footer />
    </>
  )
}

export default Home
