import React,{useContext} from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axiosClient from "../components/AxiosClient"; 
import { toast } from "react-toastify"; 
import noteContext from "../context/notes/noteContext";
const Subscriptionplans = () => {
  const {checkTokenExpiry} = useContext(noteContext)
    const initiate = async () => {
        try {
            const token = localStorage.getItem("token");
            
            // Check if token is available
            if (!token) {
                toast.error("Authentication token not found. Please log in.");
                return; // Stop the function if token is missing
            }
            checkTokenExpiry();
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const response = await axiosClient.post(
                `/subscriptions/initiate-payment`, 
                null, 
                config
            );

            window.location.href = response.data.response.url;
        } catch (error) {
            console.error("Error initiating payment", error);
            toast.error("Error initiating payment");
        }
    };

    return (
        <div>
            <Navbar />
            <button
                className="text-white rounded-md bg-gradient-to-r from-orange-400 to-yellow-400 px-2 py-2 my-2 ml-2"
                onClick={initiate}
            >
                Buy Subscription Plan at just Rs 99
            </button>
            <Footer />
        </div>
    );
};

export default Subscriptionplans;
