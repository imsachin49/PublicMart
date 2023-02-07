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
import Badge from '@mui/material/Badge';
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

const Navbar = ({user}) => {
    // console.log(user.user.username);
    const cart=useSelector(state=>state.cart);
    const quantity=useSelector(state=>state.cart.quantity);
    // const currentUser=useSelector(state=>state.user.currentUser.user.username);
    // const lik=JSON.stringify(currentUser);
    // const firstName=currentUser.split(" ")[0];
    // console.log(firstName);
    // console.log(cart);

    const navigate=useNavigate()
    const handleRegister=()=>{
        navigate('/register');
    }
    const handleLogin=()=>{
        navigate('/login')
    }
    const handleCart=()=>{
        navigate('/cart');
    }

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
    <div>
        <nav className="navbar navbar-expand-lg" style={{backgroundColor:'#e3f2fd'}}>
        {/* <div> */}
            <div className="container-fluid">
                <Link className="navbar-brand" style={{fontFamily:"'Lemonada', cursive"}} to='/'>PublicMart</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item" style={{display:'flex',alignItems:'center',border:'1px solid black',borderRadius:'10px',backgroundColor:'white'}}>
                            <Search className='search' style={{marginLeft:"10px",maxWidth:'300px'}}/>
                            <InputBase placeholder="Search Products..." style={{padding:'0% 1%',fontWeight:'lighter',fontFamily:'cursive'}} />
                        </li> 
                    </ul>
                    {!user ? (<><Stack className='login'>
                        <Button variant="outlined" style={{color:'black',borderColor:'black',fontWeight:'normal'}}  onClick={handleLogin}>
                            <Typography sx={{fontFamily:'cursive'}}><LoginIcon />Login</Typography>    
                        </Button>
                    </Stack>


                    <Stack className='signup'>
                        <Button variant="outlined" style={{color:'black',borderColor:'black',fontWeight:'normal'}} onClick={handleRegister}>
                            <Typography sx={{fontFamily:'cursive'}}><PersonAddIcon />SignUp</Typography>    
                        </Button>
                    </Stack></>) :
                    
                    (<>
                        
                    <Stack className='cart'>
                        <Button variant="outlined" style={{color:'black',borderColor:'black'}}  onClick={handleCart}>
                                <Typography sx={{fontFamily:'cursive'}}><ShoppingCartIcon/>Cart({quantity})</Typography>    
                        </Button>
                    </Stack>

                    {/* <Stack className='signup'>
                        <Button variant="outlined" style={{color:'black',borderColor:'black',fontWeight:'normal'}}>
                            <Typography sx={{fontFamily:'cursive'}}><LogoutIcon />Logout</Typography>    
                        </Button>
                    </Stack> */}

                    
                        <Button variant='outlined' style={{color:'black',borderColor:'black'}} >
                            <Typography 
                                sx={{fontFamily:'cursive'}} 
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                                >firstName <ExpandMoreIcon/>
                            </Typography>    
                        </Button>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                            'aria-labelledby': 'basic-button',
                            }}>
                            <MenuItem onClick={handleClose}>
                                <Typography style={{fontWeight:'bold',color:'green'}}>My Account</Typography>
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                <Typography style={{fontWeight:'bold',color:'red'}}>Logout<PowerSettingsNewIcon/></Typography>
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                <Typography style={{fontWeight:'bold'}}>Help?</Typography>
                            </MenuItem>
                        </Menu>
                    </>)}
                   
                </div>
            </div>
        </nav>
    </div>
  )
}

export default Navbar
