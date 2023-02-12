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
  // const google=()=>{
  //   window.open("http://localhost:5000/auth/google", "_self");
  //   console.log("hello from google");
  // }
  
  // const github=()=>{
  //   window.open("http://localhost:5000/auth/github", "_self");
  //   console.log("hello from github");
  // }

  const dispatch=useDispatch();
  const {isFetching,error}=useSelector(state=>state.user);
  console.log(isFetching,error);
  const navigate=useNavigate();

  const [user,setUser]=useState({
    email:"",password:"",
  });

  const handleChange=(e)=>{
    setUser({...user,[e.target.name]:e.target.value})
  }

  // console.log(user);
  
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
            {/* <form onSubmit={handleSubmit} className='rform'>
                <h3><LoginIcon style={{fontSize:'xx-large'}}/> Login User</h3>
                <div className='rinput'>
                <TextField
                  id='remail'
                  label="Your Email"
                  type='email'
                  name='email'
                  value={user.email}
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
                  onChange={handleChange}
                  />
                </div>
                  <Button type='submit' variant='contained' className='rbtn' style={{backgroundColor:'black',color:'white',marginBottom:'-20px',marginTop:'5px'}} disabled={isFetching}>Login</Button><br />
                  <Link to='/register' className='rlog'>
                  Don't have account ? <span className='register'>&nbsp;Create New</span></Link>
                  <br/>
                  <Button variant='contained' className='rbtn' style={{backgroundColor:'black',color:'white',fontFamily:'cursive',marginBottom:'8px'}} onClick={google}><img src='https://cdn-icons-png.flaticon.com/128/2875/2875404.png' style={{height:'20px'}} />&nbsp;Login with Google</Button>
                  {error && <span className='or' style={{color:'red'}}>Something went wrong</span>}
                  <Button variant='contained' className='rbtn' style={{backgroundColor:'black',color:'white',fontFamily:'cursive'}} onClick={github}><GitHubIcon/>&nbsp;Login with Github</Button> */}
            {/* </form> */}
            <form onSubmit={handleSubmit}>
                <h3><LoginIcon style={{fontSize:'xx-large'}}/> Login User</h3>
                <div className='formInput'>
                    <label htmlFor='email'>Email</label>
                    <input type='email' name='email' value={user.email} onChange={handleChange} placeholder='Enter Email' />
                </div>
                <div className='formInput'>
                    <label htmlFor='password'>Password</label>
                    <input type='password' name='password' id='password' value={user.password} onChange={handleChange} placeholder='Enter Password'/>
                </div>
                <div className='formInput'>
                    <Button type='submit' variant='contained' className='rbtn' style={{backgroundColor:'black',color:'white',marginTop:'10px',fontFamily:"'candara',sans-serif"}} onClick={handleClick}>Login</Button>
                </div>
                <div className='formInput'>
                    <Link className='rlog'>
                    Don't have account ? <Link to='/register' className='register'>&nbsp;Create New</Link></Link>
                </div>
                <div className='formInput'>
                    <Button variant='contained' className='rbtn' style={{backgroundColor:'black',color:'white',fontFamily:'cursive',marginBottom:'8px',fontFamily:"'candara',sans-serif"}} ><img src='https://cdn-icons-png.flaticon.com/128/2875/2875404.png' style={{height:'20px'}} />&nbsp;Login with Google</Button>
                </div>
                {/* <div className='formInput'>
                    {error && <span className='or' style={{color:'red'}}>Something went wrong</span>}
                </div> */}
                <div className='formInput'>
                    <Button variant='contained' className='rbtn' style={{backgroundColor:'black',color:'white',fontFamily:'cursive',fontFamily:"'candara',sans-serif"}} ><GitHubIcon/>&nbsp;Login with Github</Button>
                </div>
                
            </form>
        </div>
    </div>
  )
}

export default Login
