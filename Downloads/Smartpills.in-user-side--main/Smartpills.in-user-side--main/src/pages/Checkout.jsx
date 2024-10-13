import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../components/AxiosClient"; // Adjust import if necessary
import noteContext from "../context/notes/noteContext"; // Assuming this is used for token expiry checks
import { ToastContainer, toast } from "react-toastify"; // For notifications

const Checkout = () => {
    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const { checkTokenExpiry } = useContext(noteContext);

    const getAuthConfig = () => {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token not found");
        checkTokenExpiry();
        return {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        };
    };

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const config = getAuthConfig();
                const response = await axiosClient.post("/cart/get_cart", null, config);
                if (response.status === 200) {
                    setCartItems(response.data.cart);
                } else {
                    throw new Error("Failed to fetch cart items");
                }
            } catch (error) {
                console.error("Error fetching cart items:", error);
                toast.error("Error fetching cart items");
            } finally {
                setIsLoading(false);
            }
        };

        fetchCartItems();
    }, []);

    const handlePlaceOrder = async () => {
        // Implement order placement logic here
        try {
            const config = getAuthConfig();
            const response = await axiosClient.post("/order/place_order", { items: cartItems }, config);
            if (response.status === 200) {
                toast.success("Order placed successfully!");
                navigate("/thank-you"); // Redirect to a thank-you page or similar
            } else {
                throw new Error("Failed to place order");
            }
        } catch (error) {
            console.error("Error placing order:", error);
            toast.error("Error placing order");
        }
    };

    return (
        <div className="container mx-auto py-4">
            <h2 className="text-2xl font-bold mb-4">Checkout</h2>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <>
                    {cartItems.length === 0 ? (
                        <div>Your cart is empty. Please add items to your cart before checkout.</div>
                    ) : (
                        <div>
                            {cartItems.map((item) => (
                                <div key={item.product_main_id} className="flex justify-between items-center bg-gray-200 p-3 mb-2 rounded">
                                    <div>
                                        <h3 className="font-bold">{item.name}</h3>
                                        <p>Quantity: {item.quantity}</p>
                                        <p>Price: ₹{item.mrp}</p>
                                    </div>
                                </div>
                            ))}
                            <button onClick={handlePlaceOrder} className="bg-green-500 text-white px-4 py-2 rounded">
                                Place Order
                            </button>
                        </div>
                    )}
                </>
            )}
            <ToastContainer />
        </div>
    );
};

export default Checkout;
