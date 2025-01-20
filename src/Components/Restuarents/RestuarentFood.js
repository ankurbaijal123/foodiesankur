import CDN_URL from "../../utils/constant";
import "../../../index.css";

const RestuarentFood = ({ resInfo }) => {
  const itemCards =
    resInfo.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.[1]?.card?.card;

  const items = itemCards?.itemCards || itemCards?.itemCards?.card || itemCards?.carousel;

  if (!items || items.length === 0) {
    return <p>No items available to display.</p>;
  }
  console.log(items)

  return (
    <div className="restaurant-food">
      <h3>Recommended By Ankur 💙:</h3>
      <div className="recommended-scroll">
        {items.map((item, index) => {
          const imageId = item.dish?.info?.imageId || item.card?.info?.imageId;
          const name = item.dish?.info?.name || item.card?.info?.name || "Unnamed Item";
          const price = (item.dish?.info?.price ?  item.dish?.info?.price/100 : item.dish?.info?.defaultPrice/100) || (item.card?.info?.price ?  item.card?.info?.price/100 : item.card?.info?.defaultPrice/100)
          
   
          
          return (
            <div key={index} className="recommended-item-wrapper">
              <div className="recommended-item">
              <div className="recommended-img-container">
                <img
                  className="recommended-img"
                  src={CDN_URL + imageId}
                  alt={name}
                />
                </div>
                <p>{name}</p>
                <p>
                  {price ? `${price} Rs.` : null}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RestuarentFood;
