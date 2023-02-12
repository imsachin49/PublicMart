import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';import Navbar from '../../components/navbar/Navbar'
import Products from '../../components/products/Products'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import './ProductType.css';
import '../../components/products/Products.css'
import Type from '../../MyProducts';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../redux/cartRedux';
import { useNavigate } from 'react-router-dom';

const ProductType = () => {
    const location=useLocation();
    const cat=location.pathname.split('/')[2];
    const [filters,setFilters]=useState({});
    const [sort,setSort]=useState('newest');

    const handleFilters=(e)=>{
        setFilters({
            ...filters,
            [e.target.name]:e.target.value
        })
    }

    const handleSort=(e)=>{
        setSort(
            [e.target.name]=e.target.value
        )
        console.log(sort)
    }

    const [products,setProduts]=useState([]);
    const [filteredProducts,setFilteredProducts]=useState([]);
    const [length,setLength]=useState(0);

    // const dispatch=useDispatch();
    const navigate=useNavigate();
    const addToProduct=(id)=>{
        // dispatch(addProduct(id));
        // console.log("chutiya hai")
        navigate('/product/'+id);
    }

    useEffect(()=>{
        const getProducts=async()=>{
            try{
                const res=
                    await axios.get(cat ? 
                    `http://localhost:5000/api/products?category=${cat}` : 
                    "http://localhost:5000/api/products"
                );
                console.log(res.data);
                setProduts(res.data);  
            }catch(err){
                console.log(err);
            }
        }
        getProducts()
    },[cat])
    
    console.log("length=",length)

    useEffect(()=>{
       cat && setFilteredProducts(
            products.filter((item)=>
                Object.entries(filters).every(([key,value])=>
                    item[key].includes(value)
            )
        ) 
       )
    },[filters,products,cat])

    //sorting the products
    useEffect(()=>{
        if(sort==='newest'){
            setFilteredProducts((prev)=>
                [...prev].sort((a,b)=>a.createdAt-b.createdAt)
            )
        }
        else if(sort==='asc'){
            setFilteredProducts((prev)=>
                [...prev].sort((a,b)=>a.price-b.price)
            )
        }
        else{
            setFilteredProducts((prev)=>
                [...prev].sort((a,b)=>b.price-a.price)
            )
        }
    },[sort])

    return (
    <>
        <div style={{ backgroundColor: 'white'}}>
            <div className='pKacategories' style={{backgroundColor:'white'}}>
            
                <div className='typeTop'>
                    <div className='leftTop'>{cat}</div>
                    <div className='rightTop'>
                          
                    <div className='sort'>
                        <select class="form-select" aria-label="Default select example" name='sort' onChange={handleSort}>
                            <option selected defaultValue className='jii'>Sort</option>
                            <option value='newest' className='commonClass'>Newest</option>
                            <option value='asc' className='commonClass'>Price(asce)</option>
                            <option value='des' className='commonClass'>Price(desc)</option>
                        </select>
                        </div>

                        <div className='filter'>
                        <select class="form-select" aria-label="Default select example" name='color' onChange={handleFilters}>
                            <option defaultValue>Color</option>
                            <option className='commonClass'>Red</option>
                            <option className='commonClass'>Black</option>
                            <option className='commonClass'>Green</option>
                            <option className='commonClass'>White</option>
                            <option className='commonClass'>Blue</option>
                        </select>
                        </div>
                    </div>
        
                </div>

                <div className='pKawrapper'>
                {filteredProducts.map((item)=>{
                return(
                    <div className='productCard' key={item.id}>
                    <div className='imgContainer'>
                        <img src={item.img} className='itemImg' />
                        {/* <FavoriteBorderOutlinedIcon/> */}
                    </div>
                    {/* <div className='Itemlikes' >
                    </div> */}
                        <div className='productTexts'>
                            <p className='productTitle' style={{fontWeight:'bolder'}}>{item.title}</p>
                            <p className='productPrice'>${item.price}</p>
                        </div>
                        <div className='cartBtn'>
                            <><Button className='cartNow' style={{border:'1px solid #555',marginLeft:'20px',borderRadius:'25px',color:'#444',fontFamily:"'candara', sans-serif",fontWeight:'bold',padding:'3px 8px'}} onClick={()=>addToProduct(item._id)} >Explore</Button></>
                        </div>
                </div>
            )})}  
            </div>
            {/* <div className='pagination'>
            <Stack spacing={2}>
                <Pagination count={10} variant="outlined" shape="circular" color='info' />
            </Stack>
            </div> */}
        </div>
        </div>

    </>
  )
}

export default ProductType;
