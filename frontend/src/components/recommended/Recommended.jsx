import React, { useState, useEffect, useRef } from 'react';
import Review from '../reviews/Review'
import { MdRateReview } from 'react-icons/md'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import SwiperCore, { Navigation } from 'swiper';
import '../recommended/Recommended.css'
import { review } from '../reviews/dummyReview'
import ReviewModal from '../modals/review/ReviewModal';
import { BsArrowRightCircleFill } from 'react-icons/bs'
import { BsArrowLeftCircleFill } from 'react-icons/bs'
import SingleRecommend from './SingleRecommend';
import axios from 'axios';
import CategoryList from '../categories/CategoryList';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

SwiperCore.use([Navigation]);

const Recommended = ({ item }) => {
  const navigate = useNavigate();
  const [slidesPerView, setSlidesPerView] = useState(4);
  const swiperRef = useRef(null);
  const [recommends, setRecommends] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  let cat = item?.categories;

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const categoryUrls = cat?.map(category => `https://full-stack-ecommerce-mu.vercel.app/api/products?category=${category}`);
        const requests = categoryUrls?.map(async (url) => await axios.get(url));
        const responses = await Promise.all(requests);
        const products = responses?.map(response => response?.data);
        setRecommends(products);
        setLoading(false);
      } catch (err) {
        setError(true);
        console.log(err);
      }
    };

    if (cat && cat.length > 0) {
      getProducts();
    }
  }, [cat]);


  // console.log(recommends);


  const handleResize = () => {
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
    if (screenWidth >= 1024) {
      setSlidesPerView(4);
    } else if (screenWidth >= 730) {
      setSlidesPerView(3);
    } else if (screenWidth >= 470) {
      setSlidesPerView(2);
    } else {
      setSlidesPerView(1);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [hideNextButton, setHideNextButton] = useState();
  const [hidePrevButton, setHidePrevButton] = useState(true);
  const [openAddReviewModal, setOpenReviewModal] = useState(false);


  const handleNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const handlePrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      const swiper = swiperRef.current.swiper;
      swiper.on('slideChange', () => {
        if (swiper.isBeginning) {
          setHidePrevButton(true);
        } else {
          setHidePrevButton(false);
        }
      });
      swiper.on('slideChange', () => {
        if (swiper.isEnd) {
          setHideNextButton(true);
        } else {
          setHideNextButton(false);
        }
      });
    }
  }, [swiperRef.current]);

  const seeAll = () => {
    console.log('see all');
    let i = 0;
    while (i < cat?.length) {
      if (cat[i] !== 'undefined') {
        const matchedItem = CategoryList?.find((item) => item?.cat === cat[i]);
        if (matchedItem) {
          console.log(matchedItem.cat);
          navigate(`/products/${matchedItem?.cat}`);
          break;
        }
      }
      i++;
    }
  }

  return (
    <div className='recommended'>
      <div className='recHeader'>
        <h1 className='recText'>Similar Products</h1>
        <p className='newTextRec' onClick={seeAll}>See All</p>
      </div>
      <div className='AllRecOuter'>
        {!hidePrevButton && (<button onClick={handlePrev} className='PrevBtn'>
          <BsArrowLeftCircleFill size={18} color="#111" />
        </button>)}
        {!loading ? <Swiper className='Allrecs' spaceBetween={2} slidesPerView={slidesPerView} navigation={{ prevEl: '.prevButton', nextEl: '.nextButton' }} ref={swiperRef}>
          {recommends?.map((item) => {
            return (
              item?.map((m, index) => {
                return (
                  <SwiperSlide key={index}>
                    <SingleRecommend item={m} />
                  </SwiperSlide>
                )
              })
            )
          })}
        </Swiper> :
          <Swiper className='Allrecs' spaceBetween={2} slidesPerView={slidesPerView} navigation={{ prevEl: '.prevButton', nextEl: '.nextButton' }} ref={swiperRef}>
            {[1, 2, 3, 4]?.map((m, index) => {
              return (
                <SwiperSlide key={index} style={{margin:'10px'}}>
                  <Skeleton height={200} />
                </SwiperSlide>
              )
            })}
          </Swiper>}
        {!hideNextButton && (<button onClick={handleNext} className='NextBtn'>
          <BsArrowRightCircleFill size={18} color="#111" />
        </button>)}
      </div>
      {openAddReviewModal && <ReviewModal item={item} open={openAddReviewModal} onClose={() => setOpenReviewModal(false)} />}
    </div>
  )
}

export default Recommended
