import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import CDN_URL from "../utils/constant";
import "./CSS/RestuarentMenu.css";
import { useParams } from "react-router";
import { RES_URL } from "../utils/constant";

const RestuarentMenu = () => {
  const [resInfo, setResInfo] = useState(null);

  const { resId } = useParams();

  useEffect(() => {
    fetchmenu();
  }, []);

  const fetchmenu = async () => {
    const data = await fetch(RES_URL + resId);
    const menu = await data.json();
    console.log(menu);
    setResInfo(menu.data);
  };

  if (resInfo === null) {
    return <Shimmer />;
  }

  const {
    name,
    cusines,
    costForTwoMessage,
    avgRating,
    locality,
    city,
    cloudinaryImageId,
  } = resInfo?.cards[2]?.card?.card?.info || {};

  const offers =
    resInfo?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.offers?.map(
      (off) => off.info
    ) || [];

  console.log(resInfo);

  const itemCards =
    resInfo.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.[1]?.card?.card;

  const items = itemCards?.itemCards || itemCards?.itemCards?.card || itemCards?.carousel;
  items.map((item) => item.card?.info);

  const food =
    resInfo.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.[2]?.card
      ?.card;

  const mfood= resInfo?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.[3]?.card?.card
  const mmfood = mfood?.categories || mfood?.itemCards
  console.log(mfood);
  return (
    <div className="menu">
      <h1>{name}</h1>
      <h3>{locality}</h3>
      <h3>{city}</h3>
      <h4>{costForTwoMessage}</h4>
      <h4>{avgRating}</h4>
      <h4>{cusines?.join(", ")}</h4>
      <div className="offers-section">
        <h5>Special Offers:</h5>
        <ul className="offers-list">
          {offers.map((offer, index) => (
            <li key={index}>
              <strong>{offer.header}</strong>
              <span>
                {" "}
                - Coupon Code: <code>{offer.couponCode}</code>
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="recommended">
        <h3>Foods:</h3>
        <div className="recommended-scroll">
          {console.log(items)}
          {items.map((item) => {
            const imageId =
              item.dish?.info?.imageId || item.card?.info?.imageId;
            const name =
              item.dish?.info?.name || item.card?.info?.name || "Unnamed Item";
            const price =
              (item.dish?.info?.price || item.card?.info?.price || 0) * 0.01;

            return (
              <div className="recommended-item" key={item.id || name}>
                <img
                  className="recommended-img"
                  src={CDN_URL + imageId}
                  alt={name}
                />
                <p>{name}</p>
                <p>{price.toFixed(2)} Rs.</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="recommended">
        <h3>{food.title}:</h3>
        <div className="recommended-scroll">
          {food?.itemCards?.map((item, id) => (
            <div key={id}>
              <h3>{item.title}</h3> <br />
              <div className="recommended-item">
                <img
                  className="recommended-img"
                  src={CDN_URL + item?.card?.info.imageId}
                  alt={item.name}
                />
                <p>{item?.card?.info.name}</p>
                <p>{item?.card?.info.price * 0.01} Rs.</p>
                {item?.card?.info.ratings?.aggregatedRating?.rating && (
                  <p>
                    {item?.card?.info.ratings.aggregatedRating.rating} Stars
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="recommended">
  <h3>{mfood.title}:</h3>
  <div className="recommended">
    {mmfood?.map((item, id) => (
      <div key={id}>
        <h3>{item.title}</h3>
        <div className="recommended-scroll">
          {item?.itemCards?.map((data, index) => (
            <div className="recommended-item">
            <div className="recommended-item" key={index}>
              <img
                className="recommended-img"
                src={CDN_URL + (data?.card?.info?.imageId || '')}
                alt={data?.card?.info?.name || 'Image not available'}
              />
              <p>{data?.card?.info?.name || 'No name available'}</p>
              <p>
                {data?.card?.info?.price
                  ? `${data?.card?.info?.price * 0.01} Rs.`
                  : 'Price not available'}
              </p>
              {data?.card?.info?.ratings?.aggregatedRating?.rating && (
                <p>{data?.card?.info?.ratings?.aggregatedRating?.rating} Stars</p>
              )}
            </div>
            </div>
          ))}
        </div>
      </div>
    ))}
    {!(Array.isArray(mfood) && mfood.length > 0) && (
      <p></p>
    )}
  </div>
</div>


    </div>
  );
};
export default RestuarentMenu;
