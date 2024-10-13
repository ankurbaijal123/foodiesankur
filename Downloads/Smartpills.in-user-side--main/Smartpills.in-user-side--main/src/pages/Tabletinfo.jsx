import React, { useState, useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Pricing from "../components/Pricing"; // Import Pricing component
import Drug from "../components/Drug"; // Import Drug component
import Interaction from "../components/Interaction"; // Import Interaction component
import Images from "../components/Images"; // Import Images component
import Uses from "../components/Uses"; // Import Uses component
import Warnings from "../components/Warnings"; // Import Warnings component
import SideEffects from "../components/Sideeffects"; // Import SideEffects component
import axiosClient from "../components/AxiosClient";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import noteContext from "../context/notes/noteContext";
import dafloImage from "../assets/daflon.jpg";

const Tabletinfo = () => {
  const [product, setProduct] = useState({});
  const [productId, setProductId] = useState("");
  const [pincode, setPincode] = useState("");
  const [token, setToken] = useState("");
  const [prodname, setName] = useState("");
  const [activeSection, setActiveSection] = useState("pricing");
  const location = useLocation();
  const { checkTokenExpiry } = useContext(noteContext);

  // Sample product data
  const sampleProductData = {
    name: "DAFLON 500 TAB",
    img: dafloImage, // Mock image URL
    medicine_type: "Tablet",
    packaging: "Strip of 10 tablets",
    salt_composition: "Diosmin (450mg) + Hesperidin (50mg)",
    product: {
      description: "Daflon 500mg is used in the treatment of varicose veins and venous insufficiency.",
    },
    price: 200,
    discount: 10,
    vendor: {
      vendor_id: "sampleVendor123",
      object_id: "sampleProduct456",
      pharmacy_name: "ABC Pharmacy",
      discount: 20,
      Mrp: 240,
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get("id");
    const pincodeParam = params.get("pincode");
    const name = decodeURIComponent(params.get("name"));
    const storedToken = localStorage.getItem("token");

    setProductId(id);
    setPincode(pincodeParam);
    setToken(storedToken);
    setName(name);

    // Use mock data if no product ID is found
    if (!id || !storedToken) {
      setProduct(sampleProductData); // Use mock data when no product ID is found
    } else {
      // Otherwise, fetch the actual product info
      getProductInfo(id, pincodeParam, storedToken, name);
    }
  }, [location.search]);

  const getProductInfo = async (productId, pincode, token, name) => {
    try {
      const formData = new FormData();
      formData.append("pincode", pincode);
      checkTokenExpiry();
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      const response = await axiosClient.post(
        `/products/get_product/${productId}?name=${name}`,
        formData,
        config
      );

      setProduct(response.data.data[0]);
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.status === 401) {
        toast.error("Unauthorized. Please log in again.");
      } else {
        toast.error("An error occurred while fetching product info.");
      }
    }
  };

  const handleAddToBookmark = async () => {
    try {
      checkTokenExpiry();
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axiosClient.post(
        `/bookmarks/add_bookmark/${productId}`,
        null,
        config
      );

      toast.success(response.data.message);
    } catch (error) {
      console.error("Error adding bookmark:", error);
      toast.error("Error adding bookmark");
    }
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  return (
    <>
      <Navbar />
      <div className="mx-5 pt-10 flex">
        <div className="bg-gray-200" style={{ width: "200px", height: "200px" }}>
          <img src={product.img || sampleProductData.img} className="mx-auto my-auto" alt={`${product.name || sampleProductData.name} medicine`} />
        </div>
        <div className="ml-5">
          <div className="text-3xl font-semibold">{product.name || sampleProductData.name}</div>
          <div>
            {product.medicine_type || sampleProductData.medicine_type} • {product.packaging || sampleProductData.packaging} • {product.salt_composition || sampleProductData.salt_composition}
          </div>
          <button
            className="text-white rounded-md bg-gradient-to-r from-orange-400 to-yellow-400 px-2 py-2 my-2"
            onClick={handleAddToBookmark}
          >
            Add to Bookmark
          </button>
          <div className="text-sm">
            {product.product?.description || sampleProductData.product.description}
          </div>
          <div className="text-lg font-bold mt-3">Price: ₹{product.price || sampleProductData.price}</div>
          
        </div>
      </div>

      {/* Options section */}
      <div className="bg-gradient-to-r from-orange-400 to-yellow-400 mt-5 flex justify-between text-white py-3 mx-5">
        <button className={`mx-5 ${activeSection === "pricing" ? "font-bold" : ""}`} onClick={() => handleSectionChange("pricing")}>
          Pricing
        </button>
        <button className={`mx-5 ${activeSection === "drug" ? "font-bold" : ""}`} onClick={() => handleSectionChange("drug")}>
          Drug Info
        </button>
        <button className={`mx-5 ${activeSection === "interaction" ? "font-bold" : ""}`} onClick={() => handleSectionChange("interaction")}>
          Interaction
        </button>
        <button className={`mx-5 ${activeSection === "images" ? "font-bold" : ""}`} onClick={() => handleSectionChange("images")}>
          Images
        </button>
        <button className={`mx-5 ${activeSection === "uses" ? "font-bold" : ""}`} onClick={() => handleSectionChange("uses")}>
          Uses
        </button>
        <button className={`mx-5 ${activeSection === "warnings" ? "font-bold" : ""}`} onClick={() => handleSectionChange("warnings")}>
          Warnings
        </button>
        <button className={`mx-5 ${activeSection === "sideEffects" ? "font-bold" : ""}`} onClick={() => handleSectionChange("sideEffects")}>
          Side Effects
        </button>
      </div>

      {/* Render content based on active section */}
      {activeSection === "pricing" && <Pricing product={product} productId={productId} pincode={pincode} token={token} />}
      {activeSection === "drug" && <Drug product={product} />}
      {activeSection === "interaction" && <Interaction product={product} />}
      {activeSection === "images" && <Images product={product} />}
      {activeSection === "uses" && <Uses product={product} />}
      {activeSection === "warnings" && <Warnings product={product} />}
      {activeSection === "sideEffects" && <SideEffects product={product} />}
      
      <Footer />
      <ToastContainer />
    </>
  );
};

export default Tabletinfo;
