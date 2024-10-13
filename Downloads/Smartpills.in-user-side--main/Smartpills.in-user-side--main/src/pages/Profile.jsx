import React, { useEffect, useState ,useContext} from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axiosClient from "../components/AxiosClient"; // Adjust the import based on your file structure
import { toast } from "react-toastify"; // Optional, if you want to show notifications
import noteContext from "../context/notes/noteContext";
const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const {checkTokenExpiry} = useContext(noteContext)
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    throw new Error("Token not found");
                }
                checkTokenExpiry();
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const response = await axiosClient.post("/users/userdata", null, config);

                if (response.status === 200) {
                    setUser(response.data.data[0]);
                } else {
                    throw new Error("Failed to fetch user data");
                }
            } catch (err) {
                console.error("Error fetching user data:", err);
                setError(err.message);
                toast.error("Error fetching user data");
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
    return (
        <div>
            <Navbar />
            <div className="text-center font-semibold text-2xl mt-5">
                My Profile
            </div>
            {user && (
                <>
                    <div className="flex w-6/12 mx-auto shadow-lg rounded-md px-5 py-2 mt-5 mb-10">
                        <div className="w-1/2">Name</div>
                        <div className="w-1/2">{user.name}</div>
                    </div>
                    <div className="flex w-6/12 mx-auto shadow-lg rounded-md px-5 py-2 mt-5 mb-10">
                        <div className="w-1/2">Email</div>
                        <div className="w-1/2">{user.email}</div>
                    </div>
                    <div className="flex w-6/12 mx-auto shadow-lg rounded-md px-5 py-2 mt-5 mb-10">
                        <div className="w-1/2">Phone Number</div>
                        <div className="w-1/2">{user.mobile}</div>
                    </div>
                    {user.subscription==true &&
                    <div className="flex w-6/12 mx-auto shadow-lg rounded-md px-5 py-2 mt-5 mb-5">
                        <div className="w-1/2">Subscription</div>
                        <div className="w-1/2">You have bought a subscription plan</div>
                    </div>}
                </>
            )}
            <Footer />
        </div>
    );
};

export default Profile;
