import RestuarentCard from "./RestuarentCard";
import resList from "../utils/mockData";
const Body = () => {
    return (
      <div className="body">
        <div className="filter">
        <button className="filter-btn">Top Rated Restuarent</button></div>
        <div className="res-container">
        {resList.map((restaurant) => (
          <RestuarentCard key ={restaurant.data.id }  resData ={restaurant}/>
        ))}
        </div> 
      </div>
    );
  };
  export default Body;