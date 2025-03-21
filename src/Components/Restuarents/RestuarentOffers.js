// import "../CSS/RestuarentMenu.css";
// import "../../../index.css"
const RestuarentOffers= ({resInfor}) =>{
    const offers =
    resInfor?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.offers?.map(
      (off) => off.info
    ) || [];


return(
    <div className="offers-section">
        <h5 className="text-black-600 font-semibold text-xl">Special Offers: 💥</h5>
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
)
}
export default RestuarentOffers;