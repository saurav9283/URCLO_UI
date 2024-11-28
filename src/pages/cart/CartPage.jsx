import React, { useState } from "react";
import PriceDetails from "./PriceDetails";
import  {images}  from '../../json'; 
import { FiPlus } from "react-icons/fi";
import { FiMinus } from "react-icons/fi";


const CartPage = () => {
  // Sample cart items
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Item 1",
      price: 10,
      quantity: 2,
      seller: "Seller A",
      image: "https://via.placeholder.com/100",
    },
    {
      id: 2,
      name: "Item 2",
      price: 20,
      quantity: 1,
      seller: "Seller B",
      image: "https://via.placeholder.com/100",
    },
    {
      id: 3,
      name: "Item 3",
      price: 15,
      quantity: 3,
      seller: "Seller C",
      image: "https://via.placeholder.com/100",
    },
  ]);

  // Update quantity
  const updateQuantity = (id, value) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + value) }
          : item
      )
    );
  };

  // Remove item
  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Calculate total price
  const calculateTotal = () =>
    cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="flex flex-col md:flex-row justify-start items-start h-auto bg-gray-100 pl-8 max-[530px]:pl-0">
      <div className="max-w-3xl w-3/5 shadow-md rounded-lg p-6 md:w-3/4 h-full 
      max-[800px]:w-full  bg-white overflow-y-auto mt-6">
        <h1 className="text-2xl font-bold text-gray-700 pb-4">Your Cart</h1>
        {images.length > 0 ? (
          <div className="space-y-6">
            {images.map((item) => (
              <div
                key={item.id}
                className="flex items-start border rounded-md p-4 space-x-4"
              >
                {/* Left: Image and quantity controls */}
                <div className="w-28 flex flex-col items-start">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-auto object-cover rounded-md"
                  />
                  <div className="mt-2 flex items-start space-x-2 pt-2">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-[26px] h-[26px] bg-gray-200 rounded-[13px] border-gray-400 border flex justify-center items-center">
                    
                      <FiMinus />
                    </button>
                    <input
                      type="text"
                      value={item.quantity}
                      readOnly
                      className="w-10 text-center border-gray-200 border "
                    />
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-[26px] h-[26px] bg-gray-200 rounded-[13px] border-gray-400 border flex justify-center items-center"
                    >
                      <FiPlus />
                    </button>
                  </div>
                </div>

                {/* Right: Item details */}
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="text-gray-500">Seller: {item.seller}</p>
                  <p className="text-lg font-bold text-gray-700">
                    ${item.price * item.quantity}
                  </p>
                  <div className="mt-2 flex space-x-4">
                    <button className="text-sm text-blue-500 hover:underline">
                      Save for Later
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-sm text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center">Your cart is empty.</p>
        )}
        <div className="mt-6 border-t pt-4">
          <h3 className="text-lg font-semibold text-gray-700">
            Total: ${calculateTotal()}
          </h3>
        </div>
      </div>
      <PriceDetails />
    </div>
  );
};

export default CartPage;
