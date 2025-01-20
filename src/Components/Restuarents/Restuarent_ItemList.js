import CDN_URL from "../../utils/constant"

const Restuarent_ItemList = ({ items }) => {
  return (
    <>
      {items.map((item) => (
        <div
  key={item.card.info.id}
  className="p-4 m-2 shadow-sm border-b-2 border-gray-400 flex"
>
  
  <div className="flex-1">
    <div className="mb-2">
      <span className="font-bold">{item.card.info.name}</span>
      <span className="ml-2">
        ₹
        {item.card.info.price
          ? item.card.info.price / 100
          : item.card.info.defaultPrice / 100}
      </span>
    </div>
    {item.card.info.description && (
      <p className="text-sm text-gray-600">{item.card.info.description} 🍴</p>
    )}
  </div>
  <div className="mr-5 relative">
  <img
    src={CDN_URL + item.card.info.imageId}
    alt={item.card.info.name}
    className="w-30 h-20 object-cover rounded m-1"
  />
  <button className="p-1 bg-white shadow-lg text-xs absolute bottom-0 left-1/2 transform -translate-x-1/2 rounded-lg">
    Add ➕ 
  </button>
</div>


</div>

      ))}
    </>
  );
};

export default Restuarent_ItemList;
