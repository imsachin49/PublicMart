import React from 'react'
import './Login.scss'
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Button } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/apiCalls';

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch=useDispatch();
  
  const handleSubmit = (e) => {
    e.preventDefault()
    login(dispatch,{email, password})
    console.log(email,password)
  }
  
  return (
    <div className='login'>
    <div className='top'> 
      <div className='Topwrapper'>
      <div className='logo'>
            <img src='https://img.icons8.com/bubbles/1x/shopping-cart.png' alt='no-images' className='logoImg' />
            <div className='logoName' to='/'>PublicMart</div>
        </div>
      </div>  
    </div>
    <div className='loginContainer'>
      <h2><DashboardIcon/>Login Dashboard</h2>
      <form onSubmit={handleSubmit}>
        <div className='input1'>
          <input type='email' placeholder='Enter Email..' className='loginInput' onChange={e=>setEmail(e.target.value)} />
        </div>
        <div className='input1'>
          <input type='password' placeholder='Password' className='loginInput' onChange={e=>setPassword(e.target.value)} />
        </div>
        <div className='input1'>
          <Button type='submit' className='loginButton'>Login</Button>
        </div>
      </form>
    </div>
    </div>
  )
}

export default Login
