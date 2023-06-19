import React from 'react'
import './NewsLetter.css'
import { useState } from 'react'

const NewsLetter = () => {
    const [email,setEmail] = useState('');
    const subscribe = (e) => {
        e.preventDefault();
        setEmail('');
    }
    
  return (
    <div className='newsLetterContainer' id="delivery">
        <div className='newsLetter'>
            <h4 className='newsLetterTitle'>Subscribe to our Newsletter</h4>
            <p className='subInfo'>Get updates on sales and Offers directly to your inbox</p>
            <form onSubmit={subscribe} data-aos="fade-left" data-aos-duration="2000">
                <input type='email' value={email} placeholder='Enter your email address' className='subInput' onChange={e=>setEmail(e.target.value)} />
                <button className='subBtn' type='submit'>Subscribe</button>
            </form>
        </div>
    </div>
  )
}

export default NewsLetter