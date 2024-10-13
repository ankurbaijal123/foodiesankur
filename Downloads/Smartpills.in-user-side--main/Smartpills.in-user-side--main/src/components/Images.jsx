import React from "react";

const Images = ({ product }) => {
    if (!product || Object.keys(product).length === 0) {
        return(
            <div className="mx-5 mt-5">No Information to show</div>
        )
    }
    return (
        <div>
            {product.image ? (
                <img src={product.image} alt="Product" />
            ) : (
                <p>No images found</p>
            )}
        </div>
    );
};

export default Images;
