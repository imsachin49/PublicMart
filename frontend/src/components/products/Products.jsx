import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './Products.css';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import {useNavigate} from 'react-router-dom';
import { publicRequest } from '../../requestMethods';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import {BsFillHeartFill} from 'react-icons/bs'
import Product from './Product';

const Products = () => {
    const [products,setProduts]=useState([]);
    const [allProducts,setAllProducts]=useState([]);
    const navigate=useNavigate();
    const [loading,setLoading]=useState(false);
    const [page,setPage]=useState(1);
    console.log(page)

    const getAllProducts=async()=>{
        try{
            setLoading(true);
            const res=await publicRequest.get(`http://localhost:5000/api/products`);
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
    console.log(totalLength)
    const totalPage=Math.ceil(totalLength/11);

    const getProducts=async()=>{
        try{
            setLoading(true);
            const res=await publicRequest.get(`/products?page=${page}&limit=11`);
            setProduts(res.data);
            setLoading(false);  
        }catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        getProducts();
    },[page])

    // handleLike={handleLike} isLiked={isLiked}
    return (
        <div style={{ backgroundColor: 'white',scrollBehavior:'smooth'}} id="new" >
            <h2 data-aos="fade-down" data-aos-duration="1000">Our Latest Top Collections</h2>
            {!loading ? <div className='pKacategories' style={{backgroundColor:'white'}}>                
                <div className='pKawrapper'>
                {products.map((item,index)=>{
                    return(
                        <Product item={item} index={index} />
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
