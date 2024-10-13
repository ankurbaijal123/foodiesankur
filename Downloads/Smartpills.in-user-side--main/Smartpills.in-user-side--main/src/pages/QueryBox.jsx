import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import OtpPopup from '../components/OtpPopup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosClient from '../components/AxiosClient';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const QueryBox = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const label = params.get('label');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    medicine_type: '',
    quantity: '',
    form_type: label || '',
  });
  const [isSending, setIsSending] = useState(false);
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [formFields, setFormFields] = useState([
    {
      id: "name",
      name: "name",
      type: "text",
      label: "Name",
      placeholder: "Enter your name",
      required: true,
    },
    {
      id: "mobile",
      name: "mobile",
      type: "text",
      label: "Mobile",
      placeholder: "Enter your mobile number",
      required: true,
    },
    {
      id: "medicine_type",
      name: "medicine_type",
      type: "text",
      label: "Medicine Type",
      placeholder: "Enter the medicine type",
      required: true,
    },
    {
      id: "quantity",
      name: "quantity",
      type: "number",
      label: "Quantity",
      placeholder: "Enter the quantity",
      required: true,
    },
    {
      id: "form_type",
      name: "form_type",
      type: "text",
      label: "Form Type",
      placeholder: "Form Type",
      required: false,
      readOnly: true,
    },
  ]);

  useEffect(() => {
    const mobile = localStorage.getItem("mobile");
    if (mobile){
      setOtpVerified(true)
      setFormFields(prevFields => prevFields.filter(field => field.id !== "mobile"));
    }
    // Update form_type when label changes
    setFormData((prevFormData) => ({
      ...prevFormData,
      form_type: label || '',
    }));
  }, [label]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setIsSending(true);
    try {
      const data = new FormData();
      data.append('phone_number', formData.mobile);
      data.append('role', 'new');

      const response = await axiosClient.post('/auth/send_otp', data);

      if (response.status === 200) {
        setShowOtpPopup(true);
      } else {
        toast.error('Failed to send OTP');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      toast.error('Error sending OTP');
    }
    setIsSending(false);
  };

  const handleSubmitQuery = async () => {
    try {
      console.log('formdata',formData);

      const data = new FormData();
      const mobile = localStorage.getItem("mobile");
      if (mobile){
        data.append("mobile",mobile);

      }
      else{
        data.append("mobile",formData.mobile);
      }
      data.append('name', formData.name);
      data.append('medicine_type', formData.medicine_type);
      data.append('quantity', formData.quantity);
      data.append('form_type', formData.form_type);
console.log('data',data);

      const response = await axiosClient.post('/query/create_query', data);
      console.log(response.data);

      if (response.status===200) {
        toast.success('Form submitted successfully');
        setTimeout(() => {
          navigate('/'); // Reload the page
        }, 1000);
      } else {
        const errorBody = await response.text();
        console.error('Failed to submit form:', errorBody);
        toast.error('Failed to submit form. Try with a different phone number');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to submit form. Try with a different phone number');
    }
  };
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Query Box</h1>
        <div className="bg-white shadow-md rounded flex justify-center">
          <form
            onSubmit={handleSendOtp}
            className="px-8 pt-6 pb-8 mb-4 flex justify-start flex-wrap gap-7 w-[51vw]"
          >
            <div className="flex flex-col w-full">
              <div className="flex flex-wrap gap-4">
                {formFields.map((field) => (
                  <div key={field.id} className="mb-4 w-80">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor={field.id}
                    >
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      id={field.id}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                        field.readOnly ? "bg-gray-100 cursor-not-allowed" : ""
                      }`}
                      placeholder={field.placeholder}
                      required={field.required}
                      readOnly={field.readOnly}
                    />
                  </div>
                ))}
              </div>
              <div>
                {!otpVerified ? (
                  <div className="flex items-center justify-end">
                    <button
                      type="submit"
                      className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      {isSending ? "Sending OTP..." : "Send OTP"}
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={handleSubmitQuery}
                      className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Submit
                    </button>
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
      {showOtpPopup && (
        <OtpPopup
          mobile={formData.mobile}
          onClose={(isVerified) => {
            setShowOtpPopup(false);
            setOtpVerified(isVerified); // Update otpVerified state
          }}
        />
      )}
      <ToastContainer />
      <Footer />
    </>
  );
};

export default QueryBox;
