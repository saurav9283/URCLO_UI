import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { resetPassword } from '../../../data/Api';
import { Snackbar } from "@mui/material";

const ResetPassword = () => {
    const location = useLocation();
    const token = new URLSearchParams(location.search).get('token');

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate= useNavigate();
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

        // Validate passwords
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            // API call to reset password
            const response = await axios.post(
                `${resetPassword}?token=${token}`,
                { password: newPassword }
            );
            if(response.status === 200){
                setMessage(response.data.msg);
                handleClick();
                setTimeout(() => {
                    navigate("/login");
                  }, 1500);
            }

        } catch (err) {
            // Handle errors
            setMessage(err.response?.data?.msg || "Invalid OTP. Please try again.");
            handleClick();
        }
    };

    return (
        <div className='max-[450px]:p-6'>
            <div className="max-w-md mx-auto mt-10 border rounded shadow-lg p-4">
                <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
                <form onSubmit={handleResetPassword}>
                    <div className="mb-4">
                        <label className="block text-gray-700">New Password:</label>
                        <input
                            type="password"
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Confirm Password:</label>
                        <input
                            type="password"
                            placeholder="Confirm new password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    >
                        Reset Password
                    </button>
                </form>
                {message && <p className="text-green-500 mt-4">{message}</p>}
                {error && <p className="text-red-500 mt-4">{error}</p>}
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

export default ResetPassword;
