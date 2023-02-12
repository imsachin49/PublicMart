import React from 'react'
import {json, Link} from 'react-router-dom'
import Button from '@mui/material/Button';
import { Stack } from '@mui/system';
import { IconButton, Typography } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import SearchIcon from '@mui/icons-material/Search';
import Search from '@mui/icons-material/Search';
import ShopIcon from '@mui/icons-material/Shop';
import InputBase from '@mui/material/InputBase';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { useSelector } from 'react-redux';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { setLogout } from '../../redux/userRedux';
import {Box,Select,FormControl} from "@mui/material";
import { useDispatch } from 'react-redux';

const Navbar = ({user}) => {
    var isUser=false;
    const cart=useSelector(state=>state.cart);
    const quantity=useSelector(state=>state.cart.quantity);
    const currentUser=useSelector(state=>state.user.currentUser.user);
    console.log(currentUser);
    const dispatch=useDispatch();
    const navigate=useNavigate();

    if(currentUser){
        console.log(currentUser.username);
        isUser=true;
    }
    else{
        console.log("no user");
        isUser=false;
    }

    const handleLogout=()=>{
        dispatch(setLogout());
        navigate('/')
    }

    return (
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">

        <div className='logo'>
            <img src='https://img.icons8.com/bubbles/1x/shopping-cart.png' alt='no-images' className='logoImg' />
            <Link className='logoName' to='/'>PublicMart</Link>
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
            
            {!isUser ? (<><Link className='NavAuthItems' to='/login' style={{textDecoration:'none',color:'black'}}>
                <LoginIcon fontSize='10px' />
                <span className='NavAuthText'>Login</span>
            </Link>
            
            <Link className='NavAuthItems' to='/register' style={{textDecoration:'none',color:'black'}}>
                <PersonAddIcon fontSize='10px' />
                <span className='NavAuthText'>Signup</span>
            </Link></>) :

            (<>
            <div className='NavAuthItems'>
                {/* <PermIdentityOutlinedIcon />
                <span className='NavAuthText' style={{textTransform:'capitalize'}}>{currentUser.username}</span> */}
                <FormControl variant="standard" value={currentUser.username} style={{backgroundColor:'#e2dede'}}>
                    <Select
                    value={currentUser.username}
                    sx={{
                        backgroundColor: '#e2dede',
                        borderRadius: "25px",
                        p: "0rem 1rem",
                        "& .MuiSvgIcon-root": {
                        pr: "0.25rem",
                        width: "3rem",
                        },
                        "& .MuiSelect-select:focus": {
                        backgroundColor: '#e2dede',
                        },
                        fontFamily:"'candara',sans-serif",
                        textTransform:'capitalize'
                    }}
                    input={<InputBase />}
                    >
                    <MenuItem value={currentUser.username} style={{fontFamily:"'candara',sans-serif",textTransform:'capitalize'}}>
                        <Typography style={{fontFamily:"'candara',sans-serif",fontWeight:'bold'}}>{currentUser.username}</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleLogout} style={{fontFamily:"'candara',sans-serif",fontWeight:'bold'}}>Log Out</MenuItem>
                    </Select>
                </FormControl>
            </div>

            <Link className='NavAuthItemsCart' to='/cart' style={{textDecoration:'none',color:'black'}}>
                <span className='carts'>Carts</span>
                <IconButton>
                <Badge badgeContent={quantity} color="secondary">
                    <ShoppingCartIcon />
                </Badge>
                </IconButton>
            </Link></>)}
        </div>

        </div>
    </div>
    </nav>
    
  )
}

export default Navbar
