import {  BrowserRouter as Router ,Routes,Route} from "react-router-dom";
import {useState,useEffect} from 'react';
import Navbar from './components/navbar/Navbar';
import Products from './components/products/Products';
import Login from './components/auth/login/Login';
import Register from './components/auth/register/Register';
import Success from './pages/success/Success';
import React from 'react';
import ProductType from './pages/productType/ProductType';
import Cart from './pages/cart/Cart';
import { useSelector } from 'react-redux';
import Single from './components/Singles/Single';
import Search from './components/search/Search';
import Reviews from './components/reviews/Reviews';
import ScrollToTop from './Scroll';
import Home from './pages/home/Home';

function App() {
  const user=useSelector(state=>state.user.currentUser);
  // checking if user is logged in or not
  const [isLogged,setIsLogged]=useState(false);
  
  useEffect(()=>{
    if(user){
      setIsLogged(true);
    }
  },[user])
  
  return (
    <>
     <Router >
      <Navbar user={user} />
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login/> } />
        <Route path='/register' element={<Register/> } />
        <Route path='/products/:category' element={<ProductType />} />
        <Route path='/product/:id' element={<Single />} />
        <Route path='/cart' element={isLogged ? <Cart /> : <Home/>} />        
        <Route path='/success' element={<Success/>}/>
        <Route path='/single' element={<Single/>}/>  
        <Route path='/search' element={<Search/>}/>  
        <Route path='/reviews' element={<Reviews />} />
      </Routes>
     </Router>
      {/* <Navbar /> */}
    </>
  );
}

export default App;
