import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "", otp: "" });
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setEmail(e.target.value);
    if (errors.email) setErrors({ ...errors, email: "" });
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (errors.password) setErrors({ ...errors, password: "" });
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
    if (errors.otp) setErrors({ ...errors, otp: "" });
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInputs()) return;

    try {
      const payload = isPhoneLogin
        ? { phone: email, otp }
        : { email, password };

      const endpoint = isPhoneLogin
        ? "/api/user-auth/login-phone"
        : "/api/user-auth/login";

      const response = await axios.post(endpoint, payload);
      console.log("Login success:", response.data);

      if (!isPhoneLogin) {
        alert("Login successful!");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);

      if (error.response?.status === 400 && !isPhoneLogin) {
        setApiError("Your email ID is not verified.");
      } else {
        setApiError("An error occurred. Please try again.");
      }
    }
  };

  const handleSendOtp = async () => {
    if (!email) {
      setErrors({ ...errors, email: "Phone number is required." });
      return;
    }

    try {
      const response = await axios.post("/api/user-auth/send-otp", { phone: email });
      console.log("OTP sent:", response.data);
      setIsOtpSent(true);
    } catch (error) {
      console.error("Send OTP error:", error.response?.data || error.message);
      setApiError("Failed to send OTP. Please try again.");
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      setErrors({ ...errors, otp: "OTP is required." });
      return;
    }

    try {
      const response = await axios.post("/api/user-auth/verify-otp", { phone: email, otp });
      console.log("OTP verified:", response.data);
      setOtpVerified(true);
    } catch (error) {
      console.error("Verify OTP error:", error.response?.data || error.message);
      setApiError("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-white p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border-[0.2px] border-black">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Login to Your Account</h2>

        {apiError && <p className="text-red-500 text-center mb-4">{apiError}</p>}

        <div className="flex justify-around mb-4 gap-2">
          <button
            onClick={() => setIsPhoneLogin(false)}
            className={`py-2 px-4 rounded-lg ${!isPhoneLogin ? "bg-blue-500 text-white" : "bg-gray-300"}`}
          >
            Login with Email
          </button>
          <button
            onClick={() => setIsPhoneLogin(true)}
            className={`py-2 px-4 rounded-lg ${isPhoneLogin ? "bg-blue-500 text-white" : "bg-gray-300"}`}
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
                  <button
                    type="button"
                    onClick={handleVerifyOtp}
                    className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
                  >
                    Verify OTP
                  </button>
                </>
              )}
              {!isOtpSent && (
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="w-full bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600"
                >
                  Send OTP
                </button>
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
              <div className="mb-6 text-right flex justify-between">
                <p
                  onClick={() => navigate("/register")}
                  className="text-blue-500 underline cursor-pointer hover:text-blue-700"
                >
                  Sign Up
                </p>
                <p
                  onClick={() => navigate("/login/forgot-password")}
                  className="text-blue-500 underline cursor-pointer hover:text-blue-700"
                >
                  Forgot Password?
                </p>
              </div>
            </>
          )}

          <button
            type="submit"
            className={`w-full py-3 rounded-lg ${(!isPhoneLogin && email && password) || (isPhoneLogin && otpVerified) ? "bg-blue-500" : "bg-gray-400"
              } text-white font-semibold hover:bg-blue-600`}
            disabled={!((!isPhoneLogin && email && password) || (isPhoneLogin && otpVerified))}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
