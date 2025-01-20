import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import CDN_URL from "../utils/constant";
import "./CSS/RestuarentMenu.css";
import { useParams } from "react-router";
import useRestuarentMenu from "../utils/useRestuarentMenu";
import RestuarentOffers from "./Restuarents/RestuarentOffers";
import RestuarentCategories from "./Restuarents/RestuarentCateogies";
import RestuarentFood from "./Restuarents/RestuarentFood";

const RestuarentMenu = () => {
  const { resId } = useParams();
  const resInfo = useRestuarentMenu(resId);

  if (resInfo === null) {
    return <Shimmer />;
  }
  
  console.log(resInfo)

  const {
    name,
    cuisines,
    costForTwoMessage,
    avgRating,
    locality,
    city,
    cloudinaryImageId,
  } = resInfo?.cards[2]?.card?.card?.info || {};


  const categories = resInfo.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
    categoryCard => categoryCard?.card?.card?.["@type"] ===  "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
  ) || [];
   

  return (
    <div className="restaurant-details">
    <div className="details"> 
      <div className="texr">
        <h1 className="font-bold my-4 text-2xl">{name}</h1>
        <h3>{locality}</h3>
        <h3>{city} </h3>
        <h4>{costForTwoMessage}</h4>
        <h4>Average Rating: {avgRating} ⭐</h4>
        <h4>Cuisines: {cuisines?.join(", ")} 🍜</h4>
      </div>
        
        <div className="image-container">
          <img
            src={CDN_URL + cloudinaryImageId}
            alt="Restaurant"
            className="restaurant-image"
          />
        </div>
      </div>
      <RestuarentOffers resInfor={resInfo} />
      <RestuarentFood resInfo={resInfo} /> 
      {
        categories.map((category)=>(
          <RestuarentCategories key={category.card.card.title} category={category?.card?.card} />
        ))
      }
    </div>
  );
};
export default RestuarentMenu;
