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
import CircularProgress from '@mui/material/CircularProgress';


const Register = () => {

  // const google=()=>{
  //   window.open("https://full-stack-ecommerce-mu.vercel.app/auth/google", "_self");
  //   console.log("hello from google");
  // }

  // const github=()=>{
  //   window.open("https://full-stack-ecommerce-scm2.vercel.app/auth/github", "_self");
  //   console.log("hello from github");
  // }

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "", phone: "", email: "", password: ""
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  // const sendRequest=async()=>{
  //   try{
  //     setLoading(true);
  //     const res=await axios.post('https://full-stack-ecommerce-mu.vercel.app/api/auth/register',user);
  //     const data=await res.data;
  //     return data;
  //   }catch(err){
  //     console.log(err); 
  //     setError(true);
  //   }
  //   setLoading(false);
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post('https://full-stack-ecommerce-mu.vercel.app/api/auth/register', user);
      const data = await res.data;
      console.log(data);
      navigate('/login');
    } catch (error) {
      setError(true);
      console.log(error);
    }
    setLoading(false);
  }

  return (
    <div className='main-form'>
      <div className='box'>
        <h1 className='pgText'>Create Your Account !!</h1>
        <p className='pgTextSm'>Get started with your free account</p>
        <form onSubmit={handleSubmit}>
          <div className='formInput'>
            <label htmlFor='username'>Username</label>
            <input type='text' name='username' id='username' value={user.username} onChange={handleChange} required placeholder='First and Last Name' />
          </div>
          <div className='formInput'>
            <label htmlFor='phone'>Mobile Number</label>
            <input type='tell' name='phone' id='phone' value={user.phone} onChange={handleChange} required placeholder='Mobile Number' />
          </div>
          <div className='formInput'>
            <label htmlFor='email'>Email</label>
            <input type='email' name='email' value={user.email} onChange={handleChange} required />
          </div>
          <div className='formInput'>
            <label htmlFor='password'>Password</label>
            <input type='password' name='password' id='password' value={user.password} onChange={handleChange} required placeholder='At least 4 characters' />
          </div>
          <div className='formInput'>
            {!loading ? <Button type='submit' variant='contained' className='btn' style={{ backgroundColor: 'black', color: 'white', margin: '3px 0px', fontFamily: "'candara',sans-serif", marginTop: '11px' }}>Continue</Button>
              : <Button type='submit' variant='contained' className='btn' style={{ backgroundColor: 'black', color: 'white', margin: '3px 0px', fontFamily: "'candara',sans-serif", marginTop: '11px' }}><CircularProgress style={{ color: 'white' }} /></Button>}
          </div>
          <div className='formInput'>
            <Link className='log'>Already have an account? <Link className='login' to='/login'>&nbsp;Login</Link> </Link>
          </div>
          {error && <p className='wrong'>Something went Wrong..</p>}
          {/*<div className='formInput'>
                     <Button variant='contained' className='btn' style={{backgroundColor:'black',color:'white',fontFamily:'cursive',marginBottom:'8px',fontFamily:"'candara',sans-serif"}} onClick={google}><img src='https://cdn-icons-png.flaticon.com/128/2875/2875404.png' style={{height:'20px'}} />&nbsp;Continue with Google</Button>
              </div>*/}
          {/*<div className='formInput'>
                  <Button variant='contained' className='btn' style={{backgroundColor:'black',color:'white',fontFamily:'cursive',fontFamily:"'candara',sans-serif",marginBottom:'5px'}} ><GitHubIcon/>&nbsp;Continue with Github</Button>
              </div>*/}
        </form>
      </div>
    </div>
  )
}

export default Register
