import React from 'react'
import './Cart.css'
import { Button, IconButton } from '@mui/material'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import StripeCheckout from 'react-stripe-checkout'
import { useNavigate } from 'react-router-dom'
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Divider from '@mui/material/Divider';
import { removeProduct } from '../../redux/cartRedux'
import { useDispatch } from 'react-redux'
import Stripe from 'react-stripe-checkout'
import axios from 'axios'
import { NavHashLink } from 'react-router-hash-link';
import CircularProgress from '@mui/material/CircularProgress';


const Cart = () => {
  const KEY = 'pk_test_51MKhvSSG3siNDqLS6dujjGtMZHHKqf2P2LtV8bY8YQTqL7RSkk9II0vH00NkVSLdSRYkD229QJVXIB9OlYMJdpjU00kkD9wiBW';
  const navigate = useNavigate()
  const cart = useSelector(state => state.cart);
  const user = useSelector(state => state.user.currentUser);
  const dispatch = useDispatch();
  const cartLength = cart.products.length;
  console.log(cartLength)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleRemove = (item) => {
    try {
      dispatch(removeProduct(item));
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }

  const handleToken = (totalAmount, token) => {
    try {
      setLoading(true);
      axios.post('https://full-stack-ecommerce-mu.vercel.app/api/checkout/payment', {
        token: token.id,
        amount: cart.total * 100
      });
      setLoading(false);
      navigate('/success')
    } catch (err) {
      setError(true);
      console.log(err)
    }
  }

  const tokenHandler = (token) => {
    handleToken(100, token)
  }

  const shopNow = () => {
    navigate('/')
  }

  const goBack = () => {
    navigate('/')
  }


  return (
    <>
      <div className='cart-wrapper'>
        <div className='cart-main'>
          {cartLength !== 0 && <div className='cartTitles'>Products in your Cart</div>}

          {cart.products.map((c) => {
            return (
              <div className='cartItem'>
                <div className='leftCart'>
                  <img className='cartImg' src={c.img} alt='no -img' />
                  <div className='cartInfo'>
                    <div className='nameForSmall'>
                      <p className='itemName'>{c?.title}</p>
                      <div className="nameForSmallIcon">
                        <DisabledByDefaultIcon style={{ color: 'black' }} size='small' onClick={() => handleRemove(c)} />
                      </div>
                    </div>
                    <p className='itemDesc'>{(c?.desc).substr(0, 160)}</p>
                    <p className='itemQnts'>{c.quantity} x {" "}&nbsp;<b className='conte'> ${c.price}</b></p>
                    {/*<p className='cartsize'>{c?.size} {c.color}</p>*/}
                  </div>
                </div>
                <div className='rightCart'>
                  <IconButton className='icon' style={{ color: 'black' }} size='large' onClick={() => handleRemove(c)}>
                    <DisabledByDefaultIcon />
                  </IconButton>
                </div>
              </div>
            )
          })}

          {cartLength > 0 ? <div className='checkout'>
            <div className='checkoutContainer'>
              <div className='checkoutLeft' style={{ paddingTop: '10px' }}>
                <p className='subTotal'>Subtotal</p>
                <p className='subTotalAmount'>${cart.total}</p>
              </div>
              <div className='checkoutLeft'>
                <p className='subTotal'>Delivery</p>
                <p className='subTotalAmount'>$100.0</p>
              </div>
              <Divider variant="middle" style={{ width: '93%', display: 'flex', margin: 'auto', backgroundColor: '#333' }} />

              <div className='checkoutLeft' id="hiiii">
                <p className='totalText'>Total</p>
                <p className='totalAmount'>${cart.total + 100}</p>
              </div> <Divider variant="middle" style={{ width: '93%', display: 'flex', margin: 'auto', backgroundColor: '#333' }} />

              <div className='preNext'>
                <Button className='back' variant='contained' style={{ margin: '10px', backgroundColor: 'white', color: 'black', border: '1px solid black' }} onClick={goBack}><ChevronLeftIcon size='small' />BACK</Button>
                <Stripe stripeKey={KEY} token={tokenHandler}>
                  {!loading ? <Button className='next' variant='contained' style={{ margin: '10px', backgroundColor: 'black' }}>CHECKOUT<NavigateNextIcon size='small' /></Button>
                    : <Button className='next' variant='contained' style={{ margin: '10px', backgroundColor: 'black' }}><CircularProgress style={{ color: 'white' }} /></Button>}
                </Stripe>
              </div>

            </div>
          </div>
            :
            <div className='noItem'>
              <img className='noItemImg' src='https://img.freepik.com/premium-photo/man-with-cart_441797-9038.jpg?size=626&ext=jpg' alt='no-img' />
              <p className='noItemText'>Your cart is Empty</p>
              <NavHashLink to='/#new' style={{ textDecoration: 'none' }}><Button className='noItemBtn' variant='contained' style={{ backgroundColor: 'black', color: 'white', fontWeight: 'bold', fontFamily: 'cursive', marginTop: '10px' }} onClick={shopNow}>SHOP NOW</Button></NavHashLink>
            </div>
          }
        </div>
      </div>
    </>
  )
}

export default Cart
