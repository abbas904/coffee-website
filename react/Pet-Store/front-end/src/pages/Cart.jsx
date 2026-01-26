import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/features/Cart/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <div className="container mx-auto mt-8 sm:mt-12 px-4 sm:px-6 md:px-8 flex flex-col md:flex-row gap-6 sm:gap-8">

      {/* Cart Items */}
      <div className="flex-1 flex flex-col gap-6">
        {cartItems.length === 0 ? (
          <div className="text-center py-10 text-lg text-gray-700">
            Your cart is empty. <Link to="/shop" className="text-petPrimary font-bold">Go To Shop</Link>
          </div>
        ) : (
          <>
            <h1 className="text-xl sm:text-2xl font-bold text-black mb-4">Shopping Cart</h1>

            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white/80 border-t rounded-xl shadow-md p-3 sm:p-4 transition-transform duration-200 hover:scale-105 gap-3 sm:gap-0"
              >
                {/* Image */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-lg overflow-hidden bg-white/90">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 ml-0 sm:ml-4 min-w-0">
                  <Link to={`/product/${item._id}`} className="text-petPrimary font-bold hover:underline text-sm sm:text-base break-words">
                    {item.name}
                  </Link>
                  <div className="text-black mt-1 text-xs sm:text-sm">{item.brand}</div>
                  <div className="text-gray-800 font-bold mt-1 text-sm sm:text-base">${item.price}</div>
                </div>

                {/* Quantity */}
                <div className="w-full sm:w-24 border-1">
                  <select
                    className="w-full p-1.5 sm:p-1 border rounded text-black text-sm sm:text-base"
                    value={item.qty}
                    onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Remove */}
                <div>
                  <button
                    className="text-red-500 ml-0 sm:ml-4 hover:text-red-700 transition-colors"
                    onClick={() => removeFromCartHandler(item._id)}
                  >
                    <FaTrash size={18} />
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* Summary */}
      {cartItems.length > 0 && (
        <div className="w-full md:w-96 bg-white/80 border-1 p-4 sm:p-6 rounded-2xl border-t hover:scale-105 transition-all duration-200 shadow-md flex flex-col gap-3 sm:gap-4 h-max">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Summary</h2>
          <div className="flex justify-between text-gray-900 text-sm sm:text-base">
            <span>Items ({cartItems.reduce((acc, item) => acc + item.qty, 0)})</span>
            <span>${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</span>
          </div>
          <button
            className="bg-petCardBg text-black py-2.5 sm:py-3 rounded-full text-base sm:text-lg font-semibold hover:bg-red-500 transition-colors"
            onClick={checkoutHandler}
          >
            Proceed To Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
