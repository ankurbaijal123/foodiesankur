import React, { useState,useContext } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosClient from '../components/AxiosClient';
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/noteContext';
const SmartBuy = () => {
  const [showUploadPopup, setShowUploadPopup] = useState(false);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const {checkTokenExpiry} = useContext(noteContext)
  const handleViewPrescriptions = () => {
    navigate('/prescriptions');
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error('Please select a file to upload');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('No authentication token found. Please log in.');
      return;
    }
    checkTokenExpiry();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axiosClient.post('/users/upload_prescription', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        toast.success('File uploaded successfully');
        setShowUploadPopup(false);
      } else {
        toast.error('Failed to upload file');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Error uploading file');
    }
};


  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Smart Buy</h1>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            onClick={() => setShowUploadPopup(true)}
            className="bg-gradient-to-r from-orange-400 to-yellow-400 hover:from-orange-500 hover:to-yellow-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Upload Prescription
          </button>
          <button
            onClick={handleViewPrescriptions}
            className="bg-gradient-to-r from-orange-400 to-yellow-400 hover:from-orange-500 hover:to-yellow-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            View All Prescriptions
          </button>
        </div>
      </div>
      {showUploadPopup && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-30">
          <div className="bg-white p-6 rounded shadow-md w-80">
            <h2 className="text-xl font-bold mb-4">Upload Prescription</h2>
            <input type="file" onChange={handleFileChange} className="mb-4" />
            <div className="flex items-center justify-between">
              <button
                onClick={handleUpload}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Upload
              </button>
              <button
                onClick={() => setShowUploadPopup(false)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
      <Footer />
    </>
  );
};

export default SmartBuy;
