import React, { useState,useContext } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosClient from "../components/AxiosClient";
import noteContext from "../context/notes/noteContext";
const Helplogin = () => {
  // Retrieve user email from localStorage
  const user = localStorage.getItem('user');
  const userObj = JSON.parse(user); // Convert the JSON string into an object
  const mail = userObj.email; // Extract the email property
  console.log(mail);
  const {checkTokenExpiry} = useContext(noteContext)
  // Initialize state with the user's email
  const [email, setEmail] = useState(mail);
  const [query, setQuery] = useState("");
  const [charCount, setCharCount] = useState(0);

  const handleQueryChange = (e) => {
    const input = e.target.value;
    if (input.length <= 300) {
      setQuery(input);
      setCharCount(input.length);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Retrieve token from localStorage
      const token = localStorage.getItem("token");

      // Check if token exists
      if (!token) {
        console.error("Token not found in localStorage.");
        return;
      }

      // Create FormData object
      checkTokenExpiry();
      const formData = new FormData();
      formData.append("email", email);
      formData.append("query_", query);

      // Send data to API
      const response = await axiosClient.post(
        "/help/create_request",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // Set content type to multipart/form-data
          },
        }
      );

      toast.success(response.data.message);
      // Reset form fields
      setEmail(mail);
      setQuery("");
      setCharCount(0);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="md:w-1/3 mx-auto my-10 w-11/12">
        <div className="font-bold text-2xl">Need Help?</div>
        <div className="text-sm my-5">
          Please let us know if you are unable to reset password, create a new
          account or not getting the OTP.
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">Enter Email ID :</div>
          <input
            className="w-full border-b-2 border-gray-300 px-2"
            placeholder="Enter your email here"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <textarea
            placeholder="Write your query here in maximum 300 words"
            className="w-full px-2 rounded-md border-2 border-gray-300 my-5"
            style={{ height: "100px" }}
            value={query}
            onChange={handleQueryChange}
          />
          <div className="text-right text-sm text-gray-500">
            {charCount}/300 characters
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-400 to-yellow-400 rounded-md py-2"
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

export default Helplogin;
