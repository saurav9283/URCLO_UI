import React from "react";

const PaymentDetails = ({showDetails,setShowDetails,finalPrice,totalSavings}) => {

    console.log(showDetails,"===showDDD")


    return (
        <div className=" bg-gray-100 z-30 flex flex-col justify-between  min-[800px]:hidden  max-sm:pt-2  max-sm:pl-0 pt-6 ">
            {/* Bottom Fixed Bar */}
            <div className="w-full bg-gray-100 flex justify-between items-center py-4 px-4 text-gray-900 text-xl font-bold fixed bottom-0 border-gray-400 border">
              <p>₹{finalPrice}</p>
                <button
                    onClick={() => setShowDetails(true)}
                    className="bg-yellow-500 text-black px-6 py-1 rounded-lg font-normal tracking-tight"
                >
                    Proceed Pay
                </button>
            </div>

            {/* Slide-Up Panel */}
            <div
                className={`fixed bottom-0 left-0 w-full bg-gray-100 border border-gray-300 rounded-tl-lg rounded-tr-lg shadow-lg transition-transform duration-300 ${showDetails ? "translate-y-0" : "translate-y-full"
                    }`}
            >
                <div className="p-6">
                    <h1 className="text-xl font-bold text-gray-500 pb-4">PRICE DETAILS</h1>

                    {/* Price and Total Items */}
                    <div className="flex justify-between  text-gray-700 pb-4">
                        <p className="text-lg ">
                            Price ({showDetails?.totalItems} items)
                        </p>
                        <p className="text-lg ">₹{showDetails?.totalPrice}</p>
                    </div>

                    {/* Discount */}
                    <div className="flex justify-between text-gray-700 pb-4">
                        <p className="text-lg ">Discount</p>
                        <p className="text-lg  text-green-600">-₹{showDetails?.discount}</p>
                    </div>

                    {/* Coupons */}
                    <div className="flex justify-between text-gray-700 pb-4">
                        <p className="text-lg ">Coupons for You</p>
                        <p className="text-lg  text-green-600">-₹{showDetails?.couponSavings}</p>
                    </div>

                    {/* Delivery Charges */}
                    <div className="flex justify-between text-gray-700 pb-4">
                        <p className="text-lg ">Delivery Charges</p>
                        <p className="text-lg ">₹{showDetails?.deliveryCharges}</p>
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

                    {/* Close Button */}
                    <button
                        onClick={() => setShowDetails(false)}
                        className="w-full bg-red-500 text-white px-4 py-2 mt-4 rounded-lg font-bold"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentDetails;
