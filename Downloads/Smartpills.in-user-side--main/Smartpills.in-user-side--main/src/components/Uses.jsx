import React from "react";
const Uses=({product})=>{
    if (!product || Object.keys(product).length === 0) {
        return(
            <div className="mx-5 mt-5">No Information to show</div>
        )
    }
    return (
        <div className=" mx-5 mt-5">
            <div className="text-2xl font-semibold mb-5">Primary Use :</div>
            <div className="text-sm mx-5 mb-5">{product.primary_use}</div>
            <div className="text-2xl font-semibold mb-5">Detailed Uses :</div>
            <div className="text-sm mx-5 mb-5">{product.benefits}</div>
            <div className="text-2xl font-semibold mb-5">How to use {product.name} :</div>
            <div className="text-sm mx-5 mb-5">{product.how_to_use}</div>
        </div>
    )
}
export default Uses;