import React from 'react'
import './Login.css'
import TextField from '@mui/material/TextField';
import { Button, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useState } from 'react';
import LoginIcon from '@mui/icons-material/Login';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import {useDispatch} from 'react-redux';
import { useSelector } from 'react-redux';
import { login } from '../../../redux/apiCalls';
import { useNavigate } from 'react-router-dom';

const Login = () => {  
  const smallSc=useMediaQuery('(max-width: 800px)')
  const [loading,setLoading]=useState(false);
  //  const loginSuccess=useSelector(state=>state.user.loginSuccess);
  //  const loginFailure=useSelector(state=>state.user.loginFailure);
  //  const loginStart=useSelector(state=>state.user.loginStart);
  //  console.log(loginSuccess,loginFailure,loginStart)
    
  // const google=()=>{
  //   window.open("https://full-stack-ecommerce-mu.vercel.app/auth/google", "_self");
  //   console.log("hello")
  // }
  
  // const github=()=>{
  //   window.open("https://full-stack-ecommerce-mu.vercel.app/auth/github", "_self");
  // }
  
  const dispatch=useDispatch();
  const {isFetching,error}=useSelector(state=>state.user);
  console.log(isFetching,error);
  const navigate=useNavigate();
  const [err,setErr]=useState(false);

  const [user,setUser]=useState({
    email:"",password:"",
  });

  const handleChange=(e)=>{
    setUser({...user,[e.target.name]:e.target.value})
  }
  
  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(user);
    login(dispatch,user);
    navigate('/');
  }

  const handleClick=()=>{
    console.log("hello");
  }

  return (
    <div className='rmain-form'>
        <div className='rbox'>
            <form onSubmit={handleSubmit}>
                <h3><LoginIcon style={{fontSize:'xx-large'}}/> Login User</h3>
                <div className='formInput'>
                    <label htmlFor='email'>Email</label>
                    <input type='email' required name='email' value={user.email} onChange={handleChange} placeholder='Enter Email' />
                </div>
                <div className='formInput'>
                    <label htmlFor='password'>Password</label>
                    <input type='password' required name='password' id='password' value={user.password} onChange={handleChange} placeholder='Enter Password'/>
                </div>
                <div className='formInput'>
                    <Button type='submit' variant='contained' className='rbtn' style={{backgroundColor:'black',color:'white',marginTop:'10px',fontFamily:"'candara',sans-serif"}} onClick={handleClick}>Login</Button>
                </div>
                <div className='formInput'>
                    <Link className='rlog'>
                    Don't have account ? <Link to='/register' className='register'>&nbsp;Create New</Link></Link>
                </div>
                {/* {err && <p className='wrong'>Something went Wrong..</p>} */}
                {/*<div className='formInput'>
                    <Button variant='contained' className='rbtn' style={{backgroundColor:'black',color:'white',fontFamily:'cursive',marginBottom:'8px',fontFamily:"'candara',sans-serif"}} onClick={google}><img src='https://cdn-icons-png.flaticon.com/128/2875/2875404.png' style={{height:'20px'}} />&nbsp;Login with Google</Button>
                </div>*/}
                
                {/* <div className='formInput'>
                    <Button variant='contained' className='rbtn' style={{backgroundColor:'black',color:'white',fontFamily:'cursive',fontFamily:"'candara',sans-serif"}} onClick={github}><GitHubIcon/>&nbsp;Login with Github</Button>
                </div> */}
                
            </form>
        </div>
    </div>
  )
}

export default Login
