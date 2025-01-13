import RestuarentCard from "./RestuarentCard";
import "../../index.css";
import resList from "../utils/mockData";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router";
import useOnlineStatus from "../utils/useOnlineStatus";
const Body = () => {
  const [listOfRestuarents, setListOfRestuarents] = useState([]);
  const [filteredRestuarents, setFilteredRestuarents] = useState([]);
  const [searchtext, Setsearchtext] = useState("");
  const [btnName, setFilterBtn] = useState("Top Rated Restuarant");

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
  const onlineStatus = useOnlineStatus();
  if (onlineStatus === false) {
    return <h1>Looks like you are Offline !! Grab a maagie till then</h1>;
  }
  // Contidional Rendering

  return listOfRestuarents.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="search-container w-full max-w-4xl">
        <div className="search m-4 p-4 gap-4 items-center">
          <input
            type="text"
            className="search-bar w-full p-2 m-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            placeholder="Search for restaurants..."
            value={searchtext}
            onChange={(e) => {
              Setsearchtext(e.target.value);
            }}
          />
          <button
            className="search-button px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-gray-200"
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
            Search 🔎
          </button>
        </div>
        <br />
        <button
          className="filter-btn px-4 py-2 mx-10 bg-gray-500 text-white font-medium rounded-md hover:bg-gray-200"
          onClick={() => {
            const filteredList = listOfRestuarents.filter(
              (restaurant) => restaurant.info.avgRating > 4.3
            );

            if (btnName === "Top Rated Restuarant") {
              setFilteredRestuarents(filteredList);
              setFilterBtn("Top Rated Restuarant  ✖️");
            } else {
              setFilterBtn("Top Rated Restuarant");
              setFilteredRestuarents(listOfRestuarents);
            }
          }}
        >
          {btnName}
        </button>
      </div>

      {/* Restaurant Cards are given data*/}
      <div className="res-container">
        {filteredRestuarents.map((res) => (
          <Link to={"/restuarents/" + res.info.id}>
            <RestuarentCard key={res.info.id} resData={res.info} />{" "}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
