import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import CDN_URL from "../utils/constant";
import "./CSS/RestuarentMenu.css";
import { useParams} from "react-router";
import useRestuarentMenu from "../utils/useRestuarentMenu";
import RestuarentOffers from "./Restuarents/RestuarentOffers";
import RestuarentCategories from "./Restuarents/RestuarentCateogies";
import RestuarentFood from "./Restuarents/RestuarentFood";

const RestuarentMenu = () => {
  const { resId } = useParams();
  const resInfo = useRestuarentMenu(resId);
  const [showIndex, setShowIndex] = useState(null);


  const dummy = "Dummy data";

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
        <h3 className="text-black-700 font-semibold">{locality}</h3>
        <h3 className="text-black-700 font-semibold">{city} 🙏</h3>
        <h4 className="text-black-700 font-semibold">{costForTwoMessage} 🥂</h4>
        <h4 className="text-black-700 font-semibold">Average Rating: {avgRating} ⭐</h4>
        <h4 className="text-black-700 font-semibold">Cuisines: {cuisines?.join(", ")} 🍜</h4>
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

      {/* lifting the state up and categories is made uncontrolled component */}
      <RestuarentFood resInfo={resInfo} /> 
      {
        categories.map((category, index)=>(
          <RestuarentCategories key={category.card.card.title} category={category?.card?.card} 
          showItems={index === showIndex ? true : false}
          setShowIndex={() => {
            showIndex !== index ? 
            setShowIndex(index) : setShowIndex(null)}}
            
          />
        ))
      }
    </div>
  );
};
export default RestuarentMenu;
