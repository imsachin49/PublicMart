import './ReviewModal.css'
import React, { useState } from 'react'
import axios from 'axios'
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';


const ReviewModal = ({ onClose,item }) => {
    const [value, setValue] = React.useState(2);
    const handleSubmit = async (e) => {
        e.preventDefault()
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
                            <input type="text" placeholder='userName' name='username' autoComplete="off" />
                        </div>
                        <div className="formmmGroup">
                            <label htmlFor="username" className='username' id='username'>Description:</label>
                            <textarea rows={3} type="text" placeholder='Write s short description here:' name='desc' autoComplete="off" />
                        </div>
                        <div className="formmmGroup">
                            <label htmlFor="username" className='username' id='username'>Rating:</label>
                            <Rating name="size-large" className='rater' value={value} onChange={(event, newValue) => { setValue(newValue)}} sx={{
                                '& .MuiSvgIcon-root': {
                                    fontSize: 32,
                                },
                            }} size="large"/>                        
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