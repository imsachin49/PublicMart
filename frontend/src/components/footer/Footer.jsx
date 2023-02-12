import React from 'react'
import './Footer.css'
import Button from '@mui/material/Button'
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import GoogleIcon from '@mui/icons-material/Google';
import TelegramIcon from '@mui/icons-material/Telegram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  return (
    <div>
        <div className="footer">
        <div className='footerContainer'>
            
            <div className='leftpart'>
              <div className='newsLetter'>
                <div className='mymart'>Subsribe To NewLetter</div>
                <form className='newsEmail'>
                  <input type='email' className='enterEmail' placeholder='Enter Your Email*' />
                  <Button variant='contained' style={{borderRadius:'25px',width:'130px',paddingLeft:'25px',fontFamily:"'candara',sans-sarif"}}>Subscribe<TelegramIcon style={{margin:'5px'}}/></Button>
                </form>
              </div>
            </div>

            <div className='centerpart'>
              
              <div className='mobile'>
                <div className='MobilTitle'>MOBIRISE</div>
                <div className='phone'>Phone:&nbsp;(+91) 7352738722</div>
                <div className='phone'>Email:&nbsp;publicmart345@mail.ac.in</div>
                <div className='phone'>Address:&nbsp;1234 Street Name City, AA 99999</div>
              </div>

              <div className='socialHandles'>
                <div className='socialIcons'><TwitterIcon style={{padding:'2px'}}/></div>
                <div className='socialIcons'><FacebookIcon style={{padding:'2px'}}/></div>
                <div className='socialIcons'><YouTubeIcon style={{padding:'2px'}}/></div>
                <div className='socialIcons'><InstagramIcon style={{padding:'2px'}}/></div>
                <div className='socialIcons'><PinterestIcon style={{padding:'2px'}}/></div>
                <div className='socialIcons'><LinkedInIcon style={{padding:'2px'}}/></div>
              </div>
            </div>
            
            <div className='rightpart'>
                <div className='rightTitle'>RECENT NEWS</div>
                <div className='rightTtems'>About US</div>
                <div className='rightTtems'>Services</div>
                <div className='rightTtems'>Get In Touch</div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Footer
