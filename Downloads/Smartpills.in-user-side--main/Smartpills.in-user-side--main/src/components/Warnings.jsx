import React from "react";
const Warnings=({product})=>{
    if (!product || Object.keys(product).length === 0) {
        return(
            <div className="mx-5 mt-5">No Information to show</div>
        )
    }
    return(
        <div className="mx-5 mt-5">{product.if_miss}        </div>
    )
}
export default Warnings;