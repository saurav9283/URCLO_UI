import React,{useState} from 'react'

const Oauth = ({isPhone,inputValue}) => {

    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState("");

    const resendOtp = () => {
        alert("OTP resent successfully to " + inputValue);
      };

      const verifyOtp = () => {
        if (otp.length === 6) {
          alert("OTP verified successfully!");
        } else {
          alert("Please enter a valid 6-digit OTP.");
        }
      };

      const sendOtp = () => {
        if (isPhone) {
          setOtpSent(true);
          alert("OTP sent successfully to " + inputValue);
        } else {
          alert("Please enter a valid phone number.");
        }
      };

      

    const handleOtpChange = (e) => {
        const value = e.target.value.replace(/\D/g, ""); // Ensure numeric input
        setOtp(value);
      };
    

  return (
    <div>
        (
          <>
            {otpSent ? (
              <div className="mb-4">
                {/* OTP Field */}
                <label htmlFor="otp" className="block text-gray-700">
                  Enter OTP
                </label>
                <input
                  id="otp"
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={handleOtpChange}
                  maxLength="6"
                  className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex justify-between mt-2">
                  <button
                    onClick={resendOtp}
                    className="text-blue-500 underline hover:text-blue-700"
                  >
                    Resend OTP
                  </button>
                  <button
                    onClick={verifyOtp}
                    className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg"
                  >
                    Verify OTP
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={sendOtp}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg mb-6"
              >
                Send OTP
              </button>
            )}
          </>
        )
    </div>
  )
}

export default Oauth