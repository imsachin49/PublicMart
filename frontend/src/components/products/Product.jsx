import React,{useState} from 'react'
import './Products.css';
import { Button } from '@mui/material';
import {BsFillHeartFill} from 'react-icons/bs'
import { useNavigate } from 'react-router-dom';

const Product = ({item}) => {
    const [isLiked,setIsLiked]=useState(false);
    const navigate=useNavigate();

    const handleLike=(index)=>{
        setIsLiked(!isLiked);
    }

    const addToProduct=(id)=>{
        navigate(`/product/${id}`)
    }

    return (
        <>
            <div className='productCard' data-aos="zoom-out-down">
                <div className='imgContainer'>
                    <img src={item.img} className='itemImg' alt='noImg' />
                    <BsFillHeartFill className='likePRoduct' size={20} color={` ${isLiked ? 'red' : 'lightblue' }`} onClick={handleLike} />
                </div>
                <div className='productTexts'>
                    <p className='productTitle' data-aos="fade-right" data-aos-duration="1500" style={{fontWeight:'bolder'}}>{item.title}</p>
                    <p className='productPrice' data-aos="fade-left" data-aos-duration="1500">${item.price}</p>
                </div>
                <div className='cartBtn'>
                    <><Button onClick={()=>addToProduct(item._id)} className='cartNow' style={{border:'1px solid #555',marginLeft:'20px',borderRadius:'25px',color:'#444',fontFamily:"'candara', sans-serif",fontWeight:'bold',padding:'3px 8px'}}>Explore</Button></>
                </div>
            </div>
        </>
    )
}

export default Product
