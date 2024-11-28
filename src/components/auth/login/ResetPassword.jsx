import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../../../data/Api';

const ResetPassword = () => {
    const location = useLocation();
    const token = new URLSearchParams(location.search).get('YOUR_TOKEN'); // Extract token from URL

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

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
                `${baseUrl}/password/reset?YOUR_TOKEN=${token}`,
                { password: newPassword }
            );

            if (response.data?.msg) {
                setMessage('Password reset successfully.');
            }
        } catch (err) {
            // Handle errors
            if (err.response?.status === 400) {
                setError(err.response.data?.msg || 'Invalid token or request.');
            } else {
                setError('An error occurred. Please try again later.');
            }
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
        </div>
    );
};

export default ResetPassword;
