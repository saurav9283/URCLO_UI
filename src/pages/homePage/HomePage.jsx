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
import oys_logo from "../../assets/oys_logo.png";
import { useDispatch, useSelector } from "react-redux";
import ServiceModal from "../carpenter/ServiceModal"
import { logout } from "../../slice/authSlice";
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import axios from "axios";
import { getNotification } from "../../data/Api";

const HomePage = () => {
  const userId = useSelector((state) => state?.authSlice?.user);
  // console.log('userId: ', userId);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mssageModel, setMessageModel] = useState(false);
  const [usermessage, setUserMessage] = useState([]);

  const [add, setAdd] = useState('');
  const [currentAddress, setCurrentAddress] = useState('');

  const currentLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          console.log("object", data);
          setAdd(data.address);
          // setCurrentAddress(data.address?.city || data.display_name?.split(",")[4] || "Unknown location");
          setCurrentAddress(data.address?.city ||data.display_name);
        })
        .catch((error) => console.error("Error fetching location:", error));
    });
  };

  const getUserNotify = async () => {
    const userId = localStorage.getItem("user_id");
    if (userId) {
      const response = await axios.get(`${getNotification}/?user_id=${userId}`);
      console.log('response: ', response);
      setUserMessage(response?.data?.message);
    }
  }

  useEffect(() => {
    currentLocation();
    getUserNotify();
  }, []);

  const isModalOpen = useSelector((state) => state.serviceModal.showModal);

  const toggleMessageModal = (closeModal) => {
    
    setMessageModel(closeModal ? false : !mssageModel);
  };
  useEffect(() => {
    if (mssageModel) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [mssageModel]);

  const handleCart = () => {
    navigate("/cart-page")
  }


  const handleButtonClick = () => {
    setDropdownOpen(!dropdownOpen); // Toggle dropdown visibility
  };

  const handleLoginLogout = () => {
    if (userId) {
      // Handle logout logic here
      // Clear the user data from the store
      // Redirect to the login page 
      dispatch(logout());
      setIsLoggedIn(false);
    } else {
      // Navigate to the login page when not logged in
      navigate('/login');  // Navigate to the login route
    }
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


  // No scroll when model is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // Cleanup function for unmounting
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isModalOpen]);



  return (
    <>
      <div onClick={()=>toggleMessageModal(true)} className={`relative overflow-x-hidden ${isModalOpen ? "blur-sm no-pointer no-movement " : ""}`}>

        <nav className="bg-white text-gray-800 shadow-md ">
          <div className="container  flex flex-col sm:flex-row items-center max-[639px]:items-start justify-between py-2 px-6">
            {/* Logo Section */}
            <div className="flex items-center flex-none  sm:mb-0 max-[639px]:hidden">
              <img
                src={oys_logo}
                alt="Logo"
                className="w-14 h-14  max-[450px]:w-8 max-[450px]:h-8"
              />
              <span className="text-lg max-[450px]:text-base font-bold">On Your Service</span>
            </div>

            <div className="w-full flex justify-between items-center flex-row sm:hidden">
              <div className="flex items-center flex-none pb-4 sm:mb-0">
                <img
                  src={oys_logo}
                  alt="Logo"
                  className="w-16 h-16 max-[450px]:w-16 max-[450px]:h-16 max-[450px]:ml-[-13px]"
                />
                <span className="text-lg max-[450px]:text-base font-bold">On Your Service</span>
              </div>
              <div className="flex items-center flex-none space-x-6 pb-4 ">
                <button className="flex items-center">
                  <Stack onClick={(e)=>{
                    e.stopPropagation()
                    toggleMessageModal()}} spacing={4} direction="row" sx={{ color: 'action.active' }}>
                    <Badge color="secondary" badgeContent={usermessage.length} showZero>
                      <MailIcon />
                    </Badge>
                  </Stack>
                </button>
                <button className="flex items-center" onClick={handleCart}>
                  <LuShoppingCart className="w-6 h-6" />
                </button>
                <div className="relative">
                  <button onClick={handleButtonClick} className="flex items-center">
                    <LuUserCircle2 className="w-6 h-6" />
                  </button>

                  {/* Dropdown */}
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-1 w-28 bg-white border border-gray-300 rounded-lg shadow-md">
                      <button
                        className="block w-full px-2 py-1 text-xs text-gray-700 hover:bg-gray-100 border-t border-gray-300"
                        onClick={handleLoginLogout}
                      >
                        {userId ? 'Login' : 'Logout'}
                      </button>
                    </div>
                  )}
                </div>
              </div>

            </div>

            <div className="flex flex-grow items-center justify-end max-[530px]:ml-[-17px] pr-12 gap-2">
              <div className="flex items-center w-full sm:w-1/4 relative ">
                <LuMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search for map location"
                  className="w-full text-sm pl-10 pr-10 py-2 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 max-[530px]:w-44"
                  value={currentAddress}
                  onChange={(e) => setCurrentAddress(e.target.value)}
                />
                <LuChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>

              <div className="flex items-center w-full sm:w-1/4 relative ">
                <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 " />
                <input
                  type="text"
                  placeholder={placeholders[placeholderIndex]}
                  className="w-full text-sm pl-10 pr-4 mr-2 xl:mr-2 py-2 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 max-[530px]:w-40"
                />
              </div>
            </div>

            <div className="flex items-center flex-none space-x-6 mt-4 sm:mt-0 max-[639px]:hidden">
              <button className="flex items-center">
              <Stack onClick={(e)=>{
                console.log("kjuyt")
                    e.stopPropagation()
                    toggleMessageModal()}} spacing={4} direction="row" sx={{ color: 'action.active' }}>
                    <Badge color="secondary" badgeContent={usermessage.length} showZero>
                      <MailIcon />
                    </Badge>
                  </Stack>
              </button>
              <button className="flex items-center" onClick={handleCart}>
                <LuShoppingCart className="w-6 h-6" />
              </button>
              <div className="relative">
                <button onClick={handleButtonClick} className="flex items-center">
                  <LuUserCircle2 className="w-6 h-6" />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-1 w-32  bg-white border border-gray-300 rounded-lg shadow-md">
                    <button
                      className="block w-full px-2 py-1 text-xs text-gray-700 hover:bg-gray-100 border-t border-gray-300"
                      onClick={handleLoginLogout}
                    >
                      {userId ? 'Logout' : 'Login'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>


        {mssageModel && (
          <div className="fixed z-50 top-0 right-0 mt-16 mr-4">
            <div className="w-96 p-4 bg-white rounded-lg shadow-lg">
              <h2 className="text-lg font-bold mb-4">Messages</h2>
              <ul className="max-h-64 overflow-y-auto">
                {usermessage.length > 0 ? (
                  usermessage?.map((msg, index) => (
                    <li key={index} className="py-2 border-b text-gray-700">
                      {msg.content}
                    </li>
                  ))
                ) : (
                  <li className="text-gray-500">No new messages</li>
                )}
              </ul>
            </div>
          </div>
        )}

        {/* Horizontal Line */}
        <hr className="border-t border-gray-300" />
        <HeroSection />
        {/* CAROUSELS */}
        <AllCarousel />
        <ServiceModal />
      </div>
    </>
  );
};

export default HomePage;