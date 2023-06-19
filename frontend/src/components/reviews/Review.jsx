import React from 'react'
import {AiTwotoneStar} from 'react-icons/ai'

const Review = ({item}) => {
  
  const generateProfilePic = (userName) => {
    const baseUrl = "https://avatars.dicebear.com/api/";
    const style = "identicon";
    const avatarUrl = `${baseUrl}${style}/${encodeURIComponent(userName)}.svg`;
    return avatarUrl;
  };

  return (
    <div className='revCard'>
        
      <div className='revCardHeader'>
        <img alt='no' className='revUser' src={generateProfilePic(item.name)} />
        <div className='revUserInfo'>
          <h1 className='revUserName'>{item.name}</h1>
          <p className='revUserDate'>{item.date}</p>
        </div>
        <p className='revUserStars'><b className='starbold'>{item.rating}</b><AiTwotoneStar/></p>
      </div>

      <div className='revBody'>
        <p className='revBodyText'>
          {item.comment}
        </p>
        {/*<p className='stars'>
          ⭐⭐⭐⭐
        </p>*/}
      </div>
        
    </div>
  )
}

export default Review
