import React, { useEffect, useState } from "react";
import Tablet from "./Tablet"; // Adjust the path as needed
import products from "./staticData"; // Import the static dataset
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Pricing = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [vendors, setVendors] = useState([]); // Initialize as an empty array
    const [filteredVendors, setFilteredVendors] = useState([]);

    useEffect(() => {
        // Ensure products is an array
        if (Array.isArray(products)) {
            setVendors(products);
        } else {
            console.error("Products is not an array:", products);
            toast.error("Failed to load products.");
        }
    }, []);

    useEffect(() => {
        // Filter vendors based on the search term
        if (Array.isArray(vendors)) {
            const results = vendors.filter(vendor =>
                vendor.product_name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredVendors(results);
        }
    }, [searchTerm, vendors]);

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold">Available Vendors</h1>
            <input
                type="text"
                placeholder="Search for a product..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border rounded-md p-2 mt-3 mb-5 w-full"
            />
            <div className="mt-5 space-y-4">
                {filteredVendors.length > 0 ? (
                    filteredVendors.map((vendor) => (
                        <Tablet
                            key={vendor.vendor_id} // Assuming vendor_id is unique
                            vendor={vendor}
                            name={vendor.product_name}
                            packaging={vendor.packaging}
                            quantity={vendor.available_quantity}
                            currency={vendor.currency}
                            prev={vendor.prev_price}
                            mrp={vendor.mrp}
                            save={vendor.discount_percentage} // Assuming discount_percentage exists
                        />
                    ))
                ) : (
                    <div>No products found for "{searchTerm}"</div>
                )}
            </div>
            <ToastContainer />
        </div>
    );
};

export default Pricing;
