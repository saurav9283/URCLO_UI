import React from 'react';
import  {images}  from '../../json'; 
import classes from "./Carpenter.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../slice/serviceModalSlice';

const Carpenter = () => {
  

  const dispatch = useDispatch()

  const showService = (itemId,itemName)=>{
    dispatch(openModal({id:itemId,name:itemName}))
  }
  return (
    <>
      {images.map((item, index) => (
        <div
          key={index} onClick={()=>showService(1,item.title)}
          className="bg-white p-4 rounded-lg hover:underline "
        >
          <div className={`w-[80px] h-[80px] md:max-h-[200px] lg:max-h-[200px] rounded-lg overflow-hidden ${classes.img_div}`}>
          <img
            className="w-full h-full object-cover shadow-md "
            src={item.image}
            alt={item.title}
          />
          </div>
          <h3 className="text-sm max-[450px]:text-sm font-light text-gray-800 pt-2 ">
            {item.title}
          </h3>
        </div>
      ))}
    </>
  );
};

export default Carpenter;
