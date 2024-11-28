import React from 'react';
import { images } from '../../json';
import classes from './Carpenter.module.css';
import { useDispatch } from 'react-redux';
import { openModal } from '../../slice/serviceModalSlice';
import CategoryRatingItems from './CategoryRatingItems';

const CategoryItems = () => {
  const dispatch = useDispatch();

  const showService = (itemId, itemName) => {
    dispatch(openModal({ id: itemId, name: itemName }));
  };

  return (
    <>
    <div className=" h-full w-full p-6 flex flex-col md:flex-row bg-white rounded-lg overflow-x-hidden">
    <div className='w-1/4 max-[450px]:w-full max-[1024px]:w-2/4 '>
      {/* Title and Ratings */}
      <div className="mb-6">
        <h1 className="text-3xl font-semibold">Chimney Repair & Service</h1>
        <div className="flex space-x-2 text-sm text-green-600 mt-2">
          <span className="font-medium text-gray-800">4.79</span>
          <span className="text-gray-500">52K reviews</span>
        </div>
        <div className="bg-gray-100 p-2 mt-4 rounded-lg">
          <p className="text-gray-600 text-sm">Upto 180-day warranty on all repairs</p>
        </div>
      </div>

      {/* Service Selection */}
      <div className='shadow-lg rounded-lg border border-gray-400 p-2'>
      <div>
          <h3 className='text-gray-500'>Select a service-------------</h3>
        </div>
      <div className="grid grid-cols-3 gap-2">
       
        {images.map((item, index) => (
          <div
            key={index}
            onClick={() => showService(1, item.title)}
            className="cursor-pointer p-2 rounded-lg bg-gray-50 hover:shadow-md transition"
          >
            <div className={`w-16 h-16 mx-auto ${classes.img_div} overflow-hidden`}>
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover rounded"
              />
            </div>
            <h3 className="text-center text-sm font-medium text-gray-800 mt-2">
              {item.title}
            </h3>
          </div>
        ))}
      </div>
      </div>
    </div>
    <CategoryRatingItems />
    </div>
    </>
  );
};

export default CategoryItems;
