import React, { useState, useEffect, useContext } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axiosClient from '../components/AxiosClient';
import noteContext from '../context/notes/noteContext';

const Coupons = () => {
    const [couponsData, setCouponsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filterUsed, setFilterUsed] = useState(null);
    const [selectedCoupon, setSelectedCoupon] = useState(null); // State for selected coupon
    const [isLoggedIn, setIsLoggedIn] = useState(true); // State for login status
    const { checkTokenExpiry } = useContext(noteContext);

    useEffect(() => {
        const fetchCoupons = async () => {
            setIsLoading(true);
            const userToken = localStorage.getItem('token');
            if (!userToken) {
                setIsLoggedIn(false);
                setIsLoading(false);
                return;
            }

            try {
                checkTokenExpiry();
                const formData = new FormData();
                formData.append('used', filterUsed !== null ? filterUsed.toString() : 'None');
                formData.append('order', 'ascending');

                const response = await axiosClient.post(
                    '/coupons/get_coupons_user',
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${userToken}`,
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                );

                console.log('Coupons retrieved successfully');
                const couponsWithStatus = response.data.data[0].map(coupon => ({
                    ...coupon,
                    status: getCouponStatus(coupon.created_at),
                }));
                setCouponsData(couponsWithStatus);
                console.log(couponsWithStatus);
            } catch (error) {
                console.error('Error fetching coupons:', error);
            }
            setIsLoading(false);
        };

        fetchCoupons();
    }, [filterUsed]);

    const getCouponStatus = (createdAt) => {
        const createdTime = new Date(createdAt);
        const currentTime = new Date();
        const expirationTime = new Date(createdTime.getTime() + 48 * 60 * 60 * 1000); // 48 hours later

        return currentTime > expirationTime ? 'Expired' : 'Active';
    };

    const handleFilterUsed = (usedStatus) => {
        setFilterUsed(usedStatus);
    };

    const handleViewDetails = (coupon) => {
        setSelectedCoupon(coupon);
    };

    const handleClosePopup = () => {
        setSelectedCoupon(null);
    };

    return (
        <>
            <Navbar />
            <div className="container mx-auto my-8">
                {isLoggedIn ? (
                    <>
                        <div className="flex justify-between mb-4">
                            <button
                                onClick={() => handleFilterUsed('True')}
                                className="bg-gradient-to-r from-orange-400 to-yellow-400 text-white px-4 py-2 rounded-md focus:outline-none focus:bg-blue-600 mr-4"
                            >
                                Used
                            </button>
                            <button
                                onClick={() => handleFilterUsed('False')}
                                className="bg-gradient-to-r from-orange-400 to-yellow-400 text-white px-4 py-2 rounded-md focus:outline-none focus:bg-green-600"
                            >
                                Not Used
                            </button>
                        </div>
                        <h1 className="text-3xl font-bold my-8">Coupons</h1>
                        {isLoading ? (
                            <p>Loading...</p>
                        ) : (
                            <div>
                                {couponsData.length === 0 ? (
                                    <p className="text-gray-500">No coupons available.</p>
                                ) : (
                                    couponsData.map((coupon, index) => (
                                        <div key={index} className="border border-gray-200 p-4 my-4">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <a
                                                        href={`/coupons/${coupon.id}`} // Assuming you have a route set up for coupon details
                                                        className="text-blue-600 underline"
                                                    >
                                                        {coupon.product_name}
                                                    </a>
                                                </div>
                                                <div className={coupon.status === 'Expired' ? 'text-red-500' : 'text-green-500'}>
                                                    {coupon.status}
                                                </div>
                                                <button onClick={() => handleViewDetails(coupon)}>View</button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}
                    </>
                ) : (
                    <p className="text-red-500 text-center">Please login to see your coupons.</p>
                )}
            </div>
            {selectedCoupon && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded-lg shadow-md">
                        <div className="mb-4">
                            <h2 className="text-xl font-semibold">Coupon Details</h2>
                        </div>
                        <div>
                            <p>User Name: {selectedCoupon.user_name}</p>
                            <p>Vendor Phone Number: {selectedCoupon.vendor_phone}</p>
                            <p>Product Name: {selectedCoupon.product_name}</p>
                            <p>Pharmacy Name: {selectedCoupon.pharmacy_name}</p>
                            <p>Discount: {selectedCoupon.discount}</p>
                            <p>Discounted Price: {selectedCoupon.discounted_price}</p>
                            <p>MRP: {selectedCoupon.mrp}</p>
                            <p>Created At: {selectedCoupon.created_at}</p>
                            <p>Expiry: {selectedCoupon.expiry}</p>
                            <p>Status: {selectedCoupon.status}</p>
                            <p>Quantity: {selectedCoupon.quantity}</p>
                        </div>
                        <div className="mt-4 text-right">
                            <button
                                onClick={handleClosePopup}
                                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-md focus:outline-none focus:bg-gray-500"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <Footer />
        </>
    );
};

export default Coupons;
