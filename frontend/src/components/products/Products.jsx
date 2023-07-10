import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './Products.css';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import { publicRequest } from '../../requestMethods';
import Box from '@mui/material/Box';
import { BsFillHeartFill } from 'react-icons/bs'
import Product from './Product';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Aos from 'aos';

const Products = () => {
    const [products, setProduts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    console.log(page);
    const [total, setTotal] = useState(0);

    const getAllProducts = async () => {
        try {
            setLoading(true);
            const res = await publicRequest.get(`https://full-stack-ecommerce-mu.vercel.app/api/products`);
            setAllProducts(res.data);
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getAllProducts();
    }, [])

    const totalLength = allProducts.length;
    console.log(totalLength)
    const totalPage = Math.ceil(total / 11);

    const getProducts = async () => {
        try {
            setLoading(true);
            const res = await publicRequest.get(`/products?page=${page}&limit=11`);
            setProduts(res.data.paginatedProducts);
            setTotal(res.data.total);
            console.log(res.data)
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getProducts();
    }, [page])

    // handleLike={handleLike} isLiked={isLiked}
    return (
        <div style={{ backgroundColor: 'white', scrollBehavior: 'smooth' }} id="new" >
            <h2>Our Latest Top Collections</h2>
            <div className='pKacategories' style={{ backgroundColor: 'white' }}>
                {!loading ? <div className='pKawrapper'>
                    {products.map((item, index) => {
                        return (
                            <Product item={item} index={index} />
                        )
                    })}
                </div> :
                    <div className='pKawrapper'>
                        {[1, 2, 3, 4,5, 6,7,8].map((item, index) => {
                            return (
                                <div style={{margin:'10px'}}>
                                    <Skeleton height={200} width={250}  />
                                </div>
                            )
                        })}
                    </div>
                }
            </div>
            {!loading && <div className='pagination'>
                <Stack spacing={2}>
                    <Pagination defaultPage={page} count={totalPage} variant="outlined" shape="circular" color='info' onChange={(e, value) => setPage(value)} />
                </Stack>
            </div>}
        </div>
    )
}

export default Products
