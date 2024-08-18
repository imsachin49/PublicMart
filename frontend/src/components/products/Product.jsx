import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { BsFillHeartFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import starFilled from '../../assets/icons/star-filled.svg';
import starEmpty from '../../assets/icons/star-empty.svg';
import './Test.css';
import { ShoppingCart } from '@mui/icons-material';

const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
};

export default function Product({ item }) {
    const [isLiked, setIsLiked] = useState(false);
    const [rating, setRating] = useState(0);
    const user = useSelector(state => state?.user?.currentUser?.user);
    const isLoggedIn = user ? true : false;
    const navigate = useNavigate();

    const addToProduct = (id) => {
        navigate(`/product/${id}`);
    };

    useEffect(() => {
        setIsLiked(item?.likes?.includes(user?.id));
    }, [item?._id, user, item?.likes]);

    useEffect(() => {
        // Randomize the number of filled stars between 1 and 5
        setRating(Math.floor(Math.random() * 5) + 1);
    }, [item]);

    const handleLike = async () => {
        if (isLoggedIn) {
            try {
                const res = await axios.put(`https://full-stack-ecommerce-mu.vercel.app/api/products/${item?._id}/like`, { userId: user?.id });
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

    return (
        <div className="product-card">
            <Link to={`/${item?._id}`}>
                <img className="product-image" src={item?.img} alt="Product" />
            </Link>
            <div className="product-info">
                <Link to={`/${item?._id}`} className="product-title">{truncateText(item?.title, 50)}</Link>
                <div className="product-rating">
                    <div className="stars">
                        {[...Array(5)].map((_, i) => (
                            <img
                                key={i}
                                className={`star ${i < rating ? 'filled' : 'empty'}`}
                                src={i < rating ? starFilled : starEmpty}
                                alt={i < rating ? 'Star filled' : 'Star empty'}
                            />
                        ))}
                    </div>
                    <span className="rating-score">5.0</span>
                </div>
                <div className="product-footer">
                    <span className="product-price">${item?.price}</span>
                    <Link to={`/${item?._id}`} className="add-to-cart">
                        <ShoppingCart style={{fontSize:"15px",color:"gray"}} />
                        Add to cart
                    </Link>
                </div>
            </div>
        </div>
    );
}