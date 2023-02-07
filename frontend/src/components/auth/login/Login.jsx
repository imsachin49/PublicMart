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

const Login = () => {
  
  const google=()=>{
    window.open("http://localhost:5000/auth/google", "_self");
    console.log("hello from google");
  }

  const dispatch=useDispatch();
  const {isFetching,error}=useSelector(state=>state.user);

  // const github=()=>{
  //   window.open("http://localhost:5000/auth/github", "_self");
  //   console.log("hello from github");
  // }

  const smallSc=useMediaQuery('(max-width: 800px)')
  const [user,setUser]=useState({
    email:"",password:"",
  });

  const handleChange=(e)=>{
    setUser({...user,[e.target.name]:e.target.value})
  }

  // console.log(user);
  
  const handleSubmit=(e)=>{
    e.preventDefault();
    login(dispatch,user);
  }

  return (
    <div className='rmain-form'>
        <div className='rbox'>
            <form onSubmit={handleSubmit} className='rform'>
                <h3><LoginIcon style={{fontSize:'xx-large'}}/> Login User</h3>
                <div className='rinput'>
                <TextField
                  id='remail'
                  label="Your Email"
                  type='email'
                  name='email'
                  value={user.email}
                  // required
                  onChange={handleChange}
                />
                </div>


                <div className='input'>
                <TextField
                  id='rpwd1' 
                  label="Password"
                  type='password' 
                  name='password' 
                  value={user.password}
                  // required
                  onChange={handleChange}
                  />
                </div>
                  <Button type='submit' variant='contained' className='rbtn' style={{backgroundColor:'black',color:'white',fontFamily:'cursive',marginBottom:'-20px'}} disabled={isFetching}>Login</Button><br />
                  <Link to='/register' className='rlog'>Don't have account? Create One.</Link>
                  <br/>
                  <Button variant='contained' className='rbtn' style={{backgroundColor:'black',color:'white',fontFamily:'cursive',marginBottom:'8px'}} onClick={google}><img src='https://cdn-icons-png.flaticon.com/128/2875/2875404.png' style={{height:'20px'}} />&nbsp;Login with Google</Button>
                  {error && <span className='or' style={{color:'red'}}>Something went wrong</span>}
                  {/* <Button variant='contained' className='rbtn' style={{backgroundColor:'black',color:'white',fontFamily:'cursive'}} onClick={github}><GitHubIcon/>&nbsp;Login with Github</Button> */}
            </form>
        </div>
    </div>
  )
}

export default Login
