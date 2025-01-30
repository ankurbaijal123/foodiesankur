import { useState } from "react";

const Checkout = () => {
  const [address, setAddress] = useState(""); // State to store address
  const totalPrice = 500; // Replace with your actual totalPrice calculation

  const handlePlaceOrder = () => {
    if (address.trim() === "") {
      alert("Please enter a valid address!");
      return;
    }
    alert(`Your order will be delivered at ${address}. Please keep ₹${totalPrice} ready.`);
    setAddress(""); // Clear the address input after placing the order
  };

  return (
    <div className="bg-gray-100">
      <div className="text-center m-4 p-4">
        <h2 className="text-2xl font-bold">Checkout</h2>
        <div className="w-6/12 m-auto">
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your address"
            className="w-full p-2 mb-4 border rounded-lg"
          />
          <button
            onClick={handlePlaceOrder}
            className="p-2 bg-blue-500 text-white rounded-lg"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
