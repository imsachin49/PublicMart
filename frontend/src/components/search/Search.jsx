import React from 'react'
import { useLocation } from 'react-router-dom'
import { useEffect,useState } from 'react';
import axios from 'axios';
import { publicRequest } from '../../requestMethods';

const Search = () => {
    const location = useLocation();
    const [title, setTitle] = useState('');
    const [loading, setLoading] =useState(false);
    const query = new URLSearchParams(location.search);
    const mytitle=(query.get('title'));
    const [error,setError]=useState(false);
    const [code,setCode]=useState(null);
    const [products,setProducts]=useState([]);

    const fetchProducts=async()=>{
        try{
            setLoading(true);
            const res=await publicRequest.get(`/products/search?title=${mytitle}`);
            console.log(res);
            setProducts(res.data);
            setLoading(false);
        }catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        fetchProducts();
    },[mytitle])

  return (
    <div className='search'>
        {/* <div className='searchContainer'> */}
        {/* <div className='pKacategories' style={{backgroundColor:'white'}}>
            <div className='pKawrapper'>
            {products.map((item)=>{
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
            </div>
        </div> */}
        helloooooooooooooooooooooooo
    </div>
  )
}

export default Search
