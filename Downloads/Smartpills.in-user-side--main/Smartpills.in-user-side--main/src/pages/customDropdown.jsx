// src/components/CustomDropdown.jsx
import React, { useState } from 'react';

const CustomDropdown = ({ options, selected, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        onSelect(option);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button
                onClick={toggleDropdown}
                className="w-full p-2 bg-white border border-gray-300 rounded-lg text-left focus:outline-none focus:ring focus:ring-orange-500"
            >
                {selected}
            </button>
            {isOpen && (
                <ul className="absolute w-full mt-1 bg-white border border-gray-300 rounded-lg z-10">
                    {options.map((option) => (
                        <li
                            key={option.object_id}
                            onClick={() => handleOptionClick(option.product_name)}
                            className="p-2 cursor-pointer hover:bg-yellow-100" // Optional: Add hover effect if desired
                        >
                            {option.product_name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CustomDropdown;
