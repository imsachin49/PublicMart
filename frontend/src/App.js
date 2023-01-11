import Home from './pages/Home'
import Navbar from './components/navbar/Navbar';
import Products from './components/products/Products';
import Login from './components/auth/login/Login';
import Register from './components/auth/register/Register';
import SingleProduct from './components/single/SingleProduct';
import Success from './pages/Success';
import {  BrowserRouter as Router ,Routes,Route,Navigate} from "react-router-dom";
import React from 'react';
import ProductType from './pages/productType/ProductType';
import Cart from './pages/cart/Cart';
import {useState,useEffect} from 'react';
// import MyCart from './components/myCart/MyCart';

function App() {
  // console.log("hello hello");
  const user=true;
  return (
    <>
     <Router >
      <Navbar user={user} />
      <Routes>
        <Route path='/' element={<Home />} />
        {<Route path='/login' element={user ? <Navigate to='/' /> : <Login/> } />}
        {<Route path='/register' element={user ? <Navigate to='/' /> : <Register/> } />}
        <Route path='/products/:category' element={<ProductType />} />
        <Route path='/product/:id' element={<SingleProduct />} />
        <Route path='/cart' element={<Cart />} />        
        <Route path='/success' element={<Success/>}/>
      </Routes>
     </Router>
    </>
  );
}

export default App;
