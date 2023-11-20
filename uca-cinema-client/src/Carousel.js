import React from 'react';
import Slider from 'react-slick';

import banner1 from './assets/banner.jpg';
import banner2 from './assets/banner3.jpg';
import banner3 from './assets/banner2.jpg';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './Carousel.css';

const banners = [banner1, banner2, banner3];

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <div className="slick-next" style={{ right: '10px', zIndex: 1 }}>Next</div>,
  prevArrow: <div className="slick-prev" style={{ left: '10px', zIndex: 1 }}>Prev</div>,
};

const Carousel = () => {
  return (
    <Slider {...settings}>
      {banners.map((banner, index) => (
        <div key={index}>
          <img src={banner} alt={`Banner ${index + 1}`} style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
        </div>
      ))}
    </Slider>
  );
};

export default Carousel;

