import React from 'react';
import MainCarpenter from '../carpenter/MainCarpenter';

import HeroSectionRight from './HeroSectionRight';
import { CiStar } from "react-icons/ci";
import { PiUsersThreeLight } from "react-icons/pi";




const HeroSection = () => {
  return (
    <div className="flex flex-col md:flex-row justify-start items-start h-auto bg-white ">
      {/* Left Side Content */}
      <div className="w-full md:w-2/4 h-full   bg-white  p-8 overflow-y-auto">
        {/* Hero Section */}
        <section className="relative text-center mb-8">
          <h1 className="text-4xl font-semibold mb-4 max-[450px]:text-2xl">
            Home Service at Your Doorstep
          </h1>
        </section>

        {/* Services Section */}
        <section className="mb-6 mt-10">
          <div className="border-2 border-gray-300 p-6 rounded-lg">
            <p className="text-gray-600 text-2xl max-[450px]:text-xl text-left font-semibold mb-4">
              What are you looking for?
            </p>
            {/* Grid Layout for Service Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 cursor-pointer ">
              {/* Service Card */}
              <MainCarpenter />
             
            </div>
            {/* Service Rating & Customers */}
          </div>
          <div className='flex mt-12 ml-8'>
            <CiStar size={40} className='' />
            <div>
              <p className='pl-8 max-[450px]:pl-4 text-xl font-bold flex flex-col'>4.8</p>
              <p className='pl-8 max-[450px]:pl-4 text-sm'>Service rating</p>
            </div>
            <PiUsersThreeLight size={40}  />
            <div>
              <p className='pl-8 max-[450px]:pl-4 text-xl font-bold flex flex-col max-[450px]:text-lg'>12M+</p>
              <p className='pl-8 max-[450px]:pl-4 max-[450px]:text-sm text-sm'>Customers Globally</p>
            </div>
          </div>
        </section>
      </div>

      {/* Right Side Content */}
      <HeroSectionRight />
      {/* <AboutCarousel1 /> */}
    </div>
  );
};

export default HeroSection;