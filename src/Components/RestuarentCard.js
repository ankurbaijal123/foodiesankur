 import CDN_URL from "../utils/constant";

export const RestuarentCard = (props) =>{ /* destructuring on the fly  ---> insted of props written we pass the arguments, react wrap 
    them inside a object and pass them to fucntion*/
    /*this destructuring is javascriptc*/
    const { resData } = props;
  
    const{
      cloudinaryImageId,
      name,
      cuisines,
      avgRating,
      costForTwo,
      deliveryTime
    } = resData?.data;
      return(
          <div className="res-card">
          <img className="res-logo" src={CDN_URL + cloudinaryImageId } alt="logo-res" />
              <h3>{name}</h3>
              <h4>{cuisines.join(', ')}</h4>
              <h4>{avgRating} stars</h4>
              <h4>{costForTwo / 100} FOR TWO</h4>
              <h4>{deliveryTime} minutes</h4>
          </div>
      )
  }

  export default RestuarentCard;