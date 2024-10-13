import React, { useRef, useState, useEffect,useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import signup from "../assets/login.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosClient from "../components/AxiosClient";
const Otp = () => {
    const inputRefs = useRef([]);
    const [otp, setOtp] = useState(["", "", "", "", "", ""])
    const [mobile, setMobile] = useState("");
    const navigate = useNavigate();

    // Parse URL parameters and update mobile state
    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const mobileFromParams = searchParams.get('phoneNumber') || "";
        setMobile(mobileFromParams);
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
            if (!otp || !mobile) {
                toast.error("Required fields are missing.");
                return;
            }

            const formDataToSend = new FormData();
            formDataToSend.append('mobile', mobile);
            formDataToSend.append('otp',  otp.join(''));
            const response = await axiosClient.post("/auth/user_login", formDataToSend);

            // Show toast for success message
            if (response.data.message) {
                const { data } = response.data;
                const accessToken = data[0].access_token;
                const userdata=data[0].user;
                localStorage.setItem('token', accessToken);
                localStorage.setItem('user', JSON.stringify(userdata));
                localStorage.setItem("mobile",mobile)
                toast.success(response.data.message);
                setTimeout(() => {
                    // Redirect to another page if needed
                    navigate("/");
                }, 1000);
            }
            
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.detail);
            }
        }
    };

    // const renderInputBoxes = () => {
    //     const boxes = [];
    //     for (let i = 0; i < 6; i++) {
    //         boxes.push(
    //             <input
    //                 key={i}
    //                 ref={(el) => (inputRefs.current[i] = el)}
    //                 type="text"
    //                 maxLength={1}
    //                 onChange={(e) => handleChange(i, e)}
    //                 className="border border-gray-300 rounded-md w-12 h-12 text-center mx-1 focus:outline-none"
    //             />
    //         );
    //     }
    //     return boxes;
    // };

    return (
        <div className="lg:flex h-screen">
            <div className="lg:w-1/2 w-full flex flex-col items-center justify-center">
                <Link to="/"><img src={logo} className="sm:w-5/12 w-9/12 mx-auto mb-12" alt="Logo" /></Link>
                <div className="text-4xl mb-10">OTP Verification</div>
                <div className="flex mb-5"> {otp.map((digit, index) => (
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
                                    className="border border-gray-300 rounded-md w-12 h-12 text-center mx-1 focus:outline-none"
                                    // placeholder="Enter the OTP"
                                    required
                                />
                            ))}</div>
                <button onClick={handleSubmit} className='bg-gradient-to-r from-orange-400 to-yellow-400 px-9 py-3 rounded-lg mt-5 mb-9'>Verify OTP</button>
            </div>
            <img src={signup} className="hidden lg:block w-1/2 object-cover border border-l-4 border-orange-400" style={{ borderTopLeftRadius: '100px', height: '100vh' }} alt="Signup" />
            
            <ToastContainer />
        </div>
    );
};

export default Otp;
