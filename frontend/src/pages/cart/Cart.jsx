import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import './Cart.css'
import { Button } from '@mui/material'
import { useState,useEffect } from 'react'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import cart1 from '../../assets/cart1.png'
import cart2 from '../../assets/cart2.png'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { useSelector } from 'react-redux'
import StripeCheckout from 'react-stripe-checkout'
import { publicRequest, userRequest } from '../../requestMethods' 
import { useNavigate } from 'react-router-dom'

const Cart = () => {
    // const handleChange = (event) => {
        // setSize(event.target.value);
    //   };

    // const KEY=process.env.REACT_APP_STRIPE_KEY;
    const KEY='pk_test_51MKhvSSG3siNDqLS6dujjGtMZHHKqf2P2LtV8bY8YQTqL7RSkk9II0vH00NkVSLdSRYkD229QJVXIB9OlYMJdpjU00kkD9wiBW';
  
      const [count,setCount]=useState(0);
      const navigate=useNavigate()

      const countInc=()=>{
          setCount(count+1);
      }
  
      const countDec=()=>{
          if(count>0)
          setCount(count-1);
      }
      
      const cart = useSelector((state) => state.cart);
      console.log("its my cart :haha",cart.products);
      const [stripeToken,setStripeToken]=useState(null);

      const onToken=(token)=>{
        setStripeToken(token);
      }

      console.log(stripeToken);

    //   useEffect(()=>{
    //     const makeRequest=async()=>{
    //         try{
    //             const res=await userRequest.post('/checkout/payment',{
    //                 token:stripeToken.id,
    //                 amount:cart.total*100
    //             })
    //             // console.log(res)
    //             navigate('/success')
    //         }catch(err){
    //             console.log(err+" in payment")
    //         }
    //     }
    //     stripeToken && cart.total>=1 && makeRequest();
    //   },[stripeToken,cart.total,navigate])


    useEffect(() => {
        const makeRequest = async () => {
          try {
            const res = await publicRequest.post("/checkout/payment", {
              tokenId: stripeToken.id,
              amount: 500,
            });
            navigate("/success", {state:res});
            console.log(res);
          } catch(err) {
            console.log(err+"in payment");
          }
        };
        stripeToken && makeRequest();
    }, [stripeToken, cart.total , navigate]);

  return (
    <>
      <div className='cart-wrapper' style={{backgroundColor:'aliceblue'}}>
        <div className='cart-main'>

            <div className='cart-products'>
                
                {cart.products.map((product) => {
                    return (<div className='cart-item'>
                    <div className='img-cont'><img src={product.img} alt='no image' className='cartimg'/></div>
                    <div className='texts'>
                        <h6>{product.title}</h6>
                        <p>Seller:{product.company} <b>ID:{product._id}</b></p>
                        <span>size:{product.size} <b><br/>color:black</b></span>
                        <div className='quantity'>
                            <AddCircleOutlineIcon sx={{color:'black'}} />
                            <p className='myP'>{product.quantity}</p>
                            <RemoveCircleOutlineIcon sx={{color:'black'}} />
                        </div>
                        <p className='priceP'>{product.price}</p>
                    </div>
                </div>)})}

                {/* <div className='cart-item'>
                    <div className='img-cont'><img src={cart2} /></div>
                    <div className='texts'>
                        <h6>Lorem ipsum bags/Stud Bags/Baggs</h6>
                            <p>Seller:Brand Name <b>ID:123456789</b></p>
                        <span>size:N/A <b>color:N/A</b></span>
                        <div className='quantity'>
                            <AddCircleOutlineIcon sx={{color:'black'}} />
                            <p className='myP'>2</p>
                            <RemoveCircleOutlineIcon sx={{color:'black'}} />
                        </div>
                        <p className='priceP'>₹780.5</p>
                    </div>
                </div> */}
            </div>


        <div className='cart-checkout'>
            <div className='top'>
                <h4>Order Details</h4><hr />
                <div className='subtotal'>
                    <h4>Sub-Total:<b>${cart.total}</b></h4>
                </div>
                <div className='subtotal'>
                    <h4>Shipping:<b>$40</b></h4>
                </div>
                <div className='subtotal'>
                    <h4>Discount:<b>$100</b></h4>
                </div>
                <div className='subtotal' style={{borderTop:'1px solid grey'}}>
                    <h3>Total:<b>${cart.total+40-100}</b></h3>
                </div>
                <StripeCheckout
                    name="publicMart"
                    image="https://png.pngtree.com/png-clipart/20190901/ourmid/pngtree-mobile-payment-on-mobile-phones-png-image_1720703.jpg"
                    billingAddress
                    shippingAddress
                    description={`Your payable amount is $${cart.total}`}
                    amount={cart.total}
                    panelLabel="Pay Now"
                    currency="INR"
                    token={onToken}
                    stripeKey={KEY}
                >

            <Button varinat='contained' style={{backgroundColor:'blue',color:'white',display:'flex',margin:'auto'}}>Checkout Now<KeyboardDoubleArrowRightIcon/></Button>
                </StripeCheckout>
            </div> 
        </div>

        </div>
      </div>
    </>
  )
}

export default Cart

{/* <Button variant='contained' color='warning' style={{fontWeight:'bold',fontFamily:'cursive',marginLeft:'10px'}}><AddShoppingCartIcon />Cart</Button> */}
