import CDN_URL from "../../utils/constant";
import "../../../index.css";
import Restuarent_ItemList from "./Restuarent_ItemList";
import { useState } from "react";
const RestuarentCategories = ({ category, showItems , setShowIndex}) => {

  const handleClick = () =>{
    setShowIndex(); 
  }


  return (
    <>
      {/* Accordian Header */}
    
      <div className="w-6/12 mx-auto my-4 bg-gray-50 shadow-lg p-4 cursor-pointer" >
        <div className="flex justify-between items-center" onClick={handleClick}>
          <span className="font-bold text-lg" >
            {category.title} ({category.itemCards.length})
          </span>
          <span>⬇️</span>
        </div>

        {/* Accordion Body */}
        <div className="mt-4">
          {showItems && <Restuarent_ItemList items={category.itemCards} /> }
        </div>
      </div>
    </>
  );
};

export default RestuarentCategories;
