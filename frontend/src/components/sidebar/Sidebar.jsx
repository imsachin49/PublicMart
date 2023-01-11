import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import HelpIcon from '@mui/icons-material/Help';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Avatar, Badge } from '@mui/material';
import ArrowCircleRightSharpIcon from '@mui/icons-material/ArrowCircleRightSharp';
import ArrowRightSharpIcon from '@mui/icons-material/ArrowRightSharp';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import Button from '@mui/material/Button';

const Sidebar = () => {
	const [isExpanded,setExpanded]=useState(false);

  return (
	<div className={isExpanded ? 'side-nav-container' : 'side-nav-container side-nav-container-NX' }>
		<div className='nav-upper'>
			<div className='nav-heading'>
				{isExpanded && (<div className='nav-brand'>
					{/* Logo  */}
					<h2 style={{fontFamily:"Lemonada', cursive"}}>PublicMart</h2>
				</div>)}
				<button className={isExpanded ? 'hamburger hamburger-in' : 'hamburger hamburger-out'} onClick={()=>setExpanded(!isExpanded)}>
					{/* <span></span>
					<span></span>
					<span></span> */}
					<MenuIcon fontSize='large'/>
				</button>
			</div>
			<div className='nav-menu'>
				<Link className={isExpanded ? 'menu-item' :'menu-item menu-item-NX'}> 
					<HomeIcon fontSize='medium'/>
					{isExpanded && <p>Home</p>}
				</Link>
				<Link className={isExpanded ? 'menu-item' :'menu-item menu-item-NX'}> 
					<ArrowCircleRightSharpIcon fontSize='medium'/>
					{isExpanded && <p>Category1</p>}
				</Link>
				<Link className={isExpanded ? 'menu-item' :'menu-item menu-item-NX'}> 
					<ArrowCircleRightSharpIcon fontSize='medium'/>
					{isExpanded && <p>Category2</p>}
				</Link>
				<Link className={isExpanded ? 'menu-item' :'menu-item menu-item-NX'}style={{}}> 
					<Badge badgeContent={4} color="primary">
  						<ShoppingCartIcon style={{color:'white'}} fontSize='medium'/>					</Badge>
					{isExpanded && <p>Cart</p>}
				</Link>
				<Link className={isExpanded ? 'menu-item' :'menu-item menu-item-NX'}> 
					<Badge badgeContent={9} color="primary">
  						<NotificationsIcon style={{color:'white'}} fontSize='medium' />
					</Badge>
					{isExpanded && <p>Notifications</p>}
				</Link>
				<Link className={isExpanded ? 'menu-item' :'menu-item menu-item-NX'}> 
					<DarkModeIcon fontSize='medium'/>
					{isExpanded && <p>DarkMode</p>}
				</Link>
				{/* <Link variant='outlined' className={isExpanded ? 'menu-item' :'menu-item menu-item-NX'}> 
					<PersonRoundedIcon fontSize='medium'/>
					{isExpanded && <p>Sachin</p>}
				</Link> */}
			</div>
			{/* </div> */}
			<Button className="nav-footer" variant='outlined' style={{color:'white',border:'none',top:'0'}} color='info'>
					{isExpanded && (<div className="nav-details">
						<Avatar className='nav-details-img'/>
						<div className="nav-footer-info">
							<p className="nav-footer-user-name">Sachin</p>
							<p className="nav-footer-user-position">User...</p>
						</div>
					</div>)}
					<LogoutRoundedIcon fontSize='large'/>
			</Button>
			</div>
	</div>
  )
}

export default Sidebar
