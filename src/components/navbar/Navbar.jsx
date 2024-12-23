import React, { useState, useEffect } from "react";
import {
  LuShoppingCart,
  LuUserCircle2,
  LuChevronDown,
  LuSearch,
  LuMapPin,
} from "react-icons/lu";
import { PiClipboardTextLight } from "react-icons/pi";
import HeroSection from "../../pages/heroSection/HeroSection";
import AllCarousel from "../../pages/heroSection/AllCarousel";
import { useNavigate } from "react-router-dom";
import oys_logo from "../../assets/oys_logo.png"

const Navbar = () => {
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate()

  const handleCart = () => {
    navigate("/cart-page")
  }

  const handleButtonClick = () => {
    setDropdownOpen((prev) => !prev); // Toggle dropdown visibility
  };

  const handleLoginLogout = () => {
    setIsLoggedIn(!isLoggedIn); // Toggle login/logout status
    setDropdownOpen(false); // Close dropdown after action
  };

  // Placeholder options
  const placeholders = [
    "Search for 'Carpenter'",
    "Search for 'Gardener'",
    "Search for 'Plumber'",
    "Search for 'Electrician'",
  ];

  // Update placeholder index in a loop
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
    }, 2000); // Change every 2 seconds
    return () => clearInterval(interval); // Cleanup on component unmount
  }, [placeholders.length]);

  return (
    <>
      <nav className="bg-white text-gray-800 shadow-md">
        <div className="container  flex flex-col sm:flex-row items-center max-[639px]:items-start justify-between py-2 px-6">
          {/* Logo Section */}
          <div className="flex items-center flex-none  sm:mb-0 max-[639px]:hidden">
            <img
              src={oys_logo} // Replace with your logo URL
              alt="Logo"
              className="w-14 h-14  max-[450px]:w-8 max-[450px]:h-8"
            />
            <span className="text-lg max-[450px]:text-base font-bold">On Your Service</span>
          </div>

          {/* Mobile Navbar logo + icons */}
          <div className="w-full flex justify-between items-center flex-row sm:hidden">
            <div className="flex items-center flex-none pb-4 sm:mb-0">
              <img
                src={oys_logo}  // Replace with your logo URL
                alt="Logo"
                className="w-16 h-16 max-[450px]:w-16 max-[450px]:h-16 max-[450px]:ml-[-13px]"
              />
              <span className="text-lg max-[450px]:text-base font-bold">On Your Service</span>
            </div>
            <div className="flex items-center flex-none space-x-6 pb-4 ">
              <button className="flex items-center">
                <PiClipboardTextLight className="w-6 h-6" />
              </button>
              <button className="flex items-center" onClick={handleCart}>
                <LuShoppingCart className="w-6 h-6" />
              </button>
              <button className="flex items-center">
                <LuUserCircle2 className="w-6 h-6" />
              </button>
            </div>

          </div>

          {/* Search Section */}
          <div className="flex flex-grow items-center justify-end max-[530px]:ml-[-17px] pr-12 gap-2">
            <div className="flex items-center w-full sm:w-1/4 relative ">
              <LuMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search for map location"
                className="w-full text-sm pl-10 pr-10 py-2 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 max-[530px]:w-44 "
              />
              {/* Down Arrow Icon */}
              <LuChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
            </div>

            {/* Additional Search Bar with Search Icon */}
            <div className="flex items-center w-full sm:w-1/4 relative ">
              <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 " />
              <input
                type="text"
                placeholder={placeholders[placeholderIndex]}
                className="w-full text-sm pl-10 pr-4 mr-2 xl:mr-2 py-2 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 max-[530px]:w-40"
              />
            </div>
          </div>

          {/* Icons Section */}
          <div className="flex items-center flex-none space-x-6 mt-4 sm:mt-0 max-[639px]:hidden">
            <button className="flex items-center">
              <PiClipboardTextLight className="w-6 h-6" />
            </button>
            <button className="flex items-center" onClick={handleCart}>
              <LuShoppingCart className="w-6 h-6" />
            </button>
            <button onClick={handleButtonClick} className="flex items-center">
              <LuUserCircle2 className="w-6 h-6" />
            </button>
            {/* Dropdown */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-md">
                <button
                  className="block w-full px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                  onClick={handleLoginLogout}
                >
                  {isLoggedIn ? 'Logout' : 'Login'}
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Horizontal Line */}
      <hr className="border-t border-gray-300" />
      <HeroSection />
      {/* CAROUSELS */}
      <AllCarousel />
    </>
  );
};

export default Navbar;