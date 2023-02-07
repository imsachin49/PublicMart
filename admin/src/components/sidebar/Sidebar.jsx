import React from 'react'
import './Sidebar.scss'
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import SettingsIcon from '@mui/icons-material/Settings';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PsychologyIcon from '@mui/icons-material/Psychology';
import SurroundSoundIcon from '@mui/icons-material/SurroundSound';
import CategoryIcon from '@mui/icons-material/Category';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className='top'>
        <Link to='/' style={{textDecoration:'none'}}>
          <span className='logo'>PublicMart</span>
        </Link>
      </div>
      <hr/>

      <div className='center'>
        <ul>
          <span className='type'>Main</span>
          <li>
            <span className='icon'><DashboardIcon/>Dashboard</span>
          </li>
          <span className='type'>Lists</span>
          <li>
            <Link to='/users' style={{textDecoration:'none'}}>
              <span className='icon'><PersonIcon/>Users</span>
            </Link>
          </li>
          <li>
            <Link to='/products' style={{textDecoration:'none'}}>
              <span className='icon'><CategoryIcon/>Products</span>
            </Link>
          </li>
          <li>
            <span className='icon'><EqualizerIcon/>Stats</span>
          </li>
          <li>
            <span className='icon'><StoreMallDirectoryIcon/>Orders</span>
          </li>
          <span className='type'>Data</span>
          <li>
            <span className='icon'><LocalShippingIcon/>Delivery</span>
          </li>
          <li>
            <span className='icon'><NotificationsIcon/>Notifications</span>
          </li>
          <li>
            <span className='icon'><SurroundSoundIcon/>System Health</span>
          </li>
          <li>
            <span className='icon'><PsychologyIcon/>Logs</span>
          </li>
          <li>
            <span className='icon'><SettingsIcon/>Setting</span>
          </li>
          <span className='type'>User</span>
          <li>
            <span className='icon'><AssignmentIndIcon/>Profile</span>
          </li>
          <li>
            <span className='icon'><LogoutIcon/>LogOut</span>
          </li>
        </ul>
      <span className='type'>Color Option</span>
      <div className='bottom'>
        <span className='logo'></span>
        <span className='logo'></span>
      </div>
      </div>
    </div>
  )
}

export default Sidebar
