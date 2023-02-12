import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './Categories.css';
import { useNavigate } from 'react-router-dom';
import CategoryList from './CategoryList';
import { Link } from 'react-router-dom';

const Categories = () => {
    return (
        <div style={{ backgroundColor: 'aliceblue'}} id="categories">
            <h2>Shop Our Top Categories</h2>
            <div className='cat-categories'>
            <div className='cat-wrapper' >

                {CategoryList.map((item,id)=>{
                    return(<Link to={`/products/${item.cat}`}><div className='cat-card' key={item.id}>
                    <div className='org-card'>
                    <img src={item.img}/>
                        <div className='cat-mid'>
                            <h4 className='ctitle'>{item.cat}</h4>
                            {/* <Button className='cat-shop' color='error' variant='outlined' style={{width:'120px',display:'flex',margin:'auto',color:'black',borderColor:'black',fontWeight:'bolder'}}>Shop Now</Button> */}
                        </div> 
                    </div>
                    </div>
                    </Link>)  
                })}
            </div>
            </div>
        </div>
  )
}

export default Categories
