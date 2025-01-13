import CDN_URL from "../utils/constant";
import "../../index.css"
export const RestuarentCard = (props) =>{ /* destructuring on the fly  ---> insted of props written we pass the arguments, react wrap 
    them inside a object and pass them to fucntion*/
    /*this destructuring is javascriptc*/
    const { resData } = props;
  
      return(
          <div className="res-card">
          <img className="res-logo" src={CDN_URL + resData.cloudinaryImageId } alt="logo-res" />
              <h3>{resData.name}</h3>
              <h4>{resData.cuisines.join(', ')}</h4>
              <h4>{resData.avgRating} ⭐</h4>
              <h4>{resData.costForTwo}</h4>
              <h4>{resData.sla.deliveryTime} minutes 🚚</h4>
          </div>
      )
  }

  export default RestuarentCard;