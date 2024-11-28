import React, { useState } from "react";
import { FaGoogle, FaFacebook, FaApple, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Oauth from "../oAuth/Oauth"; // Assuming this is your OTP component
import axios from "axios";
import { baseUrl } from "../../../data/Api";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isPhone, setIsPhone] = useState(false);
  const [provider, setProvider] = useState("email");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

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

  const handleSignup = async (e) => {
    e.preventDefault();

    const userData = {
      name,
      email: isPhone ? undefined : inputValue,
      phone: isPhone ? inputValue : undefined,
      password: !isPhone ? password : undefined,
      provider: isPhone ? "phone" : "email",
    };

    try {
      const response = await axios.post(`${baseUrl}/register`, userData);
      console.log(response,"===response register")
      alert("Registration successful! Please verify your email or phone.");
    } catch (error) {
      console.error("Registration error:", error.response?.data || error.message);
      alert("Registration failed. Please try again.");
    }
  };

  const handleOtpVerification = async () => {
    try {
      const endpoint = isPhone
        ? `${baseUrl}/verify/phone`
        : `${baseUrl}/verify/email`;

      const response = await axios.post(endpoint, {
        otp,
        email: !isPhone ? inputValue : undefined,
        phone: isPhone ? inputValue : undefined,
      });

      alert("Verification successful!");
      navigate("/login");
    } catch (error) {
      console.error("Verification error:", error.response?.data || error.message);
      alert("Invalid OTP. Please try again.");
    }
  };

  const handleResendOtp = async () => {
    try {
      const endpoint = isPhone
        ? `${baseUrl}/phone/resend`
        : `${baseUrl}/email/resend`;

      await axios.post(endpoint, {
        email: !isPhone ? inputValue : undefined,
        phone: isPhone ? inputValue : undefined,
      });

      alert("OTP resent successfully!");
    } catch (error) {
      console.error("Resend OTP error:", error.response?.data || error.message);
      alert("Failed to resend OTP. Please try again.");
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    // Check if input is a phone number
    const phoneRegex = /^\d{10}$/;
    setIsPhone(phoneRegex.test(value));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    if (value.length >= 8 && /[A-Z]/.test(value) && /\d/.test(value)) {
      setPasswordStrength("strong");
    } else if (value.length >= 6) {
      setPasswordStrength("medium");
    } else {
      setPasswordStrength("weak");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-2 max-[450px]:p-4">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md border-[0.2px] border-black ">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

        <form onSubmit={handleSignup}>
          <div className="mb-4 ">
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

          {!isPhone && (
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
              <div
                className={`mt-2 h-2 rounded-full ${passwordStrength === "strong" ? "bg-green-500" : passwordStrength === "medium" ? "bg-yellow-500" : "bg-red-500"}`}
                style={{
                  width: passwordStrength === "strong" ? "100%" : passwordStrength === "medium" ? "70%" : "40%",
                }}
              />
              <span className="text-sm text-gray-500">{passwordStrength && `Password is ${passwordStrength}`}</span>
            </div>
          )}

          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg text-lg mb-6">Sign Up</button>
        </form>

        {isPhone && (
          <div className="mb-4">
            <label htmlFor="otp" className="block text-gray-700">Enter OTP</label>
            <input
              id="otp"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              onClick={handleOtpVerification}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg mt-2"
            >
              Verify OTP
            </button>
            <button
              onClick={handleResendOtp}
              className="w-full bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-lg mt-2"
            >
              Resend OTP
            </button>
          </div>
        )}
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

        <div className="text-center">
          <Link to="/login" className="text-blue-500 underline hover:text-blue-700">Already registered? Log in</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
