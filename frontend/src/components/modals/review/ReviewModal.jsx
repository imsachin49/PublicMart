import './ReviewModal.css'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import {useSelector,useDispatch} from 'react-redux'

const ReviewModal = ({ onClose, item }) => {
    const user = useSelector(state => state?.user?.currentUser?.user);
    const token=useSelector(state=>state?.user?.currentUser?.token)
    let isUser = user ? true : false;
    const [rating, setRating] = useState(1);
    const [desc,setDesc]=useState("");
    console.log(user.id);

    const addReview = async () => {
        const review = {review: desc,rating,productId: item._id,userId: user.id}
        try {
            const res=await axios.post(`https://full-stack-ecommerce-mu.vercel.app/api/reviews/${item._id}`, review);
            console.log(res.data);
            onClose();
            window.location.reload();
        } catch (err) {
            console.log(err)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        addReview();
    }

    return (
        <>
            <div className="modalOverlay">
                <div className="loginModal">

                    <div className="toppp">
                        <h2 className='textLog'>Add Review!</h2>
                        <div onClick={onClose} className="cross">
                            <svg className='fill-current text-black' xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 18 18'>
                                <path d='M18 1.5L16.5 0 9 7.5 1.5 0 0 1.5 7.5 9 0 16.5 1.5 18 9 10.5 16.5 18 18 16.5 10.5 9z' />
                            </svg>
                        </div>
                    </div>

                    <div className="ProdImgUp">
                        <img alt="noImg" className="prodtImg" src={item.img} />
                    </div>

                    <form className="formmm" onSubmit={handleSubmit}>
                        <div className="formmmGroup">
                            <label htmlFor="username" className='username' id='username'>UserName:</label>
                            <input type="text" placeholder='userName' name='username' value={user?.username} readOnly autoComplete="off" disabled />
                        </div>
                        <div className="formmmGroup">
                            <label htmlFor="username" className='username' id='username'>Description:</label>
                            <textarea rows={3} onChange={(e)=>setDesc(e.target.value)} type="text" placeholder='Write a short description here:' name='desc' autoComplete="off" />
                        </div>
                        <div className="formmmGroup rates">
                            <label htmlFor="username" className='username' id='username'>Rating:</label>
                            <Rating
                                name="size-large"
                                className='rater'
                                value={rating} onChange={(event, newValue) => { setRating(newValue) }}
                                sx={{
                                    widthg:'100%',
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 32,
                                    },
                                }} size="large" />
                        </div>
                        <div className="submittt">
                            <button type="submit" className="btnnn">ADD</button>
                        </div>
                    </form>
                    
                </div>
            </div>
        </>
    )
}

export default ReviewModal