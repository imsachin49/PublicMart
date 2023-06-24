import img2 from '../../assets/products/apparel2.jpg'
import './Recommended.css'
import {useNavigate} from 'react-router-dom'

const SingleRecommend = ({ item }) => {
  const navigate = useNavigate()
  const goto = () => {
    navigate(`/product/${item._id}`)
  }
  
  return (
    <div className='recCard' onClick={goto}>
      <div className='recCardImg'>
        <img alt='no' className='recProductImg' src={item?.img} height={200} />
        <div className='recProductInfo'>
          <h1 className='recProductName'>{(item?.title)?.substr(0, 22)}</h1>
          <p className='recProductPrice'>₹{item.price}</p>
        </div>
      </div>
    </div>
  )
}

export default SingleRecommend
