import React from "react";
const Interaction=({product})=>{
    if (!product || Object.keys(product).length === 0) {
        return(
            <div className="mx-5 mt-5">No Information to show</div>
        )
    }
    return(
        <div className="mx-5">
            <span>Alcohol Interaction : </span><span>{product.alcohol_interaction}</span><br></br>
            <span>Kidney Interaction : </span><span>{product.kidney_interaction
}</span><br></br>
            <span>Driving Interaction : </span><span>{product.driving_interaction}</span><br></br>
            <span>Lactation Interaction : </span><span>{product.lactation_interaction}</span><br></br>
            <span>Liver Interaction : </span><span>{product.liver_interaction}</span><br></br>
            <span>Other Drugs Interaction : </span><span>{product.other_drugs_interaction
}</span><br></br>
            <span>Pregnancy Interaction : </span><span>{product.
pregnancy_interaction
}</span><br></br>
        </div>
    )
}
export default Interaction;