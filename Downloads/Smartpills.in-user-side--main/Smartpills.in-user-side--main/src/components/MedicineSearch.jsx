import React, { useState, useEffect, useCallback,useContext } from 'react';
import { IoLocation } from 'react-icons/io5';
import debounce from 'lodash.debounce';
import axiosClient from './AxiosClient';
import { useNavigate } from 'react-router-dom';
import noteContext from "../context/notes/noteContext"
const MedicineSearch = ({ pin , setPin, handle_pincode, handlepin ,pinsetting}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [popularSearches, setPopularSearches] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedItemIndex, setSelectedItemIndex] = useState(null);
    const [error, setError] = useState(null);
    const [isNewComponentOpen, setIsNewComponentOpen] = useState(false);
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

                const names = response.data?.data?.flat()?.map(item => ({ name: item.name, id: item._id })) || [];
                setSearchResults(names);
                console.log(names, "names-==-=-=-")
                setLoading(false);
            } catch (error) {
                if(error.response.status===401){
                    navigate("/sigup")
                }
                console.error('Error searching products:', error);
                setLoading(false);
                setError('Error fetching search results');
            }
        }, 300),
        []
    );

    const handleInputChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        setError(null); // Clear error message when input changes
        fetchSearchResults(query);
    };

    useEffect(() => {
        const fetchPopularSearches = async () => {
            try {
                const response = await axiosClient.post("/products/get_popular_searches", null);
                console.log('Popular searches fetched.');
                setPopularSearches(response.data.data || []);
            } catch (error) {
                console.error("Error fetching popular searches:", error);
            }
        };
        fetchPopularSearches();
    }, []);

    const handleSelectItem = (index, name) => {
        setSelectedItemIndex(index);
        setSearchQuery(name); // Set the selected medicine name in the input box
        console.log('Selected product id:', name);
    };

    const handleFindLowestPrice = () => {
        if (selectedItemIndex === null) {
            setError('Please select a medicine first.');
        } else {
            const selectedMedicineId = searchResults[selectedItemIndex].id;
            const selectedMedicineName = searchResults[selectedItemIndex].name;
            navigate(`/tablet-info?id=${selectedMedicineId}&name=${selectedMedicineName}&pincode=${pin}`);
        }
    };

    const changepincode=()=>{
        localStorage.removeItem("PIN")
        setPin("")
        setIsNewComponentOpen(!isNewComponentOpen);

    }

    const handleSelectPopularSearch = (productId, productName) => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('Please log in.');
            return;
        }
        checkTokenExpiry();
        navigate(`/tablet-info?id=${productId}&name=${productName}&pincode=${pin}`)
    };

    return (
        <div className="mx-10 py-10">
             {pin=='' &&
                <div className="fixed z-50 flex justify-center items-center h-screen w-full">
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <div className="text-2xl font-semibold">
                            Set Your Location
                        </div>
                        <div className="text-sm font-semibold">
                            Find a location near you
                        </div>
                        <div className="flex bg-blue-500 text-white rounded-lg w-10/12 mx-auto py-2 mt-6 mb-2">
                            <div className="flex mx-auto">
                            <button onClick={handle_pincode}><IoLocation className="my-auto" /></button>
                                <div className="ml-2"><button onClick={handle_pincode}>Use my current location</button></div>
                            </div>
                        </div>
                        <div>Note: Your browser will ask permission first</div>
                        <div className="mx-auto w-max mt-3">OR</div>
                        <input type="text" placeholder="Enter PIN code" className="mt-4 p-2 pl-3 border rounded-lg w-full" onChange={handlepin}></input>
                        <p className="text-sm">*Enter a valid 6 digit pincode</p>
                        <button className="mt-4 bg-gradient-to-r font-semibold text-md from-orange-400 to-yellow-400 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full" onClick={pinsetting}>Set Location</button>
                    </div>
                </div>}
            <div className="flex my-2 text-white">
            <button onClick={changepincode}><IoLocation color="white" className="my-auto" fontSize='1.5rem'/></button>
                <div className="pincode text-2xl font-semibold"><button onClick={changepincode}> {pin}</button></div>
            </div>
            <div className="bg-black bg-opacity-50 rounded-lg" style={{ border: "2px solid white" }}>
                <div className="flex justify-between bg-white">
                    <input
                        placeholder="Type your medicine name"
                        value={searchQuery}
                        onChange={handleInputChange}
                        className="w-2/3 pl-20 focus:outline-none"
                    />
                    <button
                        onClick={handleFindLowestPrice}
                        className="bg-gradient-to-r from-orange-400 to-yellow-400 xl:px-20 py-5 mr-2 mt-2 rounded-lg mb-2 text-white text-xl font-semibold w-1/3"
                    >
                        Find Lowest Price
                    </button>
                </div>

                <div className="flex px-20 py-5">
                    <div className="text-white py-2">Popular Searches : </div>
                    <div>
                        {popularSearches[0] != undefined && popularSearches[0].map((search, index) => (
                            <button
                                key={index}
                                onClick={() => handleSelectPopularSearch(search.product_id, search.product_name)}
                                className="bg-white mx-3 rounded-md px-2 text-gray-500 py-2"
                            >
                                {search.product_name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            {loading && <p className="text-gray-700 mt-2 absolute">Fetching results...</p>}
            {error && <p className="text-red-500 mt-2 absolute">{error}</p>}
            {searchResults.length > 0 && (
                <div className="bg-white p-4 mt-2 rounded-lg shadow-lg absolute" style={{ maxHeight: "300px", overflowY: "auto" }}>
                    <h3 className="text-lg cursor-pointer font-semibold mb-2">Search Results:</h3>
                    <ul>
                        {searchResults.map((item, index) => (
                            <li key={index} className={`text-gray-700 ${selectedItemIndex === index ? 'bg-orange-100' : ''}`} onClick={() => handleSelectItem(index, item.name)}>
                                {item.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default MedicineSearch;
