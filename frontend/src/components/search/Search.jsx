import React from 'react'
import { useLocation } from 'react-router-dom'
import { useEffect,useState } from 'react';
import axios from 'axios';
import { publicRequest } from '../../requestMethods';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { NavHashLink } from 'react-router-hash-link';
import CircularProgress from '@mui/material/CircularProgress';


const Search = () => {
    const location = useLocation();
    const [title, setTitle] = useState('');
    const [loading, setLoading] =useState(false);
    const query = new URLSearchParams(location.search);
    const mytitle=(query.get('title'));
    const [error,setError]=useState(false);
    const [products,setProducts]=useState([]);
    const navigate=useNavigate();
    const [empty,setEmpty]=useState(false);

    const fetchProducts=async()=>{
        try{
            setLoading(true);
            const res=await publicRequest.get(`/products/search?title=${mytitle}`);
            console.log(res);
            setProducts(res.data);
            setLoading(false);
            // setTitle('');
        }catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        fetchProducts();
    },[mytitle])

    console.log(products);

    // const addToProduct=async(id)=>{
    //     navigate(`/product/${id}`);
    // }

    // check if the the search result is empty
    // if(products.length===0 || products===null || products===undefined || products==='' || products===[]){
    //     setEmpty(true);
        console.log(products.length);
    // }

  return (
    <div className='search'>
        <div className='searchContainer'>
        <div className='pKacategories' style={{backgroundColor:'white',minHeight:'50vh'}}>
            {!loading ? <div className='pKawrapper'>
            {products.map((item)=>{
            return(
                <div className='productCard' key={item.id}>
                <div className='imgContainer'>
                    <img src={item.img} className='itemImg' />
                </div>
                    <div className='productTexts'>
                        <p className='productTitle' style={{fontWeight:'bolder'}}>{item.title}</p>
                        <p className='productPrice'>${item.price}</p>
                    </div>
                    <div className='cartBtn'>
                        <><Button className='cartNow' style={{border:'1px solid #555',marginLeft:'20px',borderRadius:'25px',color:'#444',fontFamily:"'candara', sans-serif",fontWeight:'bold',padding:'3px 8px'}}>Explore</Button></>
                    </div>
            </div>
            )})}  
            </div> : <div className='pKacategories2'>
                <div className='pKacategories1' style={{backgroundColor:'white'}}>
                    <CircularProgress color="success" />
                </div>
            </div> }
            {products.length==0 && <div className='noItem'>
              <p className='noItemText' style={{fontFamily:"'candara',sans-serif",color:'crimson'}}>No Product found with title:- {mytitle}</p>
              <img className='noItemImg' src='https://img.freepik.com/premium-photo/tile-blocks-with-able-unable-words_165073-940.jpg?size=626&ext=jpg' alt='no-img' />
            </div>}
            </div>

        </div>
    </div>
  )
}

export default Search
