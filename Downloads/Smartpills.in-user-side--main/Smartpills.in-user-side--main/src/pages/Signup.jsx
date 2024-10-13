import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import signupImage from "../assets/login.png";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosClient from "../components/AxiosClient";
import { useNavigate } from "react-router-dom";
const SignUp = ({ history }) => {
    const [formData, setFormData] = useState({
        name: "",
        mobile: "",
        email: ""
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    
    const handleSendOTP = async (e) => {
        e.preventDefault();
        try {
            // Check if all required fields are filled
            if (!formData.name || !formData.mobile || !formData.email) {
                toast.error("Required fields are missing.");
                return;
            }
    
            const formDataToSend = new FormData();
            formDataToSend.append('phone_number', formData.mobile);
            formDataToSend.append('role', 'new'); // Add role to formDataToSend
    
            const response = await axiosClient.post("/auth/send_otp", formDataToSend);
    
            if (response.data.message) {
                toast.success("OTP sent successfully.");
                
                // Navigate to OTP page and pass formData as state
                navigate(`/otp?name=${formData.name}&mobile=${formData.mobile}&email=${formData.email}`);
            } else {
                toast.error("Failed to send OTP.");
            }
        } catch (error) {
            if (error.response) {
                toast.error('User already exisits, Please login');
            }
        }
    };
    
    

    return (
        <>
            <div className="lg:flex">
                <div className="lg:w-1/2 w-full">
                    <Link to="/"><img src={logo} className="sm:w-5/12 w-9/12 mx-auto mt-20 mb-20 pt-2" alt="Logo"></img></Link>
                    <form onSubmit={handleSendOTP}>
                        <div className="flex border-b-2 sm:w-5/12 w-9/12 mx-auto mb-5 border-gray-500 pb-3">
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter Your Name"
                                className="w-full focus:outline-none"
                            />
                        </div>
                        <div className="flex border-b-2 sm:w-5/12 w-9/12 mx-auto mb-5 border-gray-500 pb-3">
                            <input
                                type="tel"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                                placeholder="Mobile No."
                                className="w-full focus:outline-none"
                            />
                        </div>
                        <div className="flex border-b-2 sm:w-5/12 w-9/12 mx-auto mb-5 border-gray-500 pb-3">
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email Address"
                                className="w-full focus:outline-none"
                            />
                        </div>
                        <div className="flex justify-center">
                            <button type="submit" className='bg-gradient-to-r from-orange-400 to-yellow-400 px-9 py-3 rounded-lg mt-5 mb-9'>SIGN UP</button>
                        </div>
                    </form>
                    <div className="flex justify-center">
                        <h2 className="font-semibold">Already Signed Up? Log In <Link to="/signin" className=" text-blue-700 ">here</Link></h2>
                    </div>
                </div>
                <img src={signupImage} className="hidden lg:block w-1/2 object-cover border border-l-4 border-orange-400" style={{ borderTopLeftRadius: '100px', height: '100vh' }} alt="Signup"></img>
            </div>
            <ToastContainer />
        </>
    )
}

export default SignUp;
