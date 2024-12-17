import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { baseUrl } from '../../../data/Api';
import axios from 'axios';
import { Snackbar } from "@mui/material";

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };


  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await axios.post(`${baseUrl}/password/forgot`, { email });

      // Handle successful response
      // if (response.data?.msg) {
      //   setMessage(response.data.msg);
      //   setTimeout(() => navigate("/login/reset-password"), 3000); // Redirect to reset-password after success
      // }
      if(response.status === 200)
      {
        setMessage(response.data.msg);
        handleClick();
        // setTimeout(() => navigate("/login/reset-password"), 2000); // Redirect to reset-password after success
      }
    } catch (error) {
      // Handle error response
        setMessage(error.response?.data?.msg || 'Somethindg went wrong');
        handleClick();
    }
  };

  return (
    <div className="max-[450px]:p-4">
      <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Password Reset</h2>
        <div className="bg-yellow-200 p-4 mb-4 rounded">
          <p>Forgotten your password? Enter your email address below.</p>
        </div>
        <form onSubmit={handleResetPassword}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Reset Password
          </button>
        </form>
        {message && <p className="text-green-500 mt-4">{message}</p>}
        {error && <p className="text-red-500 mt-4">{error}</p>}
        <div className="mt-4 text-right">
          <Link to="/login" className="text-blue-500 underline hover:text-blue-700">
            Back to Login
          </Link>
        </div>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={message}
      // anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </div>
  );
};

export default ForgotPassword;
