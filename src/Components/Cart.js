import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import CDN_URL from "../utils/constant";
import {Link} from "react-router";
import {clearCart, addItem, removeItem, removePItem } from "../utils/Redux/cartSlice"; // Fixed missing addItem import

const Cart = () => {
  // Subscribe only to relevant data
  const items = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleAddItem = (item) => {
    // Dispatch an action
    dispatch(addItem(item));
  };

  const handleRemoveItem = (item) => {
    dispatch(removeItem(item));
  };

  const handleRemovePItem = (item) => {
    dispatch(removePItem(item));
  };

  const totalPrice = items.reduce((total, item) => {
    return (
      total +
      (item.card.info.defaultPrice / 100 || item.card.info.price / 100) *
        item.quantity
    );
  }, 0);

  return (
    <div className="bg-gray-100">
      <div className="text-center m-4 p-4">
        <div className="text-2xl font-bold">Cart 👜</div>
        <div className="w-6/12 m-auto">
          {items.length === 0 ? (
            "Your Cart is Empty. Please grab some items 🛒🍜"
          ) : (
            <>
              <button
                className="p-2 m-2 bg-black text-white rounded-lg hover:shadow-lg hover:shadow-black-600/100"
                onClick={handleClearCart}
              >
                Clear Cart 
              </button>
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
                      <p className="text-sm text-gray-600">
                        {item.card.info.description} 🍴
                      </p>
                    )}
                    <p className="text-gray-600 mt-1">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <div className="relative">
                    <img
                      src={CDN_URL + item.card.info.imageId}
                      alt={item.card.info.name}
                      className="w-30 h-20 object-cover rounded m-1"
                    />
                    <div className="flex justify-center space-x-2 mt-2">
                      {/* Add button */}
                      <button
                        className="p-1 bg-green-200 text-white shadow-lg text-xs rounded-lg"
                        onClick={() => handleAddItem(item)}
                      >
                        ➕
                      </button>

                      {/* Remove button */}
                      <button
                        className="p-1 bg-red-200 text-white shadow-lg text-xs rounded-lg"
                        onClick={() => handleRemoveItem(item)}
                      >
                        ➖
                      </button>

                      {/* Remove Item button */}
                      <button
                        className="p-1 bg-blue-200 text-white shadow-lg text-xs rounded-lg"
                        onClick={() => handleRemovePItem(item)}
                      >
                        ✖️
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <h4 className="text-xl font-semibold text-red-400">
                Total: ₹{totalPrice.toFixed(2)}
              </h4>
             <br/>
              <center>
                <button className="m-2 p-2 bg-blue-500 rounded-xl text-white hover:shadow-lg hover:shadow-blue-500/50">
                <Link to = "/checkout">Checkout 💰</Link>
                  
                </button>
              </center>
            </>
          )}
        </div>
      </div>

      <h3 className="shadow-blue-300 text-blue-500 rounded-md font-bold text-xl text-center">
        Thank you for using Foodies
      </h3>
    </div>
  );
};

export default Cart;
