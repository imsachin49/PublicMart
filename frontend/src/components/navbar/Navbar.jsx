import React,{useState} from 'react'
import { Link,useNavigate,useLocation} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { NavHashLink } from 'react-router-hash-link';
import { setLogout } from '../../redux/userRedux';
import { IconButton, Typography } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import LoginIcon from '@mui/icons-material/Login';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import './Navbar.css';
import MenuItem from '@mui/material/MenuItem';
import { useSelector } from 'react-redux';
import Badge from '@mui/material/Badge';
import {Select,FormControl} from "@mui/material";

const Navbar = ({user}) => {
    var isUser=false;
    const quantity=useSelector(state=>state?.cart?.quantity);
    const currentUser=useSelector(state=>state?.user?.currentUser?.user);
    // console.log(currentUser);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [title,setTitle]=useState('');
    const location=useLocation();
    console.log(location.pathname);
    const isAuthPage=location.pathname==='/login' || location.pathname==='/register';
    console.log(isAuthPage);

    if(currentUser){
        // console.log(currentUser.username);
        isUser=true;
    }
    else{
        // console.log("no user");
        isUser=false;
    }

    const handleLogout=()=>{
        dispatch(setLogout());
        navigate('/')
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        // console.log(title);
        if(title?.trim().length>0){
          navigate(`/search?title=${title.trim()}`);
        }
        else{
          console.log("hello heloo");
          navigate('/');
        }
      }

    return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
    <div className="container-fluid">

        <div className='logo'>
            <img src='https://img.icons8.com/bubbles/1x/shopping-cart.png' alt='no-images' className='logoImg' />
            <Link className='logoName' to='/'>PublicMart</Link>
        </div>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarSupportedContent">

        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        {!isAuthPage && <>
            <NavHashLink to='/' className='equal'><div className='navbarMenuItems'>Home</div></NavHashLink>
            <NavHashLink to='/#categories' className='equal'><div className='navbarMenuItems'>
               <span className='catNav'>Categories</span>
               <KeyboardArrowDownIcon />
            </div></NavHashLink>
            <NavHashLink to='/#new' className='equal'><div className='navbarMenuItems'>What's New</div></NavHashLink>
            <NavHashLink to='/#delivery' className='equal'><div className='navbarMenuItems'>Delivery</div></NavHashLink>
            </>}
        </ul>

        <div className='NavAuth'>            
        {!isAuthPage && <form className='NavAuthItems1' onSubmit={handleSubmit}>
                <input type='text' placeholder='Search Products' className='searchInput' onChange={e=>setTitle(e.target.value)} name='title' value={title}/>
                <SearchIcon />
            </form>}
            
            {!isUser ? (<div><Link className='NavAuthItems' to='/login' style={{textDecoration:'none',color:'black'}}>
                <LoginIcon fontSize='10px' />
                <span className='NavAuthText'>Login</span>
            </Link>
            
            <Link className='NavAuthItems' to='/register' style={{textDecoration:'none',color:'black'}}>
                <PersonAddIcon fontSize='10px' />
                <span className='NavAuthText'>Signup</span>
            </Link></div>) :

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
