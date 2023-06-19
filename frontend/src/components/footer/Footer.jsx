import React from 'react'
import './Footer.css'
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GithubIcon from '@mui/icons-material/GitHub';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="mainfooter" role="contentinfo">
      <div className="footer-middle">
        <div className="container">
          <div className="row">

            <div className="col-md-3 col-sm-6">
              <div className="footer-pad boxesx">
                <h4 className="footHead">Privacy Policies</h4>
                <ul className="list-unstyled">
                  <li><Link className="catText" to="#">Contact us</Link></li>
                  <li><Link className="catText" to="#">Terms & Condition </Link></li>
                  <li><Link className="catText" to="#">Cancellation</Link></li>
                  <li><Link className="catText" to="#">FAQs</Link></li>
                  <li><Link className="catText" to="#">Returns</Link></li>
                  <li><Link className="catText" to="#">Track your Orders</Link></li>
                </ul>
              </div>
            </div>

            <div className="col-md-3 col-sm-6">
              <div className="footer-pad boxesx">
                <h4 className="footHead">About P.M.</h4>
                <ul className="list-unstyled">
                  <li><Link className="catText" to="#">About us</Link></li>
                  <li><Link className="catText" to="#">Carrers</Link></li>
                  <li><Link className="catText" to="#">PublicMart Stories</Link></li>
                  <li><Link className="catText" to="#">Corporate Info</Link></li>
                  <li><Link className="catText" to="#">News and Updates</Link></li>
                  <li><Link className="catText" to="#">Health</Link></li>
                </ul>
              </div>
            </div>

            <div className="col-md-3 col-sm-6">
              <div className="footer-pad boxesx">
                <h4 className="footHead">Useful Links</h4>
                <ul className="list-unstyled">
                  <li><Link className="catText" to="#">Blogs/Articles</Link></li>
                  <li><Link className="catText" to="#">Carriers</Link></li>
                  <li><Link className="catText" to="#">Site map</Link></li>
                  <li><Link className="catText" to="#">Fire</Link></li>
                  <li><Link className="catText" to="#">Investors</Link></li>
                  <li><Link className="catText" to="#">Hot Sales</Link></li>
                  <li>
                    <Link className="catText" to="#"></Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-md-3 col-sm-6">
              <div className="footer-pad boxesx">
                <h4 className="footHead">Follow Us</h4>
                <ul className="social-network social-circle">
                  <li className='socialsIcon'><TwitterIcon className='i'/></li>
                  <li className='socialsIcon'><InstagramIcon className='i'/></li>
                  <li className='socialsIcon'><FacebookIcon className='i'/></li>
                  <li className='socialsIcon'><GithubIcon className='i'/></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12 copy">
              <p className="text-center right">&copy; Copyright <span className='yr'>2022</span> - PublicMart.  All rights reserved.</p>
            </div>
          </div>

        </div>
      </div>
    </footer>
  )
}

export default Footer
