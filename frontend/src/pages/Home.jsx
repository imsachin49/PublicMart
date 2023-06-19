import React from 'react'
import Carousel from '../components/Carousel/Carousel'
import Categories from '../components/categories/Categories'
import Products from '../components/products/Products'
import Footer from '../components/footer/Footer'
import './Home.css';
import NewsLetter from '../components/NewsLetter/NewsLetter'
import AOS from 'aos';
import 'aos/dist/aos.css'; 

AOS.init();

const Home = () => {
  return (
    <div className='home'>
      <Carousel /> 
      <Categories />
      <Products />
      <NewsLetter />
      <Footer />
    </div>
  )
}

export default Home
