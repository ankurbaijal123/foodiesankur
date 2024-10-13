import React, { useRef, useState, useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import signup from "../assets/login.png";
import { IoCallOutline } from "react-icons/io5";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosClient from "../components/AxiosClient";
import { useNavigate } from "react-router-dom";

const Otp = () => {
    
    const inputRefs = useRef([]);
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [formData, setFormData] = useState({
        name: "",
        mobile: "",
        email: ""
    });

    const navigate = useNavigate();

    // Parse URL parameters
    const searchParams = new URLSearchParams(window.location.search);
    const name = searchParams.get('name') || "";
    const mobile = searchParams.get('mobile') || "";
    const email = searchParams.get('email') || "";

    // Update form data with URL parameters
    useState(() => {
        setFormData({
            name,
            mobile,
            email
        });
    }, []);


    const handleOtpChange = (index, value) => {
        const newotp = [...otp]
        newotp[index] = value

        if (value && index < otp.length - 1) {
            inputRefs.current[index + 1].focus()
        }
        setOtp(newotp);
    };
    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && index > 0 && !otp[index]) {
            const newotp = [...otp]
            newotp[index - 1] = ""
            inputRefs.current[index - 1].focus()
            setOtp(newotp)


        }
    }

    // const handleChange = (index, e) => {
    //     const { maxLength, value } = e.target;
    //     const nextIndex = index + 1;

    //     if (value.length === maxLength && inputRefs.current[nextIndex]) {
    //         inputRefs.current[nextIndex].focus();
    //     }

    //     // Collect OTP
    //     setOtp(prevOtp => {
    //         const newOtp = prevOtp + value;
    //         return newOtp.length <= 6 ? newOtp : prevOtp;
    //     });
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Check if all required fields are filled
            if (!otp || !formData.name || !formData.mobile || !formData.email) {
                toast.error("Required fields are missing.");
                return;
            }

            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.name);
            formDataToSend.append('mobile', formData.mobile);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('otp', otp.join(''));


            console.log(formDataToSend)
            const response = await axiosClient.post("/auth/user_signup", formDataToSend);

            // Show toast for success message
            if (response.data.message) {
                // toast.success(response.data.message);
                await login(formData.mobile, otp.join(''))
                // setTimeout(() => {

                // }, 1000);
            }
        } catch (error) {
            console.error("Error signing up:", error);
            if (error.response) {
                toast.error(error.response.data.detail);
            }
        }
    };


    const login = async (mobile, otp) => {
        console.log(mobile, otp)
        try {
            // Check if all required fields are filled
            if (!otp || !mobile) {
                console.log("uyuyuyuy")
                toast.error("Required fields are missing.");
                return;
            }
            const formDataToSend = new FormData();
            formDataToSend.append('mobile', mobile);
            formDataToSend.append('otp', otp);
            console.log(formDataToSend, "-==-=-=-")
            const response = await axiosClient.post("/auth/user_login", formDataToSend);
            console.log(response)
            // Show toast for success message
            if (response.data.message) {
                const { data } = response.data;
                const accessToken = data[0].access_token;
                const userdata = data[0].user;
                localStorage.setItem('token', accessToken);
                localStorage.setItem('user', JSON.stringify(userdata));
                toast.success(response.data.message);
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            }

        } catch (error) {
            console.log(error)
            if (error.response) {
                toast.error(error.response.data.detail);
            }
        }

    }

    // const renderInputBoxes = () => {
    //     // const boxes = [];
    //     retinputRefsurn (
    //     }
    // for (let i = 0; i < 6; i++) {
    //     boxes.push(
    //         <input
    //             key={i}
    //             ref={(el) => (inputRefs.current[i] = el)}
    //             type="text"
    //             maxLength={1}
    //             onChange={(e) => handleChange(i, e)}
    //             className="border border-gray-300 rounded-md w-12 h-12 text-center mx-1"
    //         />
    //     );
    // }


    return (
        <>
            <div className="lg:flex">
                <div className="flex flex-col items-center">
                    <Link to="/"><img src={logo} className="sm:w-5/12 w-9/12 mx-auto mt-20 pt-2 mb-20" alt="Logo" /></Link>
                    <div className="mb-10">OTP</div>
                    <div className="flex w-5/12 mx-auto mb-5 pb-3 ">
                        <div className="flex justify-center w-full">
                            {otp.map((digit, index) => (
                                <input
                                    type="text"
                                    id={`otp-${index}`}
                                    key={index}
                                    name={`otp-${index}`}
                                    maxLength={1}
                                    value={digit}
                                    autoFocus={index === 0}
                                    ref={(ref) => { inputRefs.current[index] = ref }}
                                    onChange={(e) => handleOtpChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    className="border border-gray-300 rounded-md w-12 h-12 text-center mx-1"
                                    // placeholder="Enter the OTP"
                                    required
                                />
                            ))}

                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button onClick={handleSubmit} className='bg-gradient-to-r from-orange-400 to-yellow-400 px-9 py-3 rounded-lg mt-5 mb-9'>Verify OTP</button>
                    </div>
                </div>
                <img src={signup} className="hidden lg:block w-1/2 object-cover border border-l-4 border-orange-400" style={{ borderTopLeftRadius: '100px', height: '100vh' }} alt="Signup" />
            </div>
            <ToastContainer />
        </>
    );
};

export default Otp;
