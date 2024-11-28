import React from 'react';
import { images } from '../../json';
import classes from './Carpenter.module.css';
import { useDispatch } from 'react-redux';
import { openModal } from '../../slice/serviceModalSlice';

const CategoryRatingItems = () => {
  const dispatch = useDispatch();

  const showService = (itemId, itemName) => {
    dispatch(openModal({ id: itemId, name: itemName }));
  };

  return (
    <>
    <div className="w-2/4 max-[450px]:mt-2 min-[768px]:ml-2  p-6 bg-white rounded-lg border border-gray-200 shadow-lg max-[450px]:w-full max-[1024px]:w-2/4 ">
      {/* Title */}
      <div className="pb-6">
        <h1 className="text-3xl font-semibold">Repair</h1>
      </div>

      {/* Service List */}
      <div className="space-y-6">
        {images.map((item, index) => (
          <div
            key={index}
            className="flex p-4 bg-white  rounded-lg  shadow-md transition"
          >
            {/* Left: Details */}
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
              <div className="flex items-center text-sm text-gray-600 space-x-2 mt-1">
                <span className="text-purple-500 font-medium">⭐ {item.rating}</span>
                <span className="text-gray-400">({item.reviews} reviews)</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">{item.description}</p>
              <p className="text-sm text-gray-800 mt-2 font-medium">
                Starts at <span className="text-purple-600">₹{item.price}</span>
              </p>
              <p className="text-sm text-blue-600 mt-2 cursor-pointer hover:underline">
                View details
              </p>
            </div>

            {/* Right: Image and Add Button */}
            <div className="flex flex-col items-center">
              <div className={`w-24 h-24 ${classes.img_div} overflow-hidden mb-2`}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover rounded"
                />
              </div>
              {item.isAdded ? (
                <div className="flex items-center space-x-2">
                  <button className="w-8 h-8 bg-gray-100 text-gray-700 rounded-full">-</button>
                  <span className="text-sm font-medium">{item.quantity}</span>
                  <button className="w-8 h-8 bg-gray-100 text-gray-700 rounded-full">+</button>
                </div>
              ) : (
                <button
                  onClick={() => showService(item.id, item.title)}
                  className="bg-purple-600 text-white text-sm py-1 px-4 rounded hover:bg-purple-700"
                >
                  Add
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    
    </div>
    <hr/>
    </>
  );
};

export default CategoryRatingItems;
