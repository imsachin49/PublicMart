import React from 'react'
import './Navbar.scss'
import SearchIcon from '@mui/icons-material/Search';
import LanguageIcon from '@mui/icons-material/Language';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ListIcon from '@mui/icons-material/List';

const Navbar = () => {
  return (
    <div>
      <div className='navbar'>
        <div className='navbar-wrapper'>
          
          <div className='search'>
            <input type='text' placeholder='Search...' className='search-input' />
            <SearchIcon/>
          </div>

          <div className='nav-icons'>
            <span className='icon'><LanguageIcon/>English</span>
            <span className='icon'><DarkModeIcon/></span>
            <span className='icon'><FullscreenExitIcon/></span>
            <span className='icon'><ChatBubbleIcon/><p className='counter'>1</p></span>
            <span className='icon'><NotificationsIcon/><p className='counter'>2</p></span>
            <span className='icon'><ListIcon/></span>
            <span className='icon'>
              <img src='https://images.unsplash.com/photo-1483726234545-481d6e880fc6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Ym95fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60' className='avatar' alt='avatar'/>
            </span>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Navbar
