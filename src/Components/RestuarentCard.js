import CDN_URL from "../utils/constant";
//import "../../index.css"

export const RestuarentCard = (props) =>{ /* destructuring on the fly  ---> insted of props written we pass the arguments, react wrap 
    them inside a object and pass them to fucntion*/
    /*this destructuring is javascriptc*/
    const { resData } = props;  
    
      return(
          <div className="res-card">
          <img className="res-logo" src={CDN_URL + resData.cloudinaryImageId } alt="logo-res" />
              <h2>{resData.name}</h2>
              <h4>{resData.cuisines.join(', ')}</h4>
              <h4>{resData.avgRating} ⭐</h4>
              <h4>{resData.costForTwo} </h4>
              <h4>{resData.sla.deliveryTime} minutes 🚚</h4>
              
            
          </div>
      )/*  <h4>{resData.isOpen ? "Open Now" : "Closed"}</h4> */
  }



  //Higher order Component 
  // input ===> Restuarent Card ===> Open or not
  export const openornot= (RestuarentCard) =>{
    return (props) => {
        return( 
            <>
            <label className="absolute bg-black text-white m-1 p-1 rounded-lg">
    Open Now </label>
            <RestuarentCard {...props}/>
            </>
        ) 
    }
  }

  export default RestuarentCard;