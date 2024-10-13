import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsCartPlus } from "react-icons/bs"; // Import the cart icon
import med from "../assets/med.png"; // Assuming this is the image path
import presImage from "../assets/pres.jpeg";
import { IoPaperClip } from 'react-icons/io5'; // or any other icon you prefer


const Tablet = (props) => {
    const [requiredQuantity, setRequiredQuantity] = useState(1);
    const [showModal, setShowModal] = useState(false); // State to control modal visibility
    const [file, setFile] = useState(null); // State for file upload
    const navigate = useNavigate();

    const vendor_id = props.vendor.vendor_id;
    const product_id = props.vendor.object_id;
    const product_main_id = props.vendor.product_main_id;
    const discount = props.vendor.discount_percentage;
    const Mrp = props.vendor.mrp;
    const discountPrice = Mrp - Mrp * (discount / 100);

    const handleGetCoupon = () => {
        setShowModal(true); // Show prescription upload modal
    };

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
                product_id: product_id,
                vendor_id: vendor_id,
                quantity: requiredQuantity,
                discount: discount,
                discounted_price: discountPrice,
                mrp: Mrp,
                name: props.name,
                packaging: props.packaging,
            },
        });

        setShowModal(false); // Close the modal after upload
    };

    const handleAddToCart = () => {
        toast.success(`${props.name} added to cart successfully!`); // Display success message
    };

    return (
        <div>
            <div className="flex justify-between mt-5 bg-gray-100 border border-orange-500 rounded-lg px-5 py-5 shadow-md">
                <div className="flex items-center">
                    <img src={med} style={{ width: "50px", height: "50px" }} alt="Medicine" />
                    <div className="ml-3">
                        <div className="font-bold text-lg">{props.name}</div>
                        <div>Packaging Type: {props.packaging}</div>
                        <div>Available Quantity: {props.quantity}</div>
                        <input
                            placeholder="Enter required quantity"
                            type="number"
                            min="1" // Ensure the input is at least 1
                            value={requiredQuantity}
                            onChange={(e) => setRequiredQuantity(e.target.value)}
                            className="border border-gray-300 rounded-md px-2 py-1 mt-1"
                        />
                    </div>
                </div>
                <div className="w-4/12 text-left">
                    <div className="text-red-500 line-through">{props.currency} {Mrp}</div>
                    <div className="text-green-500 font-semibold">{props.currency} {discountPrice.toFixed(2)}</div>
                    <div className="text-gray-600">(save {props.save}%)</div>
                    <div className="flex items-center justify-start mt-2">
                        <button 
                            onClick={handleGetCoupon} 
                            className="text-white px-4 py-2 rounded-md bg-gradient-to-r from-orange-400 to-yellow-400 transition duration-300 ease-in-out hover:bg-gradient-to-l hover:scale-105 hover:shadow-lg"
                        >
                            GET COUPON
                        </button>
                        <div className="ml-2 flex items-center">
                            <button
                                onClick={handleAddToCart} // Call the function to add to cart
                                className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-orange-400 to-yellow-400 text-white transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
                            >
                                <BsCartPlus size={24} /> {/* Cart Icon */}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal for uploading prescription */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg p-6 shadow-lg z-50 flex flex-col items-center"> {/* Centered content */}
                        <img src={presImage} alt="Prescription" className="mb-4 w-1/2 mx-auto" /> {/* Image on top */}
                        <h2 className="text-2xl mb-4 text-center">Upload Prescription</h2> {/* Centered title */}
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="mb-4 border border-gray-300 rounded-md p-2"
                        />
                        <div className="flex space-x-4">
                            <button
                                onClick={handleUpload}
                                className="bg-gradient-to-r from-orange-400 to-yellow-400 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg" // Added hover effects
                            >
                                Get Coupon
                            </button>
                            <button
                                onClick={() => setShowModal(false)} // Close modal
                                className="bg-gradient-to-r from-red-400 to-red-600 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg" // Added hover effects
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
            <ToastContainer />
        </div>
    );
};

export default Tablet;
