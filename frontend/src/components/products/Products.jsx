import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './Products.css';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Type from '../../MyProducts';

const Products = () => {
    const [products,setProduts]=useState([]);

    useEffect(()=>{
        const getProducts=async()=>{
            try{
                const res=await axios.get("http://localhost:5000/api/products");
                console.log(res.data);
                setProduts(res.data);  
                // console.log(products)
            }catch(err){
                console.log(err);
            }
        }
        getProducts()
    },[])

    const pro="lorem ipsum high quality denim jeans jeans jeans jeans"
    return (
        <div style={{ backgroundColor: 'aliceblue'}}>
            <h2>Our Latest Top Collections</h2>
            <div className='p-categories'>
                <div className='p-wrapper'>
                {products.slice(0,12).map((item)=>{
                return(
                    <div className='card' key={item.id}>
                    <img src={item.img}/>
                    <FavoriteBorderOutlinedIcon className='like' color='red' />
                    <p className='offer'>-25%</p>
                    <div className='content'>
                        <div className='p-text'>
                            <h4 className='p-title'>{item.title}</h4>
                            <h4>₹{item.price}</h4><hr />
                        </div>
                        <div className='prbtn'>
                                <Button variant='text' size='small' sx={{color:'black',fontWeight:'bolder'}}>4.5 <StarBorderOutlinedIcon/></Button>
                                <Button size='small' variant='contained' style={{backgroundColor:'blue',fontWeight:'lighter'}} className='pshop'>Shop</Button>&nbsp;&nbsp;
                                <Button size='small'variant='contained' style={{backgroundColor:'green',fontWeight:'lighter'}} className='ptcart'>Cart<AddShoppingCartIcon /></Button>
                        </div>
                    </div>
                </div>
            )})}     
            </div>
    </div>
    </div>
  )
}

export default Products
