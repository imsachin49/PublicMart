import React, { useState, useEffect, useRef } from 'react';
import Review from './Review'
import {MdRateReview} from 'react-icons/md'
import {BsFillArrowLeftCircleFill} from 'react-icons/bs';
import {BsFillArrowRightCircleFill} from 'react-icons/bs';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import SwiperCore, { Navigation } from 'swiper';
import './Reviews.css'
import {review} from './dummyReview'
// import {BiSolidChevronRightCircle} from 'react-icons/bi'
import {FaChevronCircleRight} from 'react-icons/fa'
import {FaChevronCircleLeft} from 'react-icons/fa'
import ReviewModal from '../modals/review/ReviewModal';

SwiperCore.use([Navigation]);

const Reviews = ({item}) => {
    const [slidesPerView, setSlidesPerView] = useState(4);
    const swiperRef = useRef(null);
  
    const handleResize = () => {
      const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
      if(screenWidth >= 1024) {
        setSlidesPerView(3);
      }else if (screenWidth >= 630) {
        setSlidesPerView(2);
      }else if(screenWidth >= 370) {
        setSlidesPerView(2);
      }else {
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
    const [openAddReviewModal,setOpenReviewModal]=useState(false);
  
  
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

    return (
        <div className='reviews'>
            
            <div className='revHeader'>
                <h1 className='revText'>Reviews({review.length})</h1>
                <div className='newRev'>
                    <MdRateReview className='newIcon' />
                    <p className='newText' onClick={()=>setOpenReviewModal(true)}>Add</p>
                </div>
            </div>
            <div className='AllRevOuter'>
                {!hidePrevButton && (<button onClick={handlePrev} className='PrevBtn'>
                    <FaChevronCircleLeft size={15} color="rgb(244, 51, 151)" />
                </button>)}
                <Swiper className='Allreviews' spaceBetween={2} slidesPerView={slidesPerView} navigation={{prevEl: '.prevButton',nextEl: '.nextButton'}} ref={swiperRef}>
                    {review.map((m,index)=>{
                        return(
                            <SwiperSlide key={index}>
                                <Review item={m} />
                            </SwiperSlide>
                        )})}
                </Swiper>
                {!hideNextButton && (<button onClick={handleNext} className='NextBtn'>
                    <FaChevronCircleRight size={15} color="rgb(244, 51, 151)" />
                </button>)}
            </div>
            {openAddReviewModal && <ReviewModal item={item} open={openAddReviewModal} onClose={()=>setOpenReviewModal(false)} />}
        </div>
    )
}

export default Reviews
