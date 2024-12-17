import React from 'react';
import { images } from '../../json';
import classes from "./Carpenter.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../slice/serviceModalSlice';

const Carpenter = () => {
  const masterCat = useSelector((state) => state.categorySlice.categories)
  const dispatch = useDispatch()
  const showService = (itemId, itemName,masterid) => {
    console.log('itemName: ', itemName);
    console.log('itemId: ', itemId);
    dispatch(openModal({ id: itemId, name: itemName,masterid:masterid }));
  }

  return (
    <>
      {masterCat?.map((item, index) => (
        <div
          key={index} onClick={() => showService(item.id, item.masterName,item.masterId)}
          className="bg-white p-4 rounded-lg hover:underline "
        >
          <div className={`w-[90px] h-[95px] md:max-h-[200px] lg:max-h-[200px] rounded-lg overflow-hidden ${classes.img_div}`}>
            <img
              className="w-full h-full object-cover shadow-md "
              src={item.image_url}
              alt={item.image_url}
            />
          </div>
          <h3 className="cursor-pointer text-sm max-[450px]:text-sm font-normal text-gray-800 pt-2 ">
            {item.masterName}
          </h3>
        </div>
      ))}
    </>
  );
};

export default Carpenter;
