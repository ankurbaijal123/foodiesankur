import React, { useState, useEffect } from "react";
import { IoAdd, IoRemove, IoClose, IoPaperPlane } from "react-icons/io5"; // Import icon for the upload button
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import products from "./staticData";
import cartImage from "../assets/cart.jpeg";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [prescriptionFile, setPrescriptionFile] = useState(null);
  const [subtotal, setSubtotal] = useState(0);
  const [isCartVisible, setIsCartVisible] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const initialCartItems = products.map((product) => ({
      ...product,
      quantity: 1,
    }));
    setCartItems(initialCartItems);
  }, []);

  useEffect(() => {
    const total = cartItems.reduce(
      (sum, item) => sum + item.mrp * item.quantity,
      0
    );
    setSubtotal(total);
  }, [cartItems]);

  const handlePrescriptionChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPrescriptionFile(file);
      toast.success("Prescription uploaded successfully!");
    }
  };

  const handleRemovePrescription = () => {
    setPrescriptionFile(null);
    toast.success("Prescription removed successfully!");
  };

  const handleGetCoupon = () => {
    if (!prescriptionFile) {
      toast.error("Please upload a prescription before getting a coupon.");
      return;
    }
    navigate("/getCoupons");
  };

  const incrementQuantity = (object_id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.object_id === object_id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decrementQuantity = (object_id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.object_id === object_id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (object_id) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.object_id !== object_id)
    );
    toast.success("Item removed from cart");
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Function to close the cart
  const closeCart = () => {
    setIsCartVisible(false);
  };

  // Function to reload the page
  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <div className="relative">
      {isCartVisible && (
        <div className="absolute top-1 right-5 bg-gradient-to-r from-orange-400 to-yellow-500 shadow-lg rounded-md p-4 w-80 z-50">
          <img
            src={cartImage}
            alt="Cart"
            className="mb-2 w-24 h-24 rounded-md mx-auto"
          />
          <h2 className="text-lg font-bold mb-2 text-white text-center">
            Cart Items ({totalItems})
          </h2>
          {cartItems.length === 0 ? (
            <div className="text-white text-center">Your cart is empty</div>
          ) : (
            <div className="overflow-auto max-h-60">
              {cartItems.map((item) => (
                <div
                  key={item.object_id}
                  className="flex justify-between items-center bg-white p-2 mb-2 rounded shadow-sm border border-black"
                >
                  <div>
                    <h3 className="font-bold">{item.product_name}</h3>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: ₹{item.mrp * item.quantity}</p>
                  </div>
                  <div className="flex items-center">
                    <button
                      className="mx-1 bg-yellow-300 rounded p-2 transition duration-300 hover:bg-orange-400 flex items-center justify-center w-8 h-8"
                      onClick={() => incrementQuantity(item.object_id)}
                    >
                      <IoAdd />
                    </button>
                    <button
                      className="mx-1 bg-yellow-300 rounded p-2 transition duration-300 hover:bg-orange-400 flex items-center justify-center w-8 h-8"
                      onClick={() => decrementQuantity(item.object_id)}
                    >
                      <IoRemove />
                    </button>
                    <button
                      className="mx-1 bg-red-200 text-red-500 transition duration-300 hover:bg-orange-400 flex items-center justify-center w-8 h-8"
                      onClick={() => removeItem(item.object_id)}
                    >
                      <IoClose />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="flex justify-between mt-4 p-2 bg-white border border-gray-300 rounded-md shadow-sm">
            <h3 className="font-bold text-black">Subtotal:</h3>
            <h3 className="font-bold text-orange-500 text-xl">₹{subtotal}</h3>
          </div>

          <div className="mt-4 text-center">
            {" "}
            {/* Center align the section */}
            <h3 className="font-bold mb-2 text-white">
              <u>Upload Prescription </u>
            </h3>
            <div className="flex justify-center">
              {" "}
              {/* Center align the file input */}
              <input
                type="file"
                id="file-upload"
                onChange={handlePrescriptionChange}
                accept="image/*,.pdf"
                className="hidden" // Hide the default input
              />
              <label
                htmlFor="file-upload"
                className="flex items-center cursor-pointer bg-white border border-gray-300 rounded-md px-4 py-2"
              >
                <IoPaperPlane className="mr-2 text-gray-500" />{" "}
                {/* Upload icon */}
                <span className="text-gray-500">Choose File</span>
              </label>
            </div>
            {prescriptionFile && (
              <div className="flex items-center mt-1 justify-center">
                {" "}
                {/* Center align the remove button */}
                <span className="text-white">{prescriptionFile.name}</span>
                <button
                  onClick={handleRemovePrescription}
                  className="text-red-500 ml-2"
                >
                  Remove
                </button>
              </div>
            )}
            <div className="flex justify-between mt-4">
    <button
        onClick={() => {
            closeCart();
            reloadPage(); // Close the cart and reload the page
        }}
        className="mt-2 w-32 px-2 py-1 rounded-md bg-white border border-white text-black transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-orange-500 hover:ring-2 hover:ring-orange-500" // Set a fixed width and add glow effect
    >
        CLOSE
    </button>
    <button
        onClick={handleGetCoupon}
        className={`mt-2 w-32 px-2 py-1 rounded-md transition duration-300 ease-in-out transform ${
            prescriptionFile
                ? "bg-white border border-white text-black hover:scale-105 hover:shadow-lg hover:shadow-orange-500 hover:ring-2 hover:ring-orange-500"
                : "bg-gray-400 cursor-not-allowed text-white"
        }`} // Same fixed width and glow effect
        disabled={!prescriptionFile}
    >
        GET COUPON
    </button>
</div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
