import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import './New.scss'
import { useState } from 'react';

const New = ({inputs,title}) => {
  const [file,setFile]=useState('')
  return (
    <div className='new'>
      <Sidebar />
      <div className='newContainer'>
        <Navbar />
        <div className='top'>
          <h1>{title}</h1>
        </div>
        <div className='bottom'>
          <div className='left'>
            <img src={file ? URL.createObjectURL(file) : 'https://cdn-icons-png.flaticon.com/128/7605/7605247.png'} className='myimg' alt='no img'/>
          </div>
          <div className='right'>
            <form className='form'>
              
              <div className='formItem'>
                <label htmlFor='file' className='lbfile'>
                  Image:<DriveFolderUploadIcon className='icon'/>
                </label>
                <input type='file' id='file' onChange={e=>setFile(e.target.files[0])} style={{display:'none'}} />
              </div>

              {inputs.map((input)=>{
                return(<div className='formItem' key={input.id}>
                  <label>{input.label}</label>
                  <input type={input.type} placeholder={input.placeholder}/>
                </div>)
              })}

              {/* <div className='formItem'>
                <label>Username</label>
                <input type='text' placeholder='charlie_chaplin23'/>
              </div>
              
              <div className='formItem'>
                <label>Full Name</label>
                <input type='text' placeholder='Charlie Chaplin' />
              </div>
              
              <div className='formItem'>
                <label>Email</label>
                <input type='email' placeholder='chachapline4312@gmail.com' />
              </div>
              
              <div className='formItem'>
                <label>Password</label>
                <input type='password' placeholder='********' />
              </div>
              
              <div className='formItem'>
                <label>Phone</label>
                <input type='text' placeholder='+91 XXXXXXXXXX' />
              </div>
              
              <div className='formItem'>
                <label>Address</label>
                <input type='text' placeholder='Address' />
              </div>
              
              <div className='formItem'>
                <label>Country</label>
                <input type='text' placeholder='India'/>
              </div> */}

              <button className='btn'>Create</button>
            </form>                
          </div>
        </div>
      </div>
    </div>
  )
}

export default New