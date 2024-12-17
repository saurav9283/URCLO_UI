import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import Slider from "react-slick";
import {carouselNew } from "../../json"

export default function AboutCarousel1() {
  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className='w-full flex  bg-white  '>
        <div className='flex p-1 text-4xl max-[450px]:text-2xl tracking-tight font-semibold  ml-8'>
          <h2>New and noteworthy</h2>
        </div>
      </div>
     
      <Slider {...settings} className="bg-white gap-2  overflow-hidden h-80 mt-2 mr-8 ml-8 mb-3 ">
      {carouselNew.map((item, index) => (
        <div key={index} className="p-2">
          <img src={item.image} className="w-[200px] h-[200px] md:max-h-[200px] lg:max-h-[200px] object-fill  rounded-lg" alt="Game 1"/>
          <p className="mt-2 font-semibold">{item.title}</p>
        </div>
        
        
      ))}
      </Slider>
    </>
  );
}
