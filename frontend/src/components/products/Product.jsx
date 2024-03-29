import React, { useEffect, useState } from 'react'
import './Products.css';
import { Button } from '@mui/material';
import { BsFillHeartFill } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import {IoStarSharp} from 'react-icons/io5';

const Product = ({ item }) => {
    const [isLiked, setIsLiked] = useState(false);
    const user = useSelector(state => state?.user?.currentUser?.user);
    const isLoggedIn = user ? true : false;
    const navigate = useNavigate();

    const addToProduct = (id) => {
        navigate(`/product/${id}`)
    }

    // //like or dislike post
    useEffect(() => {
        setIsLiked(item?.likes?.includes(user?.id));
    }, [item?._id, user, item?.likes]);

    const handleLike = async () => {
        if (isLoggedIn) {
            try {
                const res=await axios.put(`https://full-stack-ecommerce-mu.vercel.app/api/products/${item?._id}/like`,{ userId: user?.id });
                console.log(res.data);
                setIsLiked(!isLiked);
            } catch (error) {
                console.log(error);
                alert("Like feature coming soon!!");
            }
        } else {
            navigate('/login');
        }
    };

    // to generAtE random number between 4 and 5

    return (
        <>
            <div className='productCard'>
                <div className='imgContainer'>
                    <img src={item?.img} className='itemImg' alt='noImg' />
                    <BsFillHeartFill className='likePRoduct' size={20} color={` ${isLiked ? 'red' : 'lightblue'}`} onClick={handleLike} />
                </div>
                <div className='productTexts'>
                    <p className='productTitle' style={{ fontWeight: 'bolder' }}>{item?.title}</p>
                    <p className='productPrice'>${item?.price}</p>
                </div>
                <div className='cartBtn'>
                    <><Button onClick={() => addToProduct(item?._id)} className='cartNow' style={{ border: '1px solid #555', marginLeft: '20px', borderRadius: '25px', color: '#111', fontFamily: "'Open sans', sans-serif", fontWeight: 'bold', padding: '3px 8px',textTransform:"capitalize" }}>Explore</Button></>
                </div>
            </div>
        </>
    )
}

export default Product
