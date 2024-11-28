import React, { useState, useEffect } from "react";
import PaymentDetails from "./PhonePriceDetails";

const PriceDetails = () => {
  const [ finalPrice, setFinalPrice] = useState(0)
  const [priceDetails, setPriceDetails] = useState({
    totalPrice: 1000,
    totalItems: 5,
    discount: 100,
    couponSavings: 50,
    deliveryCharges: 40,
  });

  const {
    totalPrice,
    totalItems,
    discount,
    couponSavings,
    deliveryCharges,
  } = priceDetails;

  useEffect(()=>{
    setFinalPrice(()=>totalPrice - discount - couponSavings + deliveryCharges
    )
  },[priceDetails])
  // Calculate final price and savings
  
  const totalSavings = discount + couponSavings;

  return (
    <>
    <div className="min-h-screen  bg-gray-100 sticky top-0 p-6 flex flex-col justify-between w-2/5 max-[800px]:hidden  max-sm:pt-2  max-sm:pl-8 pt-6">
      <div className="max-w-xl z-40 bg-white shadow-md rounded-lg p-6  ">
        {/* Heading */}
        <h1 className="text-xl font-bold text-gray-500 pb-4">PRICE DETAILS</h1>

        {/* Price and Total Items */}
        <div className="flex justify-between text-gray-700 pb-4">
          <p className="text-lg ">
            Price ({totalItems} items)
          </p>
          <p className="text-lg ">₹{totalPrice}</p>
        </div>

        {/* Discount */}
        <div className="flex justify-between text-gray-700 pb-4">
          <p className="text-lg ">Discount</p>
          <p className="text-lg  text-green-600">-₹{discount}</p>
        </div>

        {/* Coupons */}
        <div className="flex justify-between text-gray-700 pb-4">
          <p className="text-lg ">Coupons for You</p>
          <p className="text-lg  text-green-600">-₹{couponSavings}</p>
        </div>

        {/* Delivery Charges */}
        <div className="flex justify-between text-gray-700 pb-4">
          <p className="text-lg ">Delivery Charges</p>
          <p className="text-lg ">₹{deliveryCharges}</p>
        </div>

        {/* Horizontal Rule */}
        <hr className="py-3 border-gray-300" />

        {/* Total Price */}
        <div className="flex justify-between text-gray-900 text-xl font-bold pb-4">
          <p>Total Amount</p>
          <p>₹{finalPrice}</p>
        </div>

        {/* Savings Message */}
        <div className="mt-4 text-green-700 text-center text-sm font-semibold">
          You will save ₹{totalSavings} on this order!
        </div>
      </div>
    </div>
   
    <PaymentDetails showDetails={priceDetails} setShowDetails={setPriceDetails} finalPrice ={finalPrice } totalSavings={totalSavings}/>

    </>
  );
};

export default PriceDetails;
