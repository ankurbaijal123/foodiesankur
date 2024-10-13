import React, { useContext } from "react";
import axiosClient from "./AxiosClient";  // Assume this is your Axios instance
import { toast } from "react-toastify";
import noteContext from "../context/notes/noteContext";
const AddToCartButton = ({ productId, productMainId, vendorId, token }) => {
    const {checkTokenExpiry} = useContext(noteContext)
    const handleAddToCart = async () => {
        try {
            checkTokenExpiry();
            const formData = new FormData();
            formData.append("product_id", productId);
            formData.append("product_main_id", productMainId);
            formData.append("vendor_id", vendorId);
            formData.append("quantity", 1); // Set initial quantity to 1

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            };

            const response = await axiosClient.post(`/cart/add_cart`, formData, config);
            toast.success(response.data.message);
        } catch (error) {
            console.error("Error adding item to cart:", error);
            toast.error("Error adding item to cart");
        }
    };

    return (
        <button className="text-white rounded-md bg-gradient-to-r from-orange-400 to-yellow-400 px-2 py-2 my-2 ml-2"
            onClick={handleAddToCart}>
            Add to Cart
        </button>
    );
};

export default AddToCartButton;
