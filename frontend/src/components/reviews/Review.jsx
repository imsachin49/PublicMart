import { AiTwotoneStar } from 'react-icons/ai'

const Review = ({ item }) => {
  const generateProfilePic = (userName) => {
    const baseUrl = "https://api.dicebear.com/9.x/avataaars/svg";
    const avatarUrl = `${baseUrl}?seed=${encodeURIComponent(userName)}`;
    return avatarUrl;
  };

  return (
    <div className='revCard'>
      <div className='revCardHeader'>
        <img alt='no' className='revUser' src={generateProfilePic(item?.username || "raviraj")} />
        <div className='revUserInfo'>
          <h1 className='revUserName'>{item?.username || "unknown"}</h1>
          <p className='revUserDate'>{item?.createdAt?.substr(0, 10)}</p>
        </div>
        <p className='revUserStars'>
          <b className='starbold'>{item?.rating}</b>
          <AiTwotoneStar />
        </p>
      </div>
      <div className='revBody'>
        <p className='revBodyText'>
          {item?.review}
        </p>
      </div>
    </div>
  );
}

export default Review;
