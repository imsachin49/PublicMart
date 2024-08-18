import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './ProductType.css';
import '../../components/products/Products.css'
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Footer from '../../components/footer/Footer.jsx';
import NewsLetter from '../../components/NewsLetter/NewsLetter.jsx';
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();

const ProductType = () => {
    const location = useLocation();
    const cat = location.pathname.split('/')[2];
    const [filters, setFilters] = useState({});
    const [sort, setSort] = useState('newest');
    const [loading, setLoading] = useState(false);
    const [products, setProduts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [length, setLength] = useState(0);
    const [error, setError] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const handleFilters = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        })
    }

    const handleSort = (e) => {
        setSort(
            [e.target.name] = e.target.value
        )
        console.log(sort)
    }

    const navigate = useNavigate();
    const addToProduct = (id) => {
        navigate('/product/' + id);
    }

    useEffect(() => {
        const getProducts = async () => {
            try {
                setLoading(true);
                const res =
                    await axios.get(cat ?
                        `https://full-stack-ecommerce-mu.vercel.app/api/products?category=${cat}` :
                        "https://full-stack-ecommerce-mu.vercel.app/api/products"
                    );
                setProduts(res.data);
                setLoading(false);
            } catch (err) {
                setError(true);
                console.log(err);
            }
        }
        getProducts()
    }, [cat])


    useEffect(() => {
        cat && setFilteredProducts(
            products.filter((item) =>
                Object.entries(filters).every(([key, value]) =>
                    item[key].includes(value)
                )
            )
        )
    }, [filters, products, cat])

    //sorting the products
    useEffect(() => {
        if (sort === 'newest') {
            setFilteredProducts((prev) =>
                [...prev].sort((a, b) => a.createdAt - b.createdAt)
            )
        }
        else if (sort === 'asc') {
            setFilteredProducts((prev) =>
                [...prev].sort((a, b) => a.price - b.price)
            )
        }
        else {
            setFilteredProducts((prev) =>
                [...prev].sort((a, b) => b.price - a.price)
            )
        }
    }, [sort])

    // length of products
    useEffect(() => {
        setLength(filteredProducts.length);
    }, [filteredProducts])


    return (
        <>
            <div style={{ backgroundColor: 'white', paddingBottom: '100px' }}>
                {!loading ? <div className='pKacategories' style={{ backgroundColor: 'white' }}>

                    <div className='typeTop'>
                        <div className='leftTop'>{cat}</div>
                        <div className='rightTop'>

                            <div className='sort'>
                                <select className="form-select" aria-label="Default select example" name='sort' onChange={handleSort}>
                                    <option selected defaultValue className='jii'>Sort</option>
                                    <option value='newest' className='commonClass'>Newest</option>
                                    <option value='asc' className='commonClass'>Price(asce)</option>
                                    <option value='des' className='commonClass'>Price(desc)</option>
                                </select>
                            </div>

                            <div className='filter'>
                                <select className="form-select" aria-label="Default select example" name='color' onChange={handleFilters}>
                                    <option defaultValue>Color</option>
                                    <option className='commonClass'>Red</option>
                                    <option className='commonClass'>Black</option>
                                    <option className='commonClass'>Green</option>
                                    <option className='commonClass'>White</option>
                                    <option className='commonClass'>Blue</option>
                                </select>
                            </div>
                        </div>

                    </div>

                    <div className="pKawrapper">
                        {filteredProducts.map((item) => {
                            return (
                                <div className='productCard' key={item.id} data-aos="zoom-out-up">
                                    <div className='imgContainer'>
                                        <img src={item.img} className='itemImg' alt='noImg' />
                                    </div>
                                    <div className='productTexts'>
                                        <p className='productTitle' style={{ fontWeight: 'bolder' }}>{item.title}</p>
                                        <p className='productPrice'>${item.price}</p>
                                    </div>
                                    <div className='cartBtn'>
                                        <><Button className='cartNow' style={{ border: '1px solid #555', marginLeft: '20px', borderRadius: '25px', color: '#444', fontWeight: 'bold', padding: '3px 8px' }} onClick={() => addToProduct(item._id)} >Explore</Button></>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    {length === 0 && <div className='noProduct'>
                        <p className='noProductText'>No Products Found</p>
                    </div>}

                </div> :
                    <div className='pKacategories1' style={{ backgroundColor: 'white' }}>
                        <CircularProgress color="success" />
                    </div>}
            </div>
            <NewsLetter />
            <Footer />
        </>
    )
}

export default ProductType;
