import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import CDN_URL from "../utils/constant"
import Restuarent_ItemList  from "./Restuarents/Restuarent_ItemList";
import { clearCart } from "../utils/Redux/cartSlice";


const Cart = () => {
    //Subscribe only to relevant data
    //selecting to specific portion of store  
    const items = useSelector((store) =>(
        store.cart.items
      )) 
    const dispatch = useDispatch();

    const handleClearCart = () =>{
        dispatch(clearCart())
    }
    const totalPrice = items.reduce((total, item) => {
        return total + (item.card.info.defaultPrice / 100 || item.card.info.price / 100 );
      }, 0);
   
    return (
        <div className="bg-gray-100"> 
          <div className="text-center m-4 p-4">
            <div className="text-2xl font-bold">
            Cart</div>
            <div className=" w-6/12 m-auto">
            
            
            {
                items.length === 0 ? "Your Cart is Empty . Please grab some items 🛒🍜" : 
                
                    <button className="p-2 m-2 bg-black text-white rounded-lg"
                    onClick={handleClearCart}> Clear Cart</button> 
            }
                <Restuarent_ItemList items={items} />
            <h4 className="text-xl font-semibold text-red-400">Total : {totalPrice}</h4>
            
            </div>
          </div>
        </div>
      );
}
export default Cart;