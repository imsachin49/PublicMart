import React from 'react'
import './Carousel.css'
import Button from '@mui/material/Button'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const Carousel = () => {
  return (
    <div style={{ backgroundColor: 'aliceblue'}}>
    {/* <div id="carouselExampleIndicators" className="carousel slide">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
            </div>

            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src="https://cdn.pixabay.com/photo/2017/03/13/17/26/ecommerce-2140603__340.jpg" className="d-block w-100" alt="product1"/>
                    <div className="carousel-caption d-md-block" style={{color:"darkslategray",fontFamily:"'candara', sans-serif",fontWeight:'bolder'}}>
                        <p>Some representative placeholder content for the first slide.</p>
                        <Button variant='contained' style={{backgroundColor:'black',fontWeight:'bold'}}>Buy Now</Button>
                    </div>
                </div>
            </div>

            <div className="carousel-inner">
                <div className="carousel-item">
                    <img src="https://static.ubertheme.com/blog/2020/9/carousel_examples_and_takeaways/made_carousel.png" className="d-block w-100" alt="product2"/>
                    <div className="carousel-caption d-md-block" style={{color:"darkslategray",fontFamily:"'candara', sans-serif",fontWeight:'bolder'}}>
                        <p>Some representative placeholder content for the first slide.</p>
                        <Button variant='contained' style={{backgroundColor:'black',fontWeight:'bold'}}>Buy Now</Button>
                    </div>
                </div>
            </div>

            <div className="carousel-inner">
                <div className="carousel-item">
                <img src="https://mobirise.com/extensions/commercem4/assets/images/gallery01.jpg" className="d-block w-100" alt="product3" />
                <div className="carousel-caption d-md-block" style={{color:"darkslategray",fontFamily:"'candara', sans-serif",fontWeight:'bolder'}}>
                        <p>Some representative placeholder content for the first slide.</p>
                        <Button variant='contained' style={{backgroundColor:'black',fontWeight:'bold'}}>Buy Now</Button>
                    </div>
                </div>
            </div>

            <div className="carousel-inner">
                <div className="carousel-item">
                    <img src="https://img.freepik.com/premium-photo/sale-symbol-podium-present-you-sale-shopping-concept-sale-event-shopping-sale-event-3d-illustration-background_7672-788.jpg?size=626&ext=jpg" className="d-block w-100" alt="product1"/>
                    <div className="carousel-caption d-md-block" style={{color:"darkslategray",fontFamily:"'candara', sans-serif",fontWeight:'bolder'}}>
                        <p>Some representative placeholder content for the first slide.</p>
                        <Button variant='contained' style={{backgroundColor:'black',fontWeight:'bold'}}>Buy Now</Button>
                    </div>
                </div>
            </div>
            
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <img src='https://cdn-icons-png.flaticon.com/128/318/318477.png' className='prevS'/>
            </button>
            
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <img src='https://cdn-icons-png.flaticon.com/128/181/181669.png' className='nextS'/>
            </button>
            </div> */}
            <div id="carouselExampleCaptions" class="carousel slide">
        <div class="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div class="carousel-inner">
            <div class="carousel-item active">
            <img src="https://cdn.pixabay.com/photo/2017/03/13/17/26/ecommerce-2140603__340.jpg" class="d-block w-100" alt="..."/>
            <div class="carousel-caption d-md-block">
                {/* <h5>First slide label</h5> */}
                <p>Some representative placeholder content for the first slide.</p>
                <Button variant='contained' style={{backgroundColor:'black',fontWeight:'bold',fontFamily:"'candara',sans-serif"}} className='butn'>Buy Now</Button>
            </div>
            </div>
            <div class="carousel-item">
            <img src="https://mobirise.com/extensions/commercem4/assets/images/gallery01.jpg" class="d-block w-100" alt="..."/>
            <div class="carousel-caption d-md-block">
                {/* <h5>Second slide label</h5> */}
                <p>Some representative placeholder content for the second slide.</p>
                <Button variant='contained' style={{backgroundColor:'black',fontWeight:'bold',fontFamily:"'candara',sans-serif"}} className='butn'>Buy Now</Button>
            </div>
            </div>
            <div class="carousel-item">
            <img src="https://img.freepik.com/premium-photo/sale-symbol-podium-present-you-sale-shopping-concept-sale-event-shopping-sale-event-3d-illustration-background_7672-788.jpg?size=626&ext=jpg" class="d-block w-100" alt="..."/>
            <div class="carousel-caption d-md-block">
                {/* <h5>Third slide label</h5> */}
                <p>Some representative placeholder content for the third slide.</p>
                <Button variant='contained' style={{backgroundColor:'black',fontWeight:'bold',fontFamily:"'candara',sans-serif"}} className='butn'>Buy Now</Button>
            </div>
            </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
        </div>
        </div>
  )
}

export default Carousel
