import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './Products.css';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Type from '../../MyProducts';
import {useDispatch} from 'react-redux';
import {addProduct} from '../../redux/cartRedux';
import {useNavigate} from 'react-router-dom';
import { publicRequest } from '../../requestMethods';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';

const Products = () => {
    const [products,setProduts]=useState([]);
    const [allProducts,setAllProducts]=useState([]);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [loading,setLoading]=useState(false);
    const [page,setPage]=useState(1);
    console.log(page)

    const getAllProducts=async()=>{
        try{
            setLoading(true);
            const res=await publicRequest.get(`/products`);
            setAllProducts(res.data);
            setLoading(false);  
        }catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        getAllProducts();
    },[])

    const totalLength=allProducts.length;
    const totalPage=Math.ceil(totalLength/7);

    const getProducts=async()=>{
        try{
            setLoading(true);
            const res=await publicRequest.get(`/products?page=${page}&limit=7`);
            setProduts(res.data);
            setLoading(false);  
        }catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        getProducts();
    },[page])

    const addToProduct=(id)=>{
        navigate('/product/'+id);
    }

    return (
        <div style={{ backgroundColor: 'white'}} id="new">
            <h2>Our Latest Top Collections</h2>
            {!loading ? <div className='pKacategories' style={{backgroundColor:'white'}}>                
                <div className='pKawrapper'>
                {products.map((item,index)=>{
                    return(
                        <div className='productCard' key={index}>
                            <div className='imgContainer'>
                                <img src={item.img} className='itemImg' />
                            </div>
                            <div className='productTexts'>
                                <p className='productTitle' style={{fontWeight:'bolder'}}>{item.title}</p>
                                <p className='productPrice'>${item.price}</p>
                            </div>
                            <div className='cartBtn'>
                                <><Button onClick={()=>addToProduct(item._id)} className='cartNow' style={{border:'1px solid #555',marginLeft:'20px',borderRadius:'25px',color:'#444',fontFamily:"'candara', sans-serif",fontWeight:'bold',padding:'3px 8px'}}>Explore</Button></>
                            </div>
                        </div>
                    )})
                }  
            </div>
            <div className='pagination'>
            <Stack spacing={2}>
                <Pagination defaultPage={page} count={totalPage}  variant="outlined" shape="circular" color='info'  onChange={(e,value)=>setPage(value)}/>
            </Stack>

            </div>
            </div> : 
            <div className='skeleton'>
            <Box sx={{ width: '100%',height:240}} style={{display:'flex',justifyContent:'center'}}>
                <Skeleton variant="rectangular" style={{margin:'6px',flex:1,width:'210px',height:'185px'}} className='parts' />
                <Skeleton variant="rectangular" style={{margin:'6px',flex:1,width:'210px',height:'185px'}} className='parts' />
                <Skeleton variant="rectangular" style={{margin:'6px',flex:1,width:'210px',height:'185px'}} className='parts' />
                <Skeleton variant="rectangular" style={{margin:'6px',flex:1,width:'210px',height:'185px'}} className='parts' />
            </Box></div>} 
        </div>
  )
}

export default Products
