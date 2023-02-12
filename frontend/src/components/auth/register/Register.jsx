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
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const Register = () => {

  // const google=()=>{
  //   window.open("http://localhost:5000/auth/google", "_self");
  //   console.log("hello from google");
  // }

  // const github=()=>{
  //   window.open("http://localhost:5000/auth/github", "_self");
  //   console.log("hello from github");
  // }

  const smallSc=useMediaQuery('(max-width: 800px)')
  const navigate=useNavigate();
  const [user,setUser]=useState({
    username:"",phone:"",email:"",password:"",pwd2:""
  });

  const handleChange=(e)=>{
    setUser({...user,[e.target.name]:e.target.value})
    console.log("you arre user:-")
    // console.log(user)
  }
  
  const sendRequest=async()=>{
    try{
      const res=await axios.post('https://full-stack-ecommerce-mu.vercel.app/api/auth/register',user);
      const data=await res.data;
      console.log(data);
      return data;
    }catch(err){
      console.log(err); 
    }
  }

  // console.log(user)
  
  const handleSubmit=async(e)=>{
    e.preventDefault();
    sendRequest();
    navigate('/login');
    // const res=await axios.post('http://localhost:5000/api/auth/register',user);
    console.log(user);
  }


  return (
    <div className='main-form'>
        <div className='box'>
            {/* <form onSubmit={handleSubmit} className='form'>
                <h3><PersonAddIcon style={{fontSize:'x-large'}}/>Create Account</h3>
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

                  <Button type='submit' variant='contained' className='btn' style={{backgroundColor:'black',color:'white',margin:'3px 0px'}}>Continue</Button>
                  <Link to='/login' className='log'>Already have an account? <span className='login'>&nbsp;Login</span> </Link>
                  <Button variant='contained' className='btn' style={{backgroundColor:'black',color:'white',fontFamily:'cursive',marginBottom:'8px'}} ><img src='https://cdn-icons-png.flaticon.com/128/2875/2875404.png' style={{height:'20px'}} />&nbsp;Continue with Google</Button>
                  <Button variant='contained' className='btn' style={{backgroundColor:'black',color:'white',fontFamily:'cursive'}} ><GitHubIcon/>&nbsp;Continue with Github</Button>
                  
            </form> */}

              <h6><PersonAddIcon style={{fontSize:'x-large'}}/>Create Account</h6>
            <form onSubmit={handleSubmit}>
                <div className='formInput'>
                    <label htmlFor='username'>Username</label>
                    <input type='text' name='username' id='username' value={user.username} onChange={handleChange} required placeholder='First and Last Name'/>
                </div>
                {/* phone number input */}
                <div className='formInput'>
                    <label htmlFor='phone'>Mobile Number</label>
                    <input type='tell' name='phone' id='phone' value={user.phone} onChange={handleChange} required placeholder='Mobile Number'/>
                </div>
                <div className='formInput'>
                    <label htmlFor='email'>Email</label>
                    <input type='email' name='email'  value={user.email} onChange={handleChange} required/>
                </div>
                <div className='formInput'>
                    <label htmlFor='password'>Password</label>
                    <input type='password' name='password' id='password' value={user.password} onChange={handleChange} required placeholder='At least 4 characters'/>
                </div>
                <div className='formInput'>
                    <label htmlFor='password2'>Confirm Password</label> 
                    <input type='password' name='pwd2' id='password2' value={user.pwd2} onChange={handleChange} required/>
                </div>
                <div className='formInput'>
                    <Button type='submit' variant='contained' className='btn' style={{backgroundColor:'black',color:'white',margin:'3px 0px',fontFamily:"'candara',sans-serif",marginTop:'11px'}}>Continue</Button>
                </div>
                <div className='formInput'>
                    <Link  className='log'>Already have an account? <Link className='login' to='/login'>&nbsp;Login</Link> </Link>
                </div>
                <div className='formInput'>
                    <Button variant='contained' className='btn' style={{backgroundColor:'black',color:'white',fontFamily:'cursive',marginBottom:'8px',fontFamily:"'candara',sans-serif"}} ><img src='https://cdn-icons-png.flaticon.com/128/2875/2875404.png' style={{height:'20px'}} />&nbsp;Continue with Google</Button>
                </div>
                <div className='formInput'>
                    <Button variant='contained' className='btn' style={{backgroundColor:'black',color:'white',fontFamily:'cursive',fontFamily:"'candara',sans-serif",marginBottom:'5px'}} ><GitHubIcon/>&nbsp;Continue with Github</Button>
                </div>
            </form>
        </div>
    </div>
  )
} 

export default Register
