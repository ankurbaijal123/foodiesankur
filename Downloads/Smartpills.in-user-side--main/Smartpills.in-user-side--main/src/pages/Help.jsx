import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import logo from "../assets/logo.png";
import { IoCallOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { BsPerson } from "react-icons/bs";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import axiosClient from '../components/AxiosClient';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Help = () => {
  const [registered, setRegistered] = useState(false);
  const [guest, setGuest] = useState(false);

  if (registered || guest) {
    document.body.classList.add('no-scroll');
  } else {
    document.body.classList.remove('no-scroll');
  }

  const handleGuestLogin = async () => {
    console.log('guest login')
    // try {
    //   const response = await axiosClient.post('/auth/guest_login');
    //   if (response.data.code === 200) {
    //     const { access_token } = response.data.data[0];
    //     localStorage.setItem('token', access_token);
    //     toast.success('Guest login successful');
    //     setGuest(false); // Close the guest login popup
    //   } else {
    //     toast.error('Guest login failed');
    //   }
    // } catch (error) {
    //   console.error("Error during guest login:", error);
    //   toast.error('Guest login failed');
    // }
  };

  return (
    <div>
      <ToastContainer />
      {registered && (
        <div className="md:fixed z-50 flex justify-center items-center h-screen w-full bg-gray-700 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg md:w-4/12">
            <img src={logo} className="md:w-7/12 mx-auto mb-20" alt="Logo" />
            <div style={{ textAlign: 'center' }}>
              <Link to="/signin">
                <button className="bg-gradient-to-r from-orange-400 to-yellow-400 text-white px-4 mb-10 py-2 rounded-md">LOG IN</button>
              </Link>
              <div>Not Signed Up? Sign Up <Link to="/signup" className="text-blue-500">here</Link>.</div>
              <div className="text-blue-300 cursor-pointer" onClick={() => setRegistered(false)}>CANCEL</div>
            </div>
          </div>
        </div>
      )}
      {guest && (
        <div className="md:fixed z-50 flex justify-center items-center h-screen w-full bg-gray-700 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg md:w-4/12">
            <img src={logo} className="md:w-7/12 mx-auto mb-20" alt="Logo" />
            <div style={{ textAlign: 'center' }}>
              <div>Do you want to login as a Guest user?</div>
              <button className="bg-gradient-to-r from-orange-400 to-yellow-400 text-white px-4 mb-5 py-2 rounded-md mt-5" onClick={handleGuestLogin}>Login</button>
              <div className="cursor-pointer text-blue-300 text-center" onClick={() => setGuest(false)}>CANCEL</div>
            </div>
          </div>
        </div>
      )}
      <div className={`${registered || guest ? 'blur-lg' : ''}`}>
        <Navbar />
        <div className="flex justify-center items-center lg:mt-0 mt-10" style={{ height: '80vh' }}>
          <div className="lg:w-4/12 p-8 mb-10">
            <div style={{ fontSize: '2rem' }} className="font-bold mb-5">Need Help?</div>
            <div className="text-sm mb-5">Please let us know if you are unable to reset password, create a new account or not getting the OTP.</div>
            <div className="flex">
              <button className="text-white bg-gradient-to-r from-orange-400 to-yellow-400 w-1/2 mr-2 py-2 rounded-md" onClick={() => setRegistered(!registered)}>Registered User</button>
              <button className="text-white w-1/2 bg-gradient-to-r from-orange-400 to-yellow-400 ml-2 py-2 rounded-md" onClick={() => setGuest(!guest)}>Guest User</button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Help;
