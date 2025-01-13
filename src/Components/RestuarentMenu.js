import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import CDN_URL from "../utils/constant";
import "./CSS/RestuarentMenu.css";
import { useParams } from "react-router";
import useRestuarentMenu from "../utils/useRestuarentMenu";
import RestuarentOffers from "./Restuarents/RestuarentOffers";
import RestuarentRecommend from "./Restuarents/RestuarentRecommend";
import RestuarentFood from "./Restuarents/RestuarentFood";

const RestuarentMenu = () => {
  const { resId } = useParams();
  const resInfo = useRestuarentMenu(resId);

  if (resInfo === null) {
    return <Shimmer />;
  }

  const {
    name,
    cuisines,
    costForTwoMessage,
    avgRating,
    locality,
    city,
    cloudinaryImageId,
  } = resInfo?.cards[2]?.card?.card?.info || {};

  console.log(resInfo.cards[2].card?.card?.info)

  return (
    <div className="restaurant-details">
    <div className="details"> 
      <div className="text-container">
        <h1><b>{name}</b></h1>
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
      <RestuarentRecommend resInfo={resInfo} />
      <RestuarentFood resInfo={resInfo} />
    </div>
  );
};
export default RestuarentMenu;
