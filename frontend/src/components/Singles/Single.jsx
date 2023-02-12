import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {useDispatch} from 'react-redux';
import { Button } from '@mui/material'
import {useMediaQuery} from '@mui/material';
import KeyboardDoubleArrowRightSharpIcon from '@mui/icons-material/KeyboardDoubleArrowRightSharp';
import ShoppingCartSharpIcon from '@mui/icons-material/ShoppingCartSharp';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import {userRequest,publicRequest} from '../../requestMethods';
import {addProduct} from '../../redux/cartRedux';
import CircularProgress from '@mui/material/CircularProgress';
import './Single.css'


const Single = () => {
    const location=useLocation();
    const id=location.pathname.split('/')[2];
    const [product,setProdut]=useState({});
    const dispatch=useDispatch();
    const currentUser=useSelector(state=>state.user.currentUser.user);
    const cart=useSelector(state=>state.cart);
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(false);
    

    useEffect(()=>{
        const getProduct=async()=>{
            try{
                setLoading(true);
                const res=await publicRequest.get(`/products/find/${id}`);
                setProdut(res.data);
                setLoading(false);
            }catch(err){
                console.log(err);
                setError(true);
            }
        }
        getProduct();
    },[id])

    const [size, setSize] =useState('');
    const [color,setColor]=useState('');
    const isMobile=useMediaQuery('(max-width:365px)');
    const navigate=useNavigate();

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
        console.log({...product,size,quantity:count,color})
        dispatch(addProduct({...product,size,quantity:count,color}));  //color also...
        navigate('/cart');
    }
    
    const isInCart=cart.products.filter((item)=>item._id===id).length>0;
    console.log(isInCart)

    const Send=()=>{
        navigate('/cart');
    }


  return (
    <div className='singles'>
        {!loading ? <div className='singleContainer'>
            
            <div className='singleLeft'>
                <img src={product.img} />
                <div className='buttons'>
                {!isInCart ? <Button variant='contained' style={{margin:'10px 20px',fontFamily:"'candara',sans-serif",fontWeight:'bold',padding:'8px 18px',backgroundColor:'white',color:'#111',border:'1px solid #111'}} onClick={handleClick}><ShoppingCartSharpIcon/>Add to Cart</Button>
                : <Button variant='contained' style={{margin:'10px 20px',fontFamily:"'candara',sans-serif",fontWeight:'bold',padding:'8px 18px',backgroundColor:'white',color:'#111',border:'1px solid #111'}} onClick={Send}><ShoppingCartSharpIcon/>View Cart</Button>}
                <Link  to='/cart' style={{textDecoration:'none'}}><Button variant='contained' style={{margin:'10px 20px',fontFamily:"'candara',sans-serif",fontWeight:'bold',padding:'8px 18px',backgroundColor:'rgb(244, 51, 151)',color:'white',border:'1px solid transparent'}}><KeyboardDoubleArrowRightSharpIcon/>Buy Now</Button></Link>
                </div>
            </div>

            <div className='singleRight'>
                <div className='titlePrice'>
                    <p className='singleTitle'>{product.title}</p>
                    <p className='singlePrice'>${product.price}</p>
                    <p className='delivery'>In Stock</p>
                </div>

                <div className='titlePrice'>
                    <p className='selectSize'>Select Size</p>
                    <div className='Sizes'>
                        {product.size && product.size.map((syz)=>{
                           return (<button className='chooseS' onClick={(e)=>setSize(e.target.value)} value={syz} key={syz}>{syz}</button>)})}
                    </div>    
                </div>
                
                <div className='titlePrice'>
                    <p className='selectSize'>Select Color</p>
                    <div className='Sizes'>
                       {product.color && product.color.map((clr)=>{
                            return (<button className='choose' onClick={(e)=>setColor(e.target.value)} value={clr} key={clr} style={{backgroundColor:clr,border:'1px solid #999'}}></button>)})}
                    </div>    
                </div>

                <div className='titlePrice'>
                    <p className='selectSize'>Quantity</p>
                        <div className='quantity1'>
                        <button className='speech-bubble' onClick={countDec}><RemoveIcon style={{border:'1px solid #999',borderRadius:'50%',marginBottom:'3px'}}/></button>
                        <button className='speech-bubble' style={{marginBottom:'3px'}}>{count}</button>
                        <button className='speech-bubble' onClick={countInc}><AddIcon style={{border:'1px solid #999',borderRadius:'50%',marginBottom:'3px'}}/></button>
                        </div>
                </div>

                <div className='titlePrice'>
                    <div className='titleS'>Product Details</div>
                    <p className='singleTitle' style={{fontSize:'17px'}}>{product.desc}</p>
                </div>

            </div>

        </div> : 
        <div className='singleContainer1'>
            <CircularProgress color="success" />
        </div>}
    </div>
  )
}

export default Single
