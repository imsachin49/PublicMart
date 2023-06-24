import React, { useState, useEffect } from 'react'
import './Carousel.css'
import Button from '@mui/material/Button'
import { CaarouselPhotos } from './dummyPhotos'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { BiArrowBack } from 'react-icons/bi'

const Slider = () => {
    const [activeIndex, setActiveIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % CaarouselPhotos.length)
        }, 3000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className='newContainer'>
            <Carousel
                autoPlay={true}
                infiniteLoop={true}
                showThumbs={false}
                showIndicators={false}
                showStatus={false}
                renderArrowPrev={(clickHandler, hasPrev) => (
                    <div
                        onClick={clickHandler}
                        className="prevCarousel"
                    >
                        <BiArrowBack className="PrevCIcon" />
                    </div>
                )}
                renderArrowNext={(clickHandler, hasNext) => (
                    <div
                        onClick={clickHandler}
                        className="nextCarousel"
                    >
                        <BiArrowBack className="NextCIcon" />
                    </div>
                )}
            >
                {CaarouselPhotos.map((c, index) => (
                    <div>
                        <img src={c.pic} className="slideImg" alt="..." />
                        <div className="shop-now">
                            Shop Now
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    )
}

export default Slider;
