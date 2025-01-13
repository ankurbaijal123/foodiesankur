import CDN_URL from "../../utils/constant";
import "../../../index.css";

const RestuarentFood = ({ resInfo }) => {
  const itemCards =
    resInfo.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.[1]?.card?.card;

  const items = itemCards?.itemCards || itemCards?.itemCards?.card || itemCards?.carousel;

  if (!items || items.length === 0) {
    return <p>No items available to display.</p>;
  }

  return (
    <div className="restaurant-food">
      <h3>More Items:</h3>
      <div className="recommended-scroll">
        {items.map((item, index) => {
          const imageId = item.dish?.info?.imageId || item.card?.info?.imageId;
          const name = item.dish?.info?.name || item.card?.info?.name || "Unnamed Item";
          const price = (item.dish?.info?.price || item.card?.info?.price || 0) * 0.01;

          return (
            <div key={index} className="recommended-item-wrapper">
              <div className="recommended-item">
                <img
                  className="recommended-img"
                  src={CDN_URL + imageId}
                  alt={name}
                />
                <p>{name}</p>
                <p>{price.toFixed(2)} Rs.</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RestuarentFood;
