import React from 'react'
import './Register.css'
import TextField from '@mui/material/TextField';
import { Button, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useState } from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {

  const google=()=>{
    window.open("http://localhost:5000/auth/google", "_self");
    console.log("hello from google");
  }

  // const github=()=>{
  //   window.open("http://localhost:5000/auth/github", "_self");
  //   console.log("hello from github");
  // }

  const smallSc=useMediaQuery('(max-width: 800px)')
  const navigate=useNavigate();
  const [user,setUser]=useState({
    username:"",email:"",pwd1:"",pwd2:""
  });

  const handleChange=(e)=>{
    setUser({...user,[e.target.name]:e.target.value})
  }
  
  const sendRequest=async()=>{
    try{
      const res=await axios.post('http://localhost:5000/api/auth/register',user);
      const data=await res.data;
      console.log(data);
      return data;
    }catch(err){
      console.log(err);
      
    }
  }
  
  const handleSubmit=async(e)=>{
    e.preventDefault();
    sendRequest();
    navigate('/login');
    // const res=await axios.post('http://localhost:5000/api/auth/register',user);
  }


  return (
    <div className='main-form'>
        <div className='box'>
            <form onSubmit={handleSubmit} className='form'>
                <h3><PersonAddIcon style={{fontSize:'xx-large'}}/> Register User</h3>
                <div className='input'>
                  <TextField
                    id='fname'
                    label="Username"
                    type='text'
                    name='username'
                    value={user.username}
                    required
                    onChange={handleChange}
                    /> 
                </div>
                
                <div className='input'>
                <TextField
                  id='lname'
                  label="Your Email"
                  type='email'
                  name='email'
                  value={user.email}
                  required
                  onChange={handleChange}
                />
                </div>


                <div className='input'>
                <TextField
                  id='pwd1' 
                  label="Password"
                  type='password' 
                  name='pwd1' 
                  value={user.pwd1}
                  required
                  onChange={handleChange}
                  />
                </div>

                <div className='input'>
                <TextField
                  id='pwd2'
                  label="Confirm Password"
                  type='password'
                  name='pwd2'
                  value={user.pwd2}
                  required
                  onChange={handleChange}
                  />
                </div>

                  <Button type='submit' variant='contained' className='btn' style={{backgroundColor:'black',color:'white',fontFamily:'cursive'}}>Submit</Button>
                  <Link to='/login' className='log'>Already registered? Login now.</Link>
                  <Button variant='contained' className='btn' style={{backgroundColor:'black',color:'white',fontFamily:'cursive',marginBottom:'8px'}} onClick={google}><img src='https://cdn-icons-png.flaticon.com/128/2875/2875404.png' style={{height:'20px'}} />&nbsp;Continue with Google</Button>
                  {/* <Button variant='contained' className='btn' style={{backgroundColor:'black',color:'white',fontFamily:'cursive'}} onClick={github}><GitHubIcon/>&nbsp;Continue with Github</Button> */}
                  
            </form>
        </div>
    </div>
  )
} 

export default Register
