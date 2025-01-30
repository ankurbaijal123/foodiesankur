import { useDispatch , useSelector} from "react-redux";
import CDN_URL from "../../utils/constant"
import { addItem } from "../../utils/Redux/cartSlice";

const Restuarent_ItemList = ({ items }) => {
  const dispatch = useDispatch();

  const cartItems = useSelector((store) =>(
    store.cart.items
  )) 

  const handleAddItem =(item) =>{
    //Dispatch an action
    dispatch(addItem(item))
    alert(`${cartItems.length + 1}  Item has been added to the cart!`);
    // redux will create an object and also create payload inside object
  }

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
    className="w-50 h-40 object-cover rounded m-1"
  />
  <button className="p-1 bg-white shadow-lg text-xs absolute bottom-0 left-1/2 transform -translate-x-1/2 rounded-lg"
  onClick={() => handleAddItem(item)}>
    Add ➕ 
  </button>
</div>
{/* onClick={handleAddItem}	On button click	No
onClick={handleAddItem(item)}	During render	Yes (immediately)
onClick={() => handleAddItem(item)}	On button click	Yes */}


</div>

      ))}
    </>
  );
};

export default Restuarent_ItemList;
