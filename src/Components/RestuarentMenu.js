import { useEffect , useState} from "react";
import Shimmer from "./Shimmer";
import "./CSS/RestuarentMenu.css"

const RestuarentMenu = () =>{

    const[resInfo, setResInfo] = useState(null);


    useEffect(() =>{
        fetchmenu();
    }, [])

    const fetchmenu = async () => {
        
        const data = await fetch("https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=26.854995974193432&lng=80.99844921380281&restaurantId=58649&catalog_qa=undefined&submitAction=ENTER")
        const menu = await data.json();
        console.log(menu);  
        setResInfo(menu.data);
    }
    
    if(resInfo === null){
        return <Shimmer />
    }

    const {name, cusines, costForTwoMessage, avgRating, locality, city, cloudinaryImageId}
    = resInfo?.cards[2]?.card?.card?.info || {};
    
    const offers =
    resInfo?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.offers?.map(
      (off) => off.info
    ) || [];

    const {ittemCards} = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.map(
        (menuu) => menuu.card.card
    )


    return (
        <div className="menu">
        <h1>{name}</h1>
        <h3>{locality}</h3>
        <h3>{city}</h3>
        <h4>{costForTwoMessage}</h4>
        <h4>{avgRating}</h4>
        <h4>{cusines?.join (", ")}</h4>
        <div className="offers-section">
        <h5>Special Offers:</h5>
        <ul className="offers-list">
            {offers.map((offer, index) => (
            <li key={index}>
                <strong>{offer.header}</strong>
                <span>    - Coupon Code: <code>{offer.couponCode}</code></span>
            </li>
            ))}
        </ul>

        <h3>Menu:</h3>
        <h4>ittemCards</h4>
        </div>



        <ul>
        <li>Biryani</li>
        <li>Idli</li>
        <li>Dosa</li>
        <li>Chole Bhat ure</li>
        </ul>
        </div>
    )
}
export default RestuarentMenu;