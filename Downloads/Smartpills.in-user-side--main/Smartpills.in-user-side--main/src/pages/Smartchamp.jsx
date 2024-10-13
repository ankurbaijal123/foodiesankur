import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axiosClient from '../components/AxiosClient';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Smartchamp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    prior_experience_of_buisness: '',
    residence_address: '',
    why_health_partner: '',
    how_did_you_hear_about_us: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await axiosClient.post('smartchamp/create_smartchamp', formDataToSend);
      console.log('Response:', response.data);
      toast.success('Form submitted successfully!');
      setFormData({
        name: '',
        email: '',
        mobile: '',
        prior_experience_of_buisness: '',
        residence_address: '',
        why_health_partner: '',
        how_did_you_hear_about_us: '',
        message: ''
      });
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to submit the form.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex flex-col items-center justify-center bg-gray-100 py-8">
        <h2 className="text-3xl font-bold mb-6">Smartchamp</h2>
        <form className="w-full max-w-lg bg-white p-8 shadow-md rounded" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Mobile:</label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Prior Experience of Business:</label>
            <input
              type="text"
              name="prior_experience_of_buisness"
              value={formData.prior_experience_of_buisness}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Residence Address:</label>
            <input
              type="text"
              name="residence_address"
              value={formData.residence_address}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Why Health Partner:</label>
            <input
              type="text"
              name="why_health_partner"
              value={formData.why_health_partner}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">How did you hear about us:</label>
            <input
              type="text"
              name="how_did_you_hear_about_us"
              value={formData.how_did_you_hear_about_us}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Message:</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-orange-400 to-yellow-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </form>
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default Smartchamp;
