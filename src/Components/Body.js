import RestuarentCard from "./RestuarentCard";
import resList from "../utils/mockData"; 
import { useEffect , useState} from "react"; 


const Body = () => {
const [listOfRestuarents, setListOfRestuarents] = useState(resList);
    return (
      <div className="body">
        <div className="filter">
              <button
        className="filter-btn"
        onClick={() => {
          filteredList = listOfRestuarents.filter((restuarent) => 
            (restuarent.data.avgRating > 4)
          );
          setListOfRestuarents(filteredList)
        }}
        
      >
        Top Rated Restaurant
      </button>
      </div>
        <div className="res-container">
        {listOfRestuarents.map((restaurant) => (
          <RestuarentCard key ={restaurant.data.id }  resData ={restaurant}/>
        ))}
        </div> 
      </div>
    );
  };
  export default Body;