import React from 'react'
import './One.css'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const One = () => {
  return (
        <div className='one-wrapper'>
        <div className='one-container'> 
            <div className='one-text-container'>
                <h1>Title of Product</h1>
                <h3>$1999.50</h3>
                <p>
                    This product is awesome..This product is awesome 
                    This product is awesome..This product is awesome 
                    This product is awesome..This product is awesome 
                </p>

                <div className='mido'>
                    <div className='qnt'>
                        <Button className='sbtn' style={{fontWeight:'bolder',fontSize:'larger',borderRadius:'50px'}}><AddIcon/></Button>
                        <p>1</p>
                        <Button className='sbtn' style={{fontWeight:'bolder',fontSize:'larger',borderRadius:'50px'}}><RemoveIcon/></Button>
                    </div>
                    {/* <div className='size'>
                        <select className='select1' style={{outline:'none',padding:'5px',borderRadius:'7px'}}>
                            <option value=''>Select Size</option>
                            <option>syz1</option>
                            <option>syz2</option>
                            <option>syz3</option>
                            <option>syz4</option>
                        </select>
                    </div> */}
                </div>

                <Button className='abtn' style={{backgroundColor:'black',color:'white',borderRadius:'25px',width:'200px',display:'flex',justifyContent:"center",margin:'auto'}}>Add to Cart</Button>   
            </div>


            <div className='one-image-container'>
                <img src='https://t3.ftcdn.net/jpg/05/52/32/86/240_F_552328694_vUBiX79fbIkeZhOoHn2NkhL1vsMcaMxy.jpg' />
            </div>
        </div>

    </div>
  )
}

export default One
