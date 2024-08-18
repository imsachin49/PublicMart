import React from 'react'
import './Login.css'
import { Button, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import LoginIcon from '@mui/icons-material/Login';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useDispatch } from 'react-redux';
import { login } from '../../../redux/apiCalls';
import { useNavigate } from 'react-router-dom';
import { loginStart, loginFailure, loginSuccess } from '../../../redux/userRedux';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';

const Login = () => {
  const [loading, setLoading] = useState(false);

  // const google=()=>{
  //   window.open("https://full-stack-ecommerce-mu.vercel.app/auth/google", "_self");
  //   console.log("hello")
  // }

  // const github=()=>{
  //   window.open("https://full-stack-ecommerce-mu.vercel.app/auth/github", "_self");
  // }

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [err, setErr] = useState(false);

  const [user, setUser] = useState({
    email: "", password: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post('https://full-stack-ecommerce-mu.vercel.app/api/auth/login', user);
      const data = await res.data;
      console.log(data);
      dispatch(loginSuccess(data));
      navigate('/');
    } catch (error) {
      setErr(true);
      console.log(error)
    }
    setLoading(false);
  }

  // console.log(user);
  // dispatch(loginStart());
  // setLoading(true);
  // login(dispatch,user).then(()=>{
  //   dispatch(loginSuccess(user));
  //   navigate('/');
  // }).catch(()=>{
  //   console.log("something went wrong")
  //   dispatch(loginFailure());
  //   setErr(true);
  // })
  // setLoading(false);


  const handleClick = () => {
    console.log("hello");
  }

  return (
    <div className='main-form'>
      <div className='box'>
        <h1 className='pgText'>Login to your account</h1>
        <p className='pgTextSm'> Welcome back, please login to start shopping your favourite products</p>
        <form onSubmit={handleSubmit} className='frms'>
          <div className='formInput'>
            <label htmlFor='email'>Email</label>
            <input type='email' required name='email' value={user.email} onChange={handleChange} placeholder='Enter Email' />
          </div>
          <div className='formInput'>
            <label htmlFor='password'>Password</label>
            <input type='password' required name='password' id='password' value={user.password} onChange={handleChange} placeholder='Enter Password' />
          </div>
          <div className='formInput'>
            {!loading ?
              <Button type='submit' variant='contained' className='rbtn' style={{ backgroundColor: 'black', color: 'white', marginTop: '10px' }} onClick={handleClick}>Login</Button>
              : <Button type='submit' variant='contained' className='btn' style={{ backgroundColor: 'black', color: 'white', margin: '3px 0px', marginTop: '11px' }}><CircularProgress style={{ color: 'white' }} /></Button>
            }
          </div>
          <div className='formInput'>
            <Link className='log'>
              Don't have account ? <Link to='/register' className='register'>&nbsp;Create New</Link></Link>
          </div>
          {err && <p className='wrong'>Something went Wrong..</p>}
          {/*<div className='formInput'>
                    <Button variant='contained' className='rbtn' style={{backgroundColor:'black',color:'white',fontFamily:'cursive',marginBottom:'8px',fontFamily:"'candara',sans-serif"}} onClick={google}><img src='https://cdn-icons-png.flaticon.com/128/2875/2875404.png' style={{height:'20px'}} />&nbsp;Login with Google</Button>
                </div>*/}

          {/* <div className='formInput'>
                    <Button variant='contained' className='rbtn' style={{backgroundColor:'black',color:'white',fontFamily:'cursive',fontFamily:"'candara',sans-serif"}} onClick={github}><GitHubIcon/>&nbsp;Login with Github</Button>
                </div> */}

        </form>
        <div className="pg mb-1 text-center border border-bottom-0 border-end-0 border-start-0 pt-1">
          By signing in or creating an account, you agree with our Terms & Conditions and Privacy Statement
        </div>
      </div>
    </div>
  )
}

export default Login