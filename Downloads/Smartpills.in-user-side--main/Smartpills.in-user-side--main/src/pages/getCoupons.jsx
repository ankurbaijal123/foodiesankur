// src/components/GetCoupons.jsx
import React, { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import noteContext from '../context/notes/noteContext';
import logo from '../assets/logo.png';
import pharmacyLogo from '../assets/pharmacy-logo.png';
import backgroundImage from '../assets/coupon.jpeg';
import '../Coupons.css';
import products from '../components/staticData';
import CustomDropdown from './customDropdown';
// Import FontAwesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faEnvelope, faPrint, faCommentDots } from '@fortawesome/free-solid-svg-icons';

const GetCoupons = () => {
    const location = useLocation();
    const [selectedProduct, setSelectedProduct] = useState(products[0].product_name);
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const { checkTokenExpiry } = useContext(noteContext);

    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });

    const quantityFromTablet = location.state?.quantity;

    const handleProductChange = (event) => {
        setSelectedProduct(event.target.value);
    };

    const productData = products.find(product => product.product_name === selectedProduct);

    // Click handlers for the action buttons
    const handleText = () => {
        alert(`Text sent for ${selectedProduct}!`);
    };

    const handleEmail = () => {
        alert(`Email sent for ${selectedProduct}!`);
    };

    const handleDownload = () => {
        alert(`Download initiated for ${selectedProduct}!`);
    };

    const handlePrint = () => {
        window.print(); // Print the coupon
    };

    return (
        <>
            <Navbar />
            <div
                className="min-h-screen flex flex-col justify-center items-center"
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                {isLoggedIn ? (
                    <div className="container mx-auto flex justify-between py-8">
                        <div className="w-1/3 p-4">
                        <h1 className="block text-5xl font-bold mb-6 text-white">Your Prescription, Your Discount!</h1>

                            <br></br>
                            <label className="block text-lg font-semibold mb-2 text-white">Select Product to Download your Coupon:</label>
                            <CustomDropdown 
                                options={products} 
                                selected={selectedProduct} 
                                onSelect={setSelectedProduct} 
                                className="bg-white" // White background for dropdown
                            />
                            <h2 className="text-3xl font-bold text-white mt-4">
                                Here is your coupon for: <span className="text-white">{selectedProduct}</span>
                            </h2>
                            <br />
                        </div>

                        {/* Right Side Coupon */}
                        <div
                            className="md:w-1/3 lg:w-1/4 mx-auto animate-celebrate"
                            style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                borderRadius: '16px',
                                padding: '25px', // Increased padding
                                marginLeft: '20px',
                                marginRight: '150px',
                                marginTop: '-50px',
                                maxWidth: '400px', // Increased maxWidth
                            }}
                        >
                            <div className="shadow-md rounded-lg p-4 text-center">
                                <div className="flex items-center justify-between mb-4">
                                    <img src={logo} alt="SmartPills Logo" className="w-24" />
                                    <p className="text-gray-600 text-sm font-semibold">Coupon Date: {formattedDate}</p>
                                </div>

                                <h2 className="text-xl font-bold text-orange-500 mb-2">{selectedProduct} Coupon</h2>
                                <div className="flex justify-center items-center mb-2">
                                    <p className="text-sm text-gray-600 mr-2">
                                        Quantity: {quantityFromTablet || 'N/A'} | Vendor: {productData?.vendor_name || 'N/A'}
                                    </p>
                                    <img src={pharmacyLogo} alt="Pharmacy Logo" className="w-8" />
                                </div>

                                <p className="text-2xl font-bold text-green-500 mb-2">INR {productData?.mrp || 'N/A'}</p>
                                <p className="line-through text-md text-gray-500 mb-2">INR {productData?.prev_price || 'N/A'}</p>
                                <p className="text-md text-green-500 font-semibold">Save {productData?.discount_percentage || '0'}%</p>

                                <div className="bg-yellow-100 p-2 rounded-lg my-2 text-left text-sm">
                                    <p><strong>Product ID:</strong> {productData?.object_id || 'N/A'}</p>
                                    <p><strong>Description:</strong> {productData?.description || 'No description available.'}</p>
                                    <p><strong>Contact:</strong> Call your pharmacy at {productData?.contact_number || 'N/A'} for more details.</p>
                                    <p><strong>Instructions:</strong> {productData?.instructions || 'Follow the instructions provided by your pharmacist.'}</p>
                                </div>

                                <p className="text-red-500 font-semibold text-sm">This coupon is valid for 48 hours only.</p>
                                
                                {/* Action buttons section */}
                                <div className="flex flex-col items-center mt-6">
                                    <div className="flex justify-around w-full">
                                        <button onClick={handleText} className="coupon-button rounded-full gradient-bg text-white flex flex-col items-center p-4 mx-2">
                                            <FontAwesomeIcon icon={faCommentDots} />
                                    
                                        </button>
                                        <button onClick={handleEmail} className="coupon-button rounded-full gradient-bg text-white flex flex-col items-center p-4 mx-2">
                                            <FontAwesomeIcon icon={faEnvelope} />
                                            
                                        </button>
                                        <button onClick={handleDownload} className="coupon-button rounded-full gradient-bg text-white flex flex-col items-center p-4 mx-2">
                                            <FontAwesomeIcon icon={faDownload} />
                                            
                                        </button>
                                        <button onClick={handlePrint} className="coupon-button rounded-full gradient-bg text-white flex flex-col items-center p-4 mx-2">
                                            <FontAwesomeIcon icon={faPrint} />
                                            
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="text-red-500 text-center">Please login to see your coupons.</p>
                )}
            </div>
            <Footer />
        </>
    );
};

export default GetCoupons;
