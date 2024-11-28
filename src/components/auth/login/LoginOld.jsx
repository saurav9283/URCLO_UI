import React, { useState } from "react";
import ForgotPassword from "./ForgotPassword";
import { useNavigate } from "react-router-dom";

const InputField = ({ label, type, value, onChange, placeholder, errorMessage }) => (
  <div className="mb-4">
    <label className="block text-gray-700 font-semibold mb-2">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full p-3 border ${errorMessage ? "border-red-500" : "border-gray-300"} rounded-lg`}
    />
    {errorMessage && <p className="text-red-500 text-sm mt-1">{errorMessage}</p>}
  </div>
);

const LoginPage = () => {
  const [isPhoneLogin, setIsPhoneLogin] = useState(false);
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "", otp: "" });
  const navigate = useNavigate()

  const handelNavigate = () => {
       navigate('/login/forgot-password')
  }

  const handleInputChange = (e) => {
    const value = e.target.value;
    setemail(value);
    if (errors.email) {
      setErrors({ ...errors, email: "" }); // Clear error message when user types
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (errors.password) {
      setErrors({ ...errors, password: "" }); // Clear error message when user types
    }
  };

  const handleOtpChange = (e) => {
    const value = e.target.value;
    setOtp(value);
    if (errors.otp) {
      setErrors({ ...errors, otp: "" }); // Clear error message when user types
    }
  };

  const validateInputs = () => {
    let valid = true;
    let newErrors = { email: "", password: "", otp: "" };

    if (isPhoneLogin) {
      if (!email) {
        newErrors.email = "Phone number is required.";
        valid = false;
      }
      if (isOtpSent && !otp) {
        newErrors.otp = "OTP is required.";
        valid = false;
      }
    } else {
      if (!email) {
        newErrors.email = "Email is required.";
        valid = false;
      }
      if (!password) {
        newErrors.password = "Password is required.";
        valid = false;
      }
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateInputs()) return; // Validate inputs before proceeding

    if (isPhoneLogin && isOtpSent && otpVerified) {
      console.log("OTP verified successfully.");
      // Logic for successful phone login can be added here
    } else if (!isPhoneLogin && email && password) {
      console.log("Logged in successfully with email.");
      // Logic for successful email login can be added here
    }
  };

  const handleSendOtp = async () => {
    if (email) {
      console.log("Sending OTP...");
      // Simulate API call here...
      setIsOtpSent(true);
    }
  };

  const handleVerifyOtp = async () => {
    if (otp) {
      console.log("Verifying OTP...");
      // Simulate API call here...
      setOtpVerified(true);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-white p-4 ">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border-[0.2px] border-black">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Login to Your Account</h2>
        
        {/* Login Type Selection */}
        <div className="flex justify-around mb-4 gap-2">
          <button 
            onClick={() => setIsPhoneLogin(false)} 
            className={`py-2 px-4 rounded-lg ${!isPhoneLogin ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          >
            Login with Email
          </button>
          <button 
            onClick={() => setIsPhoneLogin(true)} 
            className={`py-2 px-4 rounded-lg ${isPhoneLogin ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          >
            Login with Phone
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {isPhoneLogin ? (
            <>
              <InputField 
                label="Phone" 
                type="text" 
                value={email} 
                onChange={handleInputChange} 
                placeholder="Enter your phone number" 
                errorMessage={errors.email}
              />
              {isOtpSent && !otpVerified && (
                <>
                  <InputField 
                    label="OTP" 
                    type="text" 
                    value={otp} 
                    onChange={handleOtpChange} 
                    placeholder="Enter OTP" 
                    errorMessage={errors.otp}
                  />
                  <div className="mb-4">
                    <button
                      type="button"
                      onClick={handleVerifyOtp}
                      className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
                    >
                      Verify OTP
                    </button>
                  </div>
                </>
              )}
              {!isOtpSent && (
                <div className="mb-4">
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className={`w-full bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600`}
                  >
                    Send OTP
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <InputField 
                label="Email" 
                type="email" 
                value={email} 
                onChange={handleInputChange} 
                placeholder="Enter your email" 
                errorMessage={errors.email}
              />
              <InputField 
                label="Password" 
                type="password" 
                value={password} 
                onChange={handlePasswordChange} 
                placeholder="Enter your password" 
                errorMessage={errors.password}
              />
               
               {/* forgot-password logic */}
              <div className="mb-6 text-right">
                <p onClick={handelNavigate} className="text-blue-500 underline cursor-pointer hover:text-blue-700" >Forgot Password?</p> 
            </div>
              
            </>
          )}
          
          {/* Show Submit Button only after OTP is verified */}
          {isPhoneLogin && otpVerified ? (
            <div className="mb-4">
              <button
                type="submit"
                className={`w-full py-3 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600`}
              >
                Login
              </button>
            </div>
          ) : !isPhoneLogin || !otpVerified ? (
            <div className="mb-4">
              <button
                type="submit"
                className={`w-full py-3 rounded-lg ${!isPhoneLogin && email && password ? "bg-blue-500" : "bg-gray-400"} text-white font-semibold hover:bg-blue-600`}
                disabled={!(!isPhoneLogin && email && password)}
              >
                Submit
              </button>
            </div>
          ) : null}
          
        </form>
      </div>
    </div>
  );
};

export default LoginPage;