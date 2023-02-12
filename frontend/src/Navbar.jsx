import React, { useState } from 'react'
import './Navbar.css'
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Navbar = () => {
  const isUser=true;

  return (
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">

        <div className='logo'>
            <img src='https://img.icons8.com/bubbles/1x/shopping-cart.png' alt='no-images' className='logoImg' />
            <div className='logoName'>PublicMart</div>
        </div>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="collapse navbar-collapse" id="navbarSupportedContent">

        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        {/* <div className="navbarMenu navbar-nav"> */}
            <div className='navbarMenuItems'>Home</div>
            <div className='navbarMenuItems'>
               <span className='catNav'>Categories</span>
               <KeyboardArrowDownIcon />
            </div>
            <div className='navbarMenuItems'>What's New</div>
            <div className='navbarMenuItems'>Delivery</div>
        {/* </div> */}
        </ul>

        <div className='NavAuth'>            
            <div className='NavAuthItems1'>
                <input type='text' placeholder='Search Products' className='searchInput'/>
                <SearchIcon />
            </div>
            
            {!isUser ? (<><div className='NavAuthItems'>
                <LoginIcon fontSize='10px' />
                <span className='NavAuthText'>Login</span>
            </div>
            
            <div className='NavAuthItems'>
                <PersonAddIcon fontSize='10px' />
                <span className='NavAuthText'>Signup</span>
            </div></>) :

            (<><div className='NavAuthItems'>
                <PermIdentityOutlinedIcon />
                <span className='NavAuthText'>Account</span>
            </div>

            <div className='NavAuthItemsCart'>
                <IconButton>
                <Badge badgeContent={1} color="secondary">
                    <ShoppingCartIcon />
                </Badge>
                </IconButton>
            </div></>)}
        </div>

        </div>
    </div>
    </nav>
  )
}

export default Navbar