import React, { useState, useEffect,useContext } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axiosClient from "../components/AxiosClient";
import noteContext from "../context/notes/noteContext";
const Bookmarks = () => {
    const [bookmarks, setBookmarks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [bookmarkToDelete, setBookmarkToDelete] = useState(null);
    const {checkTokenExpiry} = useContext(noteContext)
    useEffect(() => {
        const user = localStorage.getItem('token');
        if (user) {
            setIsLoggedIn(true);
            fetchBookmarks();
        } else {
            setIsLoading(false);
        }
    }, []);

    const fetchBookmarks = async () => {
        try {
            const token = localStorage.getItem('token');
            checkTokenExpiry();
            const response = await axiosClient.post("/bookmarks/get_bookmarked_products", null, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log(response.data.data); // Verify the structure of response.data.data

            // Set bookmarks to response.data.data[0].bookmarked_products if it's available
            const bookmarksData = response.data.data[0];
            const bookmarksArray = bookmarksData ? bookmarksData.bookmarked_products || [] : [];
            setBookmarks(bookmarksArray);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching bookmarks:", error);
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token');
            checkTokenExpiry();
            const formData = new FormData();
            formData.append("id", id);

            await axiosClient.post(`/bookmarks/delete_bookmark/${id}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            // Refetch bookmarks after deletion
            fetchBookmarks();
        } catch (error) {
            console.error("Error deleting bookmark:", error);
        }
    };

    const confirmDelete = (id) => {
        setBookmarkToDelete(id);
        setShowPopup(true);
    };

    const handleConfirmDelete = () => {
        handleDelete(bookmarkToDelete);
        setShowPopup(false);
    };

    return (
        <>
            <Navbar />
            <div className="my-20 text-center">
                <div className="text-3xl font-semibold mb-6">My Bookmarks</div>
                {isLoggedIn ? (
                    isLoading ? (
                        <div>Loading...</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
                            {Array.isArray(bookmarks) && bookmarks.length === 0 ? (
                                <div className="col-span-full">Nothing bookmarked yet.</div>
                            ) : (
                                bookmarks.map((bookmark, index) => (
                                    <div key={index} className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-start">
                                        <div className="text-xl font-bold mb-2">{bookmark.name}</div>
                                        <div className="text-gray-600 mb-4">{bookmark.packaging}</div>
                                        <button
                                            className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded hover:from-yellow-500 hover:to-orange-600"
                                            onClick={() => confirmDelete(bookmark.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    )
                ) : (
                    <div>Please log in to view bookmarks.</div>
                )}
            </div>
            <Footer />

            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <div className="text-lg mb-4">Are you sure you want to delete this bookmark?</div>
                        <div className="flex justify-end">
                            <button
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
                                onClick={() => setShowPopup(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-gradient-to-r from-yellow-400 to-orange-500  text-white px-4 py-2 rounded"
                                onClick={handleConfirmDelete}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Bookmarks;
