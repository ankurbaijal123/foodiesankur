import React from "react";
import Question from "./Question";
const Drug = ({ product }) => {
    if (!product || Object.keys(product).length === 0) {
        return(
            <div className="mx-5 mt-5">No Information to show</div>
        )
    }
    
    return (
        <div className="mx-5 mt-5">
            <div className=" mb-5">
                <span>Salt Composition : </span><span>{product.salt_composition
                }</span><br></br>
                <div>{product.facts[0]}</div>
                <div>{product.facts[1]}</div>
                <div>{product.facts[2]}</div>
                <div>{product.facts[3]}</div>


                <br></br>
            </div>
            <Question
                question={`Is it safe to use ${product.name}?`}
                answer={`${product.introduction}`}
            />
            <Question question={`What should I tell my doctor starting treatment with ${product.name}?`} answer={`${product.safety_advice
                }`}></Question>
        </div>
    )
}
export default Drug;