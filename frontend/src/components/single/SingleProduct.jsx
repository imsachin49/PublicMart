import React, { useEffect } from 'react'
import './SingleProduct.css'
// import img1 from '../../assets/shoe1-removebg-preview.png'
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button, useMediaQuery } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// import RemoveIcon from '@mui/icons-material/Remove';
import { useState } from 'react';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useLocation } from 'react-router-dom';
import {userRequest,publicRequest} from '../../requestMethods';
import {useDispatch} from 'react-redux';
import {addProduct} from '../../redux/cartRedux';

const SingleProduct = () => {
    const location=useLocation();
    const id=location.pathname.split('/')[2];
    console.log(id);
    const [product,setProdut]=useState({});
    const dispatch=useDispatch();
   
    useEffect(()=>{
        const getProduct=async()=>{
            try{
                // const res=await fetch(`http://localhost:5000/api/products/${id}`);
                // const data=await res.json();
                // setProdut(data);
                // console.log(data);
                const res=await publicRequest.get(`/products/find/${id}`);
                setProdut(res.data);
                console.log(res.data);

            }catch(err){
                console.log(err);
            }
        }
        getProduct();
    },[id])

    // console.log(product);

    const [size, setSize] =useState('');
    const isMobile=useMediaQuery('(max-width:365px)');

    const handleChange = (event) => {
      setSize(event.target.value);
    };

    const [count,setCount]=useState(1);
    const countInc=()=>{
        setCount(count+1);
    }

    const countDec=()=>{
        if(count>1)
        setCount(count-1);
    }

    const handleClick=async()=>{
        dispatch(addProduct({...product,quantity:count,size}));  //color also...
    }
    
    return (
    // <div>
        <div className='containers'>
            <div className='wrapper'>
                <div className='image-container'>
                    <img src={product.img} />
                    {/* <div className='rating'>3.7⭐</div> */}
                    {/* <FavoriteBorderIcon style={{position:'fixed',marginLeft:'-200'}} color='primary'/> */}
                </div>
                <div className='text-container'>

                    <div className='title'>{product.title}</div><hr />
                
                    <div className='description'>{product.desc}
                        {/* Product Name is lorem ipsum Product Name is lorem ipsum Product 
                        Name is lorem ipsum Product Name is lorem ipsum Product Name is lorem ipsum Product Name is  */}
                    </div>
                
                    <div className='price'>₹{product.price}</div>
                
                    {/* <div className='size'>
                    <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Size</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={size}
                                label="Size"
                                onChange={handleChange}>
                                {product.size.map((syz)=>{
                                    return <MenuItem key={syz} onClick={(e)=>setSize(e.target.value)} value={syz}>{syz}</MenuItem>
                                })}
                            </Select>
                            </FormControl>

                    </Box>
                    </div> */}

                    <div className='size'>
                        <select className='select' value={size} onChange={handleChange} style={{outline:'none',padding:'5px',borderRadius:'7px'}}>
                            <option value=''>Select Size</option>
                            {product.size && product.size.map((syz)=>{
                                return <option key={syz} value={syz} onClick={(e)=>setSize(e.target.value)}>{syz}</option>
                            })}
                        </select>
                    </div>
                
                        <div className='buy'>
                            <div className='count'>
                                <Button className='inc' onClick={countInc} color='error' size='large'><AddCircleOutlineIcon/></Button>
                                <p className='no'>{count}</p>
                                <Button className='dec' onClick={countDec} color='error' size='large'><RemoveCircleOutlineIcon/></Button>
                                {!isMobile && <Button variant='contained' color='warning' style={{fontWeight:'bold',fontFamily:'cursive',marginLeft:'10px'}} onClick={handleClick}><AddShoppingCartIcon />Cart</Button>}
                            </div>
                        </div>
                        {isMobile && <Button variant='contained' color='warning' style={{fontWeight:'bold',fontFamily:'cursive',marginLeft:'10px',display:'flex',margin:'auto',justifyContent:'center',marginLeft:'40px'}} onClick={handleClick}><AddShoppingCartIcon />Cart</Button>}
                                        
                </div>
            </div>
        </div>
    // {/* </div> */}
  )
}

export default SingleProduct
