import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosClient from "../components/AxiosClient";
import { useNavigate } from "react-router-dom";
const Onboarding = () => {
    const navigate = useNavigate();
    const [active, setActive] = useState(false);
    const [location, setLocation] = useState({ lat: 0, lng: 0 });
    const [formData, setFormData] = useState({
        vendor_name: "",
        mobile: "",
        landline: "",
        pharmacy_name: "",
        pharmacy_address: "",
        email: "",
        license_no: "",
        pharmacy_count: "",
        license_certificate: null,
        pharmacy_city: "",
        pharmacy_state: "",
        pincode: "",
        latitude: 0,
        longitude: 0,
        legal_entity_name: "",
        gst_number: "",
        pan_number: "",
        fssai_number: "",
        categories: "",
        account_number: "",
        ifsc_code: "",
        incorporation_type: ""
    });

    const [address, setAddress] = useState({
        pharmacy_city: "",
        pharmacy_state: "",
        pincode: "",
        latitude: 0,
        longitude: 0,
        pharmacy_address: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "pharmacy_address" || name === "pharmacy_city" || name === "pharmacy_state" || name === "pincode") {
            setAddress({ ...address, [name]: value });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, license_certificate: file });
    };

    const handleGeocode = async () => {
        const addressString = `${address.pharmacy_address}, ${address.pharmacy_city}, ${address.pharmacy_state}, ${address.pincode}`;
        try {
            const response = await axios.get(
                `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(addressString)}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
            );
            if (response.data.results.length > 0) {
                const location = response.data.results[0].geometry.location;
                setLocation({ lat: location.lat, lng: location.lng });
                setAddress({ ...address, latitude: location.lat, longitude: location.lng });
            } else {
                alert('Address not found');
            }
        } catch (error) {
            console.error("Error fetching geocode:", error);
        }
    };

    const handleCancel = () => {
        setActive(!active);
        setAddress({
            pharmacy_address: formData.pharmacy_address,
            pharmacy_city: formData.pharmacy_city,
            pharmacy_state: formData.pharmacy_state,
            pincode: formData.pincode,
            latitude: formData.latitude,
            longitude: formData.longitude,
        });
        setLocation({ lat: formData.latitude, lng: formData.longitude });
    };

    const handleSave = () => {
        setFormData({
            ...formData,
            pharmacy_address: address.pharmacy_address,
            pharmacy_city: address.pharmacy_city,
            pharmacy_state: address.pharmacy_state,
            pincode: address.pincode,
            latitude: address.latitude,
            longitude: address.longitude,
        });
        setActive(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            for (const key in formData) {
                formDataToSend.append(key, formData[key]);
            }
    
            const response = await axiosClient.post("/onboarding/create_onboarding", formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            toast.success("Form submitted successfully!");
    
            console.log("Response:", response.data);
    
            setFormData({
                vendor_name: "",
                mobile: "",
                landline: "",
                pharmacy_name: "",
                pharmacy_address: "",
                email: "",
                license_no: "",
                pharmacy_count: "",
                license_certificate: null,
                pharmacy_state: "",
                pharmacy_city: "",
                pincode: "",
                latitude: 0,
                longitude: 0,
                legal_entity_name: "",
                gst_number: "",
                pan_number: "",
                fssai_number: "",
                categories: "",
                account_number: "",
                ifsc_code: "",
                incorporation_type: ""
            });
    
            // Navigate to homepage after 1 second
            setTimeout(() => {
                navigate("/"); // Replace "/" with the URL of your homepage
            }, 1000);
        } catch (error) {
            toast.error(`Error: ${error.response?.data?.detail?.message || error.message}`);
            console.error("Error submitting form:", error);
            console.log("Server Response:", error.response.data.detail);
        }
    };
    

    if (active) {
        document.body.classList.add('no-scroll');
    } else {
        document.body.classList.remove('no-scroll');
    }
    console.log(formData)
    return (
        <div>
            <ToastContainer/>
            {active && (
                <div className="fixed z-50 flex justify-center items-center h-screen w-full">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-10/12">
                        <div className="text-xl font-semibold">Add Address</div>
                        <div style={{ height: '200px' }}>
                            <LoadScript googleMapsApiKey={`${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`}>
                                <GoogleMap
                                    mapContainerStyle={{ width: '100%', height: '100%' }}
                                    center={location}
                                    zoom={15}
                                >
                                    <Marker position={location} />
                                </GoogleMap>
                            </LoadScript>
                        </div>
                        <div className="sm:flex w-full my-2">
                            <input
                                placeholder="Address"
                                className="sm:w-9/12 border border-1 px-2 py-2 rounded-lg w-full mb-1 sm:mb-0"
                                name="pharmacy_address"
                                value={address.pharmacy_address}
                                onChange={handleChange}
                            />
                            <button
                                className="bg-blue-800 sm:w-3/12 sm:ml-4 rounded-lg text-white font-semibold px-2 mt-3 sm:mt-0"
                                onClick={handleGeocode}
                            >
                                Update Map
                            </button>
                        </div>
                        <input
                            placeholder="City"
                            className="w-full border border-1 px-2 py-2 rounded-lg my-2"
                            name="pharmacy_city"
                            value={address.pharmacy_city}
                            onChange={handleChange}
                        />
                        <input
                            placeholder="State"
                            className="w-full border border-1 px-2 py-2 rounded-lg my-2"
                            name="pharmacy_state"
                            value={address.pharmacy_state}
                            onChange={handleChange}
                        />
                        <input
                            placeholder="Pincode"
                            className="w-full border border-1 px-2 py-2 rounded-lg my-2"
                            name="pincode"
                            value={address.pincode}
                            onChange={handleChange}
                        />
                        <div className="my-2">
                            <button
                                className='bg-gradient-to-r from-orange-400 to-yellow-400 text-white rounded-md px-5 py-1 mr-2'
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>
                            <button
                                className='bg-gradient-to-r from-orange-400 to-yellow-400 text-white rounded-md px-5 py-1'
                                onClick={handleSave}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <div className={`${active ? 'blur-lg' : ''}`}>
                <Navbar />
                <div className="sm:mx-20 my-10 mx-5">
                    <div style={{ fontSize: "1.5rem" }} className="mb-8">Vendor Onboarding Form</div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label>Vendor Name *<br />
                                <input
                                    type="text"
                                    name="vendor_name"
                                    value={formData.vendor_name}
                                    onChange={handleChange}
                                    placeholder="Vendor Name"
                                    className="w-full  border-gray-500 border-2 px-4 py-2 rounded-md"
                                />
                            </label>
                        </div>
                        <div className="mb-4">
                            <label>Vendor Mobile Phone *<br />
                                <input
                                    type="number"
                                    name="mobile"
                                    value={formData.mobile}
                                    onChange={handleChange}
                                    placeholder="1234567890"
                                    className="w-full  border-gray-500 border-2 px-4 py-2 rounded-md"
                                />
                            </label>
                        </div>
                        <div className="mb-4">
                            <label>Landline Number <br />
                                <input
                                    type="number"
                                    name="landline"
                                    value={formData.landline}
                                    onChange={handleChange}
                                    placeholder="011-12345678"
                                    className="w-full  border-gray-500 border-2 px-4 py-2 rounded-md"
                                />
                            </label>
                        </div>
                        <div className="mb-4">
                            <label>Pharmacy Name *<br />
                                <input
                                    type="text"
                                    name="pharmacy_name"
                                    value={formData.pharmacy_name}
                                    onChange={handleChange}
                                    placeholder="Pharmacy Name"
                                    className="w-full  border-gray-500 border-2 px-4 py-2 rounded-md"
                                />
                            </label>
                        </div>
                        <div className="mb-4">
                            <label>Pharmacy Address *<br />
                                <input
                                    type="text"
                                    name="pharmacy_address"
                                    value={formData.pharmacy_address}
                                    placeholder="Pharmacy Address"
                                    className="w-full  border-gray-500 border-2 px-4 py-2 rounded-md"
                                />
                            </label>
                        </div>

                        <button
                            type="button"
                            className="bg-blue-700 text-white px-4 py-2 rounded-md mb-4 font-semibold"
                            onClick={() => {
                                setActive(true);
                                setAddress({
                                    pharmacy_address: formData.pharmacy_address,
                                    pharmacy_city: formData.pharmacy_city,
                                    pharmacy_state: formData.pharmacy_state,
                                    pincode: formData.pincode,
                                    latitude: formData.latitude,
                                    longitude: formData.longitude,
                                });
                            }}
                        >
                            Add Address
                        </button>
                        <div>
                            <div className="mb-4">
                                <label>Email *<br />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="test@gmail.com"
                                        className="w-full  border-gray-500 border-2 px-4 py-2 rounded-md"
                                    />
                                </label>
                            </div>
                            <div className="sm:flex w-full mb-4">
                                <div className="w-full mr-2">
                                    <label>License No. *<br />
                                        <input
                                            type="text"
                                            name="license_no"
                                            value={formData.license_no}
                                            onChange={handleChange}
                                            placeholder="License No."
                                            className="w-full  border-gray-500 border-2 px-4 py-2 rounded-md"
                                        />
                                    </label>
                                </div>
                                <div className="w-full sm:ml-2">
                                    <label>Pharmacy Count *<br />
                                        <input
                                            type="text"
                                            name="pharmacy_count"
                                            value={formData.pharmacy_count}
                                            onChange={handleChange}
                                            placeholder="Pharmacy Count"
                                            className="w-full  border-gray-500 border-2 px-4 py-2 rounded-md"
                                        />
                                    </label>
                                </div>
                            </div>
                            <div className="mb-4">
                                <label>Legal Entity Name *<br />
                                    <input
                                        type="text"
                                        name="legal_entity_name"
                                        value={formData.legal_entity_name}
                                        onChange={handleChange}
                                        placeholder="Legal Entity Name"
                                        className="w-full  border-gray-500 border-2 px-4 py-2 rounded-md"
                                    />
                                </label>
                            </div>
                            <div className="mb-4">
                                <label>GST Number *<br />
                                    <input
                                        type="text"
                                        name="gst_number"
                                        value={formData.gst_number}
                                        onChange={handleChange}
                                        placeholder="GST Number"
                                        className="w-full  border-gray-500 border-2 px-4 py-2 rounded-md"
                                    />
                                </label>
                            </div>
                            <div className="mb-4">
                                <label>PAN Number *<br />
                                    <input
                                        type="text"
                                        name="pan_number"
                                        value={formData.pan_number}
                                        onChange={handleChange}
                                        placeholder="PAN Number"
                                        className="w-full  border-gray-500 border-2 px-4 py-2 rounded-md"
                                    />
                                </label>
                            </div>
                            <div className="mb-4">
                                <label>FSSAI Number *<br />
                                    <input
                                        type="text"
                                        name="fssai_number"
                                        value={formData.fssai_number}
                                        onChange={handleChange}
                                        placeholder="FSSAI Number"
                                        className="w-full  border-gray-500 border-2 px-4 py-2 rounded-md"
                                    />
                                </label>
                            </div>
                            <div className="mb-4">
                                <label>Categories *<br />
                                    <input
                                        type="text"
                                        name="categories"
                                        value={formData.categories}
                                        onChange={handleChange}
                                        placeholder="Categories (comma separated)"
                                        className="w-full  border-gray-500 border-2 px-4 py-2 rounded-md"
                                    />
                                </label>
                            </div>
                            <div className="mb-4">
                                <label>Account Number *<br />
                                    <input
                                        type="text"
                                        name="account_number"
                                        value={formData.account_number}
                                        onChange={handleChange}
                                        placeholder="Account Number"
                                        className="w-full  border-gray-500 border-2 px-4 py-2 rounded-md"
                                    />
                                </label>
                            </div>
                            <div className="mb-4">
                                <label>IFSC Code *<br />
                                    <input
                                        type="text"
                                        name="ifsc_code"
                                        value={formData.ifsc_code}
                                        onChange={handleChange}
                                        placeholder="IFSC Code"
                                        className="w-full  border-gray-500 border-2 px-4 py-2 rounded-md"
                                    />
                                </label>
                            </div>
                            <div className="mb-4">
                                <label>Incorporation Type *<br />
                                    <input
                                        type="text"
                                        name="incorporation_type"
                                        value={formData.incorporation_type}
                                        onChange={handleChange}
                                        placeholder="Incorporation Type"
                                        className="w-full  border-gray-500 border-2 px-4 py-2 rounded-md"
                                    />
                                </label>
                            </div>
                            <div className="mb-6 mt-6">
                                <label htmlFor="file-upload" className="bg-blue-700 font-semibold text-white px-4 py-2 rounded-md cursor-pointer">
                                    Upload License Certificate
                                </label>
                                <input
                                    id="file-upload"
                                    type="file"
                                    name="license_certificate"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                            </div>

                            <button type="submit" className="bg-gradient-to-r from-orange-400 to-yellow-400 px-4 py-2 rounded-md mb-4 text-white font-semibold">Submit Partner Form</button>
                        </div>
                    </form>
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default Onboarding;