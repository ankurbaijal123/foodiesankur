import React, { useState, useEffect, useCallback,useContext } from 'react';
import { IoSearch } from "react-icons/io5";
import axiosClient from './AxiosClient';
import debounce from 'lodash.debounce';
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/noteContext';
const SearchNavbar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [show,setShow]=useState(true);
    const pin = localStorage.getItem('PIN');
    const navigate = useNavigate();
    const {checkTokenExpiry} = useContext(noteContext)
    const fetchSearchResults = useCallback(
        debounce(async (query) => {
            if (!query) return;
            const token = localStorage.getItem('token');
            if (!token) {
                setError('You are not logged in.');
                setSearchResults([]);
                return;
            }
            try {
                setLoading(true);
                setError(null);
                checkTokenExpiry();
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                };

                const response = await axiosClient.post(
                    `/products/search_products/${query}`,
                    {},
                    config
                );

                console.log('Search response:', response.data);
                const names = response.data?.data?.flat()?.map(item => ({ name: item.name, id: item.id })) || [];
                setSearchResults(names);
                setLoading(false);
            } catch (error) {
                console.error('Error searching products:', error);
                setLoading(false);
                setError('Error fetching search results');
            }
        }, 300),
        []
    );

    const handleInputChange = (e) => {
        setShow(true);
        const query = e.target.value;
        setSearchQuery(query);
        fetchSearchResults(query);
    };

    const handleSearchItemClick = (id, name) => {
        const encodedName = encodeURIComponent(name);
        setShow(false);
        navigate(`/tablet-info?id=${id}&name=${encodedName}&pincode=${pin}`);
    };

    return (
        <>
            <div className="relative lg:flex bg-white w-6/12 my-2 hidden" style={{ marginLeft: "-50px" }}>
                <IoSearch fontSize="1.4rem" className="my-auto ml-5 absolute top-1/2 transform -translate-y-1/2" />
                <input 
                    placeholder="Type your medicine name" 
                    className="w-full ml-14 pl-6 pr-3 py-2 focus:outline-none rounded-lg" 
                    onChange={handleInputChange} 
                    value={searchQuery} 
                />
                <div className="absolute top-full mt-1">
                    {loading && <p className="text-gray-700 py-1 px-2 border-orange-400 rounded-md border-2 bg-white">Fetching results...</p>}
                    {error && <p className="text-red-500 bg-white py-1 px-4 border-orange-400 rounded-md border-2">{error}</p>}
                </div>
            </div>
            {searchResults.length > 0 && show && (
                <div className="absolute z-10 bg-white p-4 mt-14 ml-20 rounded-lg shadow-lg" style={{ maxHeight: "200px", overflowY: "auto" }}>
                    <ul>
                        {searchResults.map((item, index) => (
                            <li 
                                key={index} 
                                className="text-gray-700 cursor-pointer hover:bg-gray-200 p-2" 
                                onClick={() => handleSearchItemClick(item.id, item.name)}
                            >
                                {item.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
};

export default SearchNavbar;
