import {  BrowserRouter as Router ,Routes,Route} from "react-router-dom";
import {useState,useEffect} from 'react';
import Login from './pages/auth/login/Login';
import Register from './pages/auth/register/Register';
import Success from './pages/success/Success';
import React from 'react';
import ProductType from './pages/productType/ProductType';
import Cart from './pages/cart/Cart';
import { useSelector } from 'react-redux';
import Single from './pages/Singles/Single';
import Reviews from './components/reviews/Reviews';
import ScrollToTop from './Scroll';
import Home from './pages/home/Home';
import Nav2 from "./components/nav/Nav2";
import Search from "./pages/search/Search"

function App() {
  const user=useSelector(state=>state.user.currentUser);
  const [isLogged,setIsLogged]=useState(false);
  
  useEffect(()=>{
    if(user){
      setIsLogged(true);
    }
  },[user])
  
  return (
    <>
     <Router >
      <Nav2/>
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
        <Route path='/reviews' element={<Reviews />} />
        <Route path='/search' element={<Search />} />
      </Routes>
     </Router>
    </>
  );
}

export default App;
