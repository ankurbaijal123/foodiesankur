import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import signup from "../assets/login.png";
import { IoCallOutline } from "react-icons/io5";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosClient from "../components/AxiosClient";
import { useNavigate } from "react-router-dom";
const SignIn = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // State for loading
    const navigate = useNavigate();
    const handleSendOTP = async () => {
        try {
            // Check if phone number is provided
            if (!phoneNumber) {
                toast.error("Please enter your mobile number.");
                return;
            }

            setLoading(true); // Start loading
            const formData = new FormData();
            formData.append('phone_number', phoneNumber);
            formData.append('role', 'user');
            const response = await axiosClient.post('/auth/send_otp', formData);

            if (response.status === 200) {
                // OTP sent successfully
                toast.success("OTP sent successfully.");
                // Redirect to OTP page
                navigate( `/loginotp?phoneNumber=${phoneNumber}`);
            } else {
                // Failed to send OTP
                toast.error("Failed to send OTP.");
            }
        } catch (error) {
            // Error occurred
            console.error('Error sending OTP:', error);
            toast.error('User not found, Please try again later');
        } finally {
            setLoading(false); // End loading
        }
    };

    return (
        <>
            <div className="lg:flex">
                <div className="lg:w-1/2 w-full">
                    <Link to="/"><img src={logo} className="sm:w-5/12 w-9/12 mx-auto mt-20 pt-2 mb-20" alt="Logo"></img></Link>
                    <div className="flex border-b-2 sm:w-5/12 w-9/12 mx-auto mb-5 border-gray-500 pb-3">
                        <IoCallOutline color="gray" className="my-auto mr-2" fontSize='1.5rem'></IoCallOutline>
                        <input 
                            placeholder="Mobile No." 
                            className="w-full focus:outline-none" 
                            value={phoneNumber} 
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-center">
                        <button 
                            className='bg-gradient-to-r from-orange-400 to-yellow-400 px-9 py-3 rounded-lg mt-5 mb-9'
                            onClick={handleSendOTP}
                            disabled={loading} // Disable button while loading
                        >
                            {loading ? 'SENDING OTP...' : 'SEND OTP'} 
                        </button>
                    </div>
                    <ToastContainer />
                    {error && <p className="text-red-500">{error}</p>}
                    <div className="flex justify-center">
                        <h2 className="font-semibold">Not Signed Up? Sign Up <Link to="/signup" className=" text-blue-700 ">here</Link></h2>
                    </div>
                </div>
                <img src={signup} className="hidden lg:block w-1/2 object-cover border border-l-4 border-orange-400" style={{ borderTopLeftRadius: '100px', height: '100vh' }} alt="Signup"></img>
            </div>
        </>
    )
}

export default SignIn;
