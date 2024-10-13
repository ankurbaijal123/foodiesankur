import React, { useContext } from "react";
import axiosClient from "./AxiosClient"; // Your Axios instance
import { toast } from "react-toastify";
import noteContext from "../context/notes/noteContext";
import { BsCartPlus } from "react-icons/bs"; // Ensure this is imported

const AddToCartButton = ({ productId, productMainId, vendorId, token, updateCartCount }) => {
    const { checkTokenExpiry } = useContext(noteContext);

    const handleAddToCart = async () => {
        try {
            // Check if token is valid
            checkTokenExpiry();

            // Log the token being used for debugging
            console.log("Current token:", token);

            const formData = new FormData();
            formData.append("product_id", productId);
            formData.append("product_main_id", productMainId);
            formData.append("vendor_id", vendorId);
            formData.append("quantity", 1); // Set initial quantity to 1

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`, // Include token in headers
                    "Content-Type": "multipart/form-data",
                },
            };

            console.log("Making request to add item to cart with token:", token); // Log the token being used
            const response = await axiosClient.post(`/cart/add_cart`, formData, config);
            
            // Check if the response is successful
            if (response.status === 200) {
                toast.success("Item added to cart successfully!");
                updateCartCount(); // Update cart count after adding item
            } else {
                toast.error("Failed to add item to cart.");
            }
        } catch (error) {
            console.error("Error adding item to cart:", error);
            if (error.response) {
                console.error("Response data:", error.response.data);
                console.error("Response status:", error.response.status);
                console.error("Response headers:", error.response.headers);
                // Display detailed error message
                toast.error(`Error: ${error.response.data.detail || "An error occurred while adding to cart."}`);
            } else {
                toast.error("An unexpected error occurred.");
            }
        }
    };

    return (
        <div onClick={handleAddToCart} className="cursor-pointer flex items-center">
            <BsCartPlus className="text-green-500" size={24} /> {/* Cart icon */}
        </div>
    );
};

export default AddToCartButton;
