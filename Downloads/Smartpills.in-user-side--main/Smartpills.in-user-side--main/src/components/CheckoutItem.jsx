import { useEffect, useState ,useContext} from "react";
import axiosClient from "../components/AxiosClient"; // Assuming AxiosClient is set up
import { toast } from "react-toastify"; // Assuming you're using react-toastify
import noteContext from "../context/notes/noteContext";
const CheckoutComponent = (props) => {
    const [qty, setQty] = useState(0);
    const [prescriptionFile, setPrescriptionFile] = useState(null);
    const {checkTokenExpiry} = useContext(noteContext)

    // Function to increase quantity
    const increaseQty = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("Token not found");
            }
            checkTokenExpiry();
            const formData = new FormData();
            formData.append("product_main_id", props.id);

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            };

            const response = await axiosClient.post(`/cart/increment_quantity`, formData, config);

            if (response.status === 200) {
                setQty((prevQty) => Math.floor(prevQty + 1));  // Ensure it's an integer
                toast.success("Quantity increased");
            } else {
                throw new Error("Failed to increase quantity");
            }
        } catch (error) {
            console.error("Error incrementing quantity:", error);
            toast.error("Error incrementing quantity");
        }
    };

    // Function to decrease quantity but not below one
    const decreaseQty = async () => {
        if (qty > 1) {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    throw new Error("Token not found");
                }
                checkTokenExpiry();
                const formData = new FormData();
                formData.append("product_main_id", props.id);

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                };

                const response = await axiosClient.post(`/cart/decrement_quantity`, formData, config);

                if (response.status === 200) {
                    setQty((prevQty) => Math.floor(prevQty - 1));  // Ensure it's an integer
                    toast.success("Quantity decreased");
                } else {
                    throw new Error("Failed to decrease quantity");
                }
            } catch (error) {
                console.error("Error decrementing quantity:", error);
                toast.error("Error decrementing quantity");
            }
        }
    };

    // Function to handle removal of the item
    const handleRemove = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("Token not found");
            }
            checkTokenExpiry();
            const formData = new FormData();
            formData.append("product_main_id", props.id);

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            };

            const response = await axiosClient.post(`/cart/delete_cart`, formData, config);

            if (response.status === 200) {
                props.onRemove(props.id);  // Pass item ID back to parent for removal
                toast.success("Item removed from cart");
            } else {
                throw new Error("Failed to remove item from cart");
            }
        } catch (error) {
            console.error("Error removing item from cart:", error);
            toast.error("Error removing item from cart");
        }
    };

    // Function to handle file change for prescription upload
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setPrescriptionFile(file);
            toast.success("Prescription file selected");
        }
    };

    useEffect(() => {
        if (Number.isInteger(props.qty)) {
            setQty(Math.floor(props.qty));  // Ensure initial qty is an integer
        }
    }, [props.qty]);

    return (
        <div className="bg-gray-200 p-4 rounded-lg mx-3 my-5">
            <div className="flex justify-between items-center mb-2">
                <div className="font-semibold text-lg">{props.title}</div>
                <div className="text-gray-700">Rs. {props.mrp}</div>
            </div>
            <div className="flex justify-between">
                <div className="flex items-center">
                    <div className="flex items-center">
                        <button
                            className="bg-gray-300 px-2 py-1 rounded-l hover:bg-gray-400"
                            onClick={decreaseQty}
                        >
                            -
                        </button>
                        <div className="px-4 py-2 border border-gray-300">{qty}</div>
                        <button
                            className="bg-gray-300 px-2 py-1 rounded-r hover:bg-gray-400"
                            onClick={increaseQty}
                        >
                            +
                        </button>
                    </div>

                    {/* Prescription Upload */}
                    {/* <label
                        htmlFor={`prescription-upload-${props.id}`}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ml-3 cursor-pointer"
                    >
                        Upload Prescription
                    </label>
                    <input
                        type="file"
                        id={`prescription-upload-${props.id}`}
                        className="hidden"
                        onChange={handleFileChange}
                    /> */}
                </div>
                <button
                    className="text-red-500 hover:underline ml-4"
                    onClick={handleRemove}
                >
                    REMOVE
                </button>
            </div>
        </div>
    );
};

export default CheckoutComponent;
