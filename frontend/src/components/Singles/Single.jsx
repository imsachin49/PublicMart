import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, useMediaQuery } from '@mui/material'
import KeyboardDoubleArrowRightSharpIcon from '@mui/icons-material/KeyboardDoubleArrowRightSharp';
import ShoppingCartSharpIcon from '@mui/icons-material/ShoppingCartSharp';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { publicRequest } from '../../requestMethods';
import { addProduct } from '../../redux/cartRedux';
import CircularProgress from '@mui/material/CircularProgress';
import LoginIcon from '@mui/icons-material/Login';
import './Single.css'
import Reviews from '../reviews/Reviews';
import NewsLetter from '../NewsLetter/NewsLetter';
import Footer from '../footer/Footer';
import Recommended from '../recommended/Recommended';
import { RWebShare } from 'react-web-share'
import { FaShare } from 'react-icons/fa';

const Single = () => {
    const location = useLocation();
    const id = location.pathname.split('/')[2];
    const [product, setProdut] = useState({});
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state?.user?.currentUser?.user);
    const cart = useSelector(state => state?.cart);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [size, setSize] = useState('');
    const [color, setColor] = useState('');
    const isMobile = useMediaQuery('(max-width:365px)');
    const navigate = useNavigate();

    useEffect(() => {
        const getProduct = async () => {
            try {
                setLoading(true);
                const res = await publicRequest.get(`/products/find/${id}`);
                setProdut(res.data);
                setLoading(false);
            } catch (err) {
                console.log(err);
                setError(true);
            }
        }
        getProduct();
    }, [id])

    const handleChange = (event) => {
        setSize(event.target.value);
    };

    const [count, setCount] = useState(1);
    const countInc = () => {
        setCount(count + 1);
    }

    const countDec = () => {
        if (count > 1)
            setCount(count - 1);
    }

    const handleClick = async () => {
        console.log({ ...product, size, quantity: count, color })
        dispatch(addProduct({ ...product, size, quantity: count, color }));  //color also...
        navigate('/cart');
    }

    const isInCart = cart.products.filter((item) => item._id === id).length > 0;

    const Send = () => {
        navigate('/cart');
    }

    const shareUrl = `https://full-stack-ecommerce-scm2.vercel.app/product/${id}`

    return (
        <>
            <div className='singles'>
                {!loading ? <div className='singleContainer'>

                    <div className='singleLeft'>
                        <img src={product.img} className='singleImgs' alt='noImg' data-aos="fade-down" data-aos-duration="2000" />
                        <div className='titlePrice' data-aos="fade-up" data-aos-duration="2000">
                            <div className='titlePrice11'>
                                <p className='singleTitles'>{product.title}</p>
                                <p className='singlePrices'>₹{product.price}</p>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <p className='delivery'>In Stock</p>
                                <p className='delivery share'>
                                    <RWebShare data={{ text: "PublicMArt", url: shareUrl, title: "GfG", }} onClick={() => console.log("shared successfully!")}>
                                        <div>
                                            <span>Share</span>
                                            <FaShare style={{ marginLeft: '4px' }} />
                                        </div>
                                    </RWebShare>
                                </p>
                            </div>
                        </div>
                    </div>


                    <div className='singleRight'>
                        <div className='titlePrice' data-aos="fade-right" data-aos-duration="2000">
                            {currentUser ?
                                <div className='buttons'>
                                    {!isInCart ? <Button variant='contained' style={{ margin: '10px 20px', fontFamily: "'candara',sans-serif", fontWeight: 'bold', padding: '8px 18px', backgroundColor: 'white', color: '#111', border: '1px solid #111' }} onClick={handleClick}><ShoppingCartSharpIcon />Add</Button>
                                        : <Button variant='contained' style={{ margin: '10px 20px', fontFamily: "'candara',sans-serif", fontWeight: 'bold', padding: '8px 18px', backgroundColor: 'white', color: '#111', border: '1px solid #111' }} onClick={Send}><ShoppingCartSharpIcon />View </Button>}
                                    <Link to='/cart' style={{ textDecoration: 'none' }}><Button variant='contained' style={{ margin: '10px 20px', fontFamily: "'candara',sans-serif", fontWeight: 'bold', padding: '8px 18px', backgroundColor: 'rgb(244, 51, 151)', color: 'white', border: '1px solid transparent' }}><KeyboardDoubleArrowRightSharpIcon />Buy</Button></Link>
                                </div> :
                                <div className='noProduct' style={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                                    <p className='noProductText'>Login to Buy</p>
                                    <Link to='/login' style={{ textDecoration: 'none' }}><Button variant='contained' style={{ margin: '10px 20px', fontFamily: "'candara',sans-serif", fontWeight: 'bold', padding: '8px 18px', backgroundColor: 'rgb(244, 51, 151)', color: 'white', border: '1px solid transparent' }}><LoginIcon style={{ marginRight: '5px' }} />Login</Button></Link>
                                </div>
                            }
                        </div>
                        <div className='titlePrice' data-aos="fade-left" data-aos-duration="2000">
                            <p className='selectSize'>Select Size</p>
                            <div className='Sizes'>
                                {product.size && product.size.map((syz) => {
                                    return (<button className={`chooseS ${syz === size ? 'selectedSyz' : 'notS'}`} onClick={(e) => setSize(e.target.value)} value={syz} key={syz}>{syz}</button>)
                                })}
                            </div>
                        </div>

                        <div className='titlePrice' data-aos="fade-right" data-aos-duration="2000">
                            <p className='selectSize'>Select Color</p>
                            <div className='Sizes'>
                                {product.color && product.color.map((clr) => {
                                    return (<button className={`choose ${clr === color ? 'selecteds' : 'notS'}`} onClick={(e) => setColor(e.target.value)} value={clr} key={clr} style={{ backgroundColor: clr }}></button>)
                                })}
                            </div>
                        </div>

                        <div className='titlePrice' data-aos="fade-left" data-aos-duration="2000">
                            <p className='selectSize'>Quantity</p>
                            <div className='quantity1'>
                                <button className='speech-bubble' onClick={countDec}><RemoveIcon style={{ border: '1px solid #999', borderRadius: '50%', marginBottom: '3px' }} /></button>
                                <button className='speech-bubble' style={{ marginBottom: '3px' }}>{count}</button>
                                <button className='speech-bubble' onClick={countInc}><AddIcon style={{ border: '1px solid #999', borderRadius: '50%', marginBottom: '3px' }} /></button>
                            </div>
                        </div>

                        <div className='titlePrice' data-aos="fade-right" data-aos-duration="2000">
                            <div className='titleS'>Product Details</div>
                            <p className='singleTitle' style={{ fontSize: '12px', marginLeft: '5px' }}>{product.desc}</p>
                        </div>

                    </div>

                </div> :
                    <div className='singleContainer1'>
                        <CircularProgress color="success" />
                    </div>}

                {!loading && <div className='singleContainer2'>
                    <Reviews item={product} />
                </div>}
                {!loading && <div className='singleContainer2'>
                    <Recommended item={product} />
                </div>}
            </div>
            <NewsLetter />
            <Footer />
        </>
    )
}

export default Single