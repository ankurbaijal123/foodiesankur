import "../CSS/RestuarentMenu.css";
//import CDN_URL from "../utils/constant";
const RestuarentRecommend = ({resInfo}) =>{
    const food = resInfo.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.[2]?.card
      ?.card;
      
    const CDN_URL = "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/";

    return(
          <div className="recommended-food">
            <h3>{food.title}:</h3>
            <div className="recommended-scroll">
              {food?.itemCards?.map((item, id) => (
                <div key={id} className="recommended-item-wrapper">
                  
                  <div className="recommended-item">
                    <img
                      className="recommended-img"
                      src={CDN_URL + item?.card?.info.imageId}
                      alt={item.name}
                    />
                    <p>{item?.card?.info.name}</p>
                    <p>{item?.card?.info.price * 0.01} Rs.</p>
                    {item?.card?.info.ratings?.aggregatedRating?.rating && (
                      <p>{item?.card?.info.ratings.aggregatedRating.rating} Stars</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      };
      
      export default RestuarentRecommend;
      