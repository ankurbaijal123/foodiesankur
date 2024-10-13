// OtpPopup.jsx
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axiosClient from './AxiosClient';

const OtpPopup = ({ mobile, onClose }) => {
  const [otp, setOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false); // New state to track OTP verification status

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setIsVerifying(true);
    try {
      const data = new FormData();
      data.append('mobile', mobile);
      data.append('otp', otp);

      const response = await axiosClient.post('/auth/query_verify', data);

      if (response.status === 200) {
        const result = response.data;
        console.log('OTP verified successfully:', result);
        toast.success('OTP verified successfully!');
        setOtpVerified(true); // Set otpVerified to true if OTP verification is successful
        onClose(true); // Pass true to indicate OTP verification success
      } else {
        const error = await response.data;
        console.error('OTP verification failed:', error);
        toast.error('OTP verification failed');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      toast.error('Error verifying OTP');
    }
    setIsVerifying(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-xl font-bold mb-4">Enter OTP</h2>
        <form onSubmit={handleOtpSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="otp">
              OTP
            </label>
            <input
              type="text"
              id="otp"
              name="otp"
              value={otp}
              onChange={handleOtpChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter the OTP"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {isVerifying ? 'Verifying OTP...' : 'Verify OTP'}
            </button>
            <button
              type="button"
              onClick={() => onClose(otpVerified)} // Pass otpVerified to onClose function
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OtpPopup;
