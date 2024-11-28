import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import Slider from "react-slick";
import { FaStar } from "react-icons/fa";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { carouselNew } from "../../json";



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
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <>
            <div className='w-full flex  bg-white  '>
                <div className='flex p-1 text-4xl max-[450px]:text-2xl tracking-tight font-semibold  pl-8'>
                    <h2>Most Booked Services</h2>
                </div>
            </div>
            <Slider {...settings} className="bg-white gap-2 overflow-hidden w-full h-80 pt-2 pl-8 max-[346px]:pl-16 pb-3 flex justify-center">
                {carouselNew.map((item,index)=>(
                <div key={index} className="p-2 ">
                    <img src={item.image} 
                    className="w-[200px] h-[200px] md:max-h-[200px] lg:max-h-[200px] object-cover  rounded-lg  " alt="Game 1" />
                    <p className="pt-2 font-semibold">{item.title}</p>
                    <p className="text-gray-500 pt-1 flex items-center "><FaStar size={20} className="pr-2 " /><span className="text-black">4.78 (1.8M)</span></p>
                    <p className="flex items-center"><MdOutlineCurrencyRupee />49</p>
                </div>
))}
            </Slider>
        </>
    );
}
