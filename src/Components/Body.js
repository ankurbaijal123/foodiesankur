import RestuarentCard from "./RestuarentCard";
import resList from "../utils/mockData";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";

const Body = () => {
  const [listOfRestuarents, setListOfRestuarents] = useState([]);
  const [filteredRestuarents, setFilteredRestuarents] = useState([]);
  const [searchtext, Setsearchtext] = useState("");
  const[btnName, setFilterBtn] = useState("Top Rated Restuarant");

  //When ever state variable updates, react re renders the component
  // Fetching data from API using Fetch with async await
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=26.854995974193432&lng=80.99844921380281&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    // Extracting the restaurant list from swiiigggy data
    const restaurants =
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants;

    if (restaurants) {
      setListOfRestuarents(restaurants);
      setFilteredRestuarents(restaurants);
      console.log(filteredRestuarents);
    } else {
      console.error("Failed to fetch restaurant list");
    }
  };

  // Contidional Rendering

  return listOfRestuarents.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="search-container">
        <div className="search">
          <input
            type="text"
            className="search-bar"
            placeholder="Search for restaurants..."
            value={searchtext}
            onChange={(e) => {
              Setsearchtext(e.target.value);
            }}
          />
          <button
            className="search-button"
            onClick={() => {
              const searched = listOfRestuarents.filter((restaurant) =>
                restaurant.info.name
                  .toLowerCase()
                  .includes(searchtext.toLowerCase())
              );
              if (searched.length > 0) {
                setFilteredRestuarents(searched);
              } else {
                alert(`No restaurant found matching "${searchtext}"`);
              }
            }}
          >
            Search
          </button>
        </div>
            <br />
        <button
          className="filter-btn"
          onClick={() => {
            const filteredList = listOfRestuarents.filter(
              (restaurant) => restaurant.info.avgRating > 4.3
            );

            if(btnName==="Top Rated Restuarant" ){
              setFilteredRestuarents(filteredList)
            setFilterBtn("Top Rated Restuarent   X")
            }else{
              setFilterBtn("Top Rated Restuarant")
            setFilteredRestuarents(listOfRestuarents)
            }
            
          }
        }
        
        >
        {btnName}
        </button>
      </div>

      {/* Restaurant Cards */}
      <div className="res-container">
        {filteredRestuarents.map((res) => (
          <RestuarentCard key={res.info.id} resData={res.info} />
        ))}
      </div>
    </div>
  );
};

export default Body;
