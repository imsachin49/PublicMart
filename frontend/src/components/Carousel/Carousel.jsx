import React, { useState, useEffect } from 'react'
import './Carousel.css'
import Button from '@mui/material/Button'
import { CaarouselPhotos } from './dummyPhotos'

const Carousel = () => {
    const [activeIndex, setActiveIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % CaarouselPhotos.length)
        }, 3000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div style={{ backgroundColor: 'aliceblue',overflowX:'hidden' }}>
            <div id="carouselExampleCaptions" className="carousel slide carouselExampleCaptions">
                <div className="carousel-inner">
                    {CaarouselPhotos.map((c, index) => (
                        <div
                            className={`carousel-item ${index === activeIndex ? 'active' : ''}`}
                            key={c.id}
                        >
                            <img data-aos="zoom-out-down" src={c.pic} className="d-block w-100" alt="..." />
                            <div className="carousel-caption d-md-block" id={`${index === 2 ? 'hii' : 'sgh'}`}>
                                <p data-aos="fade-right">Some representative placeholder content for the first slide.</p>
                                <Button data-aos="fade-left" variant="contained" style={{ backgroundColor: 'black', fontWeight: 'bold', fontFamily: "'candara',sans-serif" }} className="butn">
                                    Buy Now
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>

                {/*<button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>

                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>*/}
            </div>
        </div>
    )
}

export default Carousel;
