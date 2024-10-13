import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import presImage from "../assets/pres.jpeg"; // Assuming this is the path for the image

const PrescriptionUpload = () => {
    const [file, setFile] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = () => {
        if (!file) {
            toast.error("Please upload a prescription file.");
            return;
        }

        // Simulate file upload success
        toast.success("Prescription uploaded successfully!");

        // Navigate to getCoupons with the relevant data
        navigate("/getCoupons", {
            state: {
                prescription_file: file,
                ...location.state // Pass the previous state data
            }
        });
    };

    const handleCancel = () => {
        navigate(-1); // Go back to the previous page
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <img src={presImage} alt="Prescription" className="mb-4 w-1/3" /> {/* Image on top */}
            <h2 className="text-2xl mb-4">Upload Prescription</h2>
            <input
                type="file"
                onChange={handleFileChange}
                className="mb-4"
            />
            <div className="flex space-x-4">
                <button
                    onClick={handleUpload}
                    className="bg-gradient-to-r from-orange-400 to-yellow-400 text-white px-4 py-2 rounded-md"
                >
                    Get Coupon
                </button>
                <button
                    onClick={handleCancel}
                    className="bg-gradient-to-r from-orange-400 to-yellow-400 text-white px-4 py-2 rounded-md"
                >
                    Cancel
                </button>
            </div>
            <ToastContainer />
        </div>
    );
};

export default PrescriptionUpload;
