import React, { useState } from "react";
// import { useAuth0 } from "@auth0/auth0-react";
import { FaGoogle, FaFacebook, FaApple, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Oauth from "../oAuth/Oauth"; // Assuming this is your OTP component


const Register = () => {
    // const {user, loginWithRedirect } = useAuth0();// auth0 login
    // console.log(user)
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isPhone, setIsPhone] = useState(false);
  const [provider, setProvider] = useState("email");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    let determinedProvider = provider;

    // Determine the provider dynamically
    if (isPhone) {
      determinedProvider = "phone";
    } else if (!["google", "facebook", "apple"].includes(provider)) {
      determinedProvider = "email";
    }

    const userData = {
      name,
      email: isPhone || determinedProvider !== "email" ? undefined : inputValue,
      phone: isPhone ? inputValue : undefined,
      password: isPhone || determinedProvider !== "email" ? undefined : password,
      provider: determinedProvider,
    };

    // Filter out undefined fields
    const filteredUserData = Object.fromEntries(
      Object.entries(userData).filter(([_, value]) => value !== undefined)
    );

    console.log("User Data:", filteredUserData);

    // Here you would send `filteredUserData` to your server via an API call
  };

//  login through Auth0
  const socialLogin = () =>{
    handleProviderClick();
    // loginWithRedirect()
  }

  // Handle social media button clicks
  const handleProviderClick = (newProvider) => {
    setProvider(newProvider);
    // handleSignup(); // Call signup when social button is clicked
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    // Check if input is a phone number
    const phoneRegex = /^\d{10}$/; // Adjust regex as needed for your phone number format
    setIsPhone(phoneRegex.test(value));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    // Simple password strength logic
    if (value.length >= 8 && /[A-Z]/.test(value) && /\d/.test(value)) {
      setPasswordStrength("strong");
    } else if (value.length >= 6) {
      setPasswordStrength("medium");
    } else {
      setPasswordStrength("weak");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-md p-8 min-[650px]:p-4 min-[650px]:mt-2 w-full max-w-md border-[0.2px] border-black">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
 
        {/* Form Element */}
        <form onSubmit={handleSignup}>
          {/* Name Field */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Email/Phone Field */}
          <div className="mb-4">
            <label htmlFor="emailPhone" className="block text-gray-700">Email or Phone</label>
            <input
              id="emailPhone"
              type="text"
              placeholder="Email or Phone"
              value={inputValue}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {isPhone ? (
            <Oauth isPhone={isPhone} inputValue={inputValue} /> // Your OTP component
          ) : (
            <>
              {/* Password Field */}
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700">Password</label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Password"
                    value={password}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                  >
                    {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                  </button>
                </div>
                {/* Password Strength Indicator */}
                <div
                  className={`mt-2 h-2 rounded-full ${passwordStrength === "strong" ? "bg-green-500" : passwordStrength === "medium" ? "bg-yellow-500" : "bg-red-500"}`}
                  style={{
                    width: passwordStrength === "strong" ? "100%" : passwordStrength === "medium" ? "70%" : "40%",
                  }}
                />
                <span className="text-sm text-gray-500">{passwordStrength && `Password is ${passwordStrength}`}</span>
              </div>
            </>
          )}

          {/* Signup Button */}
          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg text-lg mb-6">Sign Up</button>
          </form>
          {/* Social Media Options */}
          <div className="text-center text-gray-600 mb-4">Or sign up with</div>
          <div className="flex justify-around mb-6">
            <button onClick={() => socialLogin("google")} className="flex items-center justify-center w-12 h-12 bg-red-500 text-white rounded-full">
              <FaGoogle size={20} />
            </button>
            <button onClick={() => socialLogin("facebook")} className="flex items-center justify-center w-12 h-12 bg-blue-500 text-white rounded-full">
              <FaFacebook size={20} />
            </button>
            <button onClick={() => socialLogin("apple")} className="flex items-center justify-center w-12 h-12 bg-black text-white rounded-full">
              <FaApple size={20} />
            </button>
          </div>

          {/* Already Registered */}
          <div className="text-center">
            <Link to="/login" className="text-blue-500 underline hover:text-blue-700">Already registered? Log in</Link>
          </div>
       {/* End of Form Element */}
      </div>
    </div>
  );
};

export default Register;