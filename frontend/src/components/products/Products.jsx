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
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [loading,setLoading]=useState(false);

    useEffect(()=>{
        const getProducts=async()=>{
            try{
                setLoading(true);
                const res=await publicRequest.get("/products");
                console.log(res.data);
                setProduts(res.data);
                setLoading(false);  
            }catch(err){
                console.log(err);
            }
        }
        getProducts()
    },[])

    // const addToCart=()=>{
        // dispatch(addProduct({}));
    // }

    // const handleClick=(id)=>{
    //     // dispatch(addProduct(id));
    //     navigate('/product/'+id);
    //     console.log("chutiya hai")
    // }

    const addToProduct=(id)=>{
        // dispatch(addProduct(id));
        navigate('/product/'+id);
        // alert("Now Select the size...");
    }

    return (
        <div style={{ backgroundColor: 'white'}} id="new">
            <h2>Our Latest Top Collections</h2>
            {!loading ? <div className='pKacategories' style={{backgroundColor:'white'}}>
                
                <div className='pKawrapper'>
                {products.slice(0,12).map((item)=>{
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
                            <><Button onClick={()=>addToProduct(item._id)} className='cartNow' style={{border:'1px solid #555',marginLeft:'20px',borderRadius:'25px',color:'#444',fontFamily:"'candara', sans-serif",fontWeight:'bold',padding:'3px 8px'}}>Explore</Button></>
                        </div>
                </div>
            )})}  
            </div>
            <div className='pagination'>
            <Stack spacing={2}>
                <Pagination count={10} variant="outlined" shape="circular" color='info' />
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
