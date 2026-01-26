import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import Message from "../../components/Message";
import ProgressSteps from "../../components/ProgressSteps";
import Loader from "../../components/Loader";

import { useCreateOrderMutation } from "../../redux/api/orderApiSlice";
import { clearCartItems } from "../../redux/features/cart/cartSlice";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    }
  }, [cart.shippingAddress.address, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();

      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  };

  return (
    <>
      <ProgressSteps step1 step2 step3 />

      <div className="container mx-auto mt-8 sm:mt-12 md:mt-14 px-4 sm:px-6">
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* ================= Order Items ================= */}
          <div className="lg:col-span-2 bg-white/90 r-t rounded-2xl shadow-md p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Order Items</h2>

            {cart.cartItems.length === 0 ? (
              <Message>Your cart is empty</Message>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm sm:text-base">
                  <thead className="border-b text-petPrimary">
                    <tr>
                      <th className="py-2 text-xs sm:text-sm">Product</th>
                      <th className="text-xs sm:text-sm">Qty</th>
                      <th className="text-xs sm:text-sm">Price</th>
                      <th className="text-xs sm:text-sm">Total</th>
                    </tr>
                  </thead>

                  <tbody>
                    {cart.cartItems.map((item, index) => (
                      <tr
                        key={index}
                        className="border-b last:border-none"
                      >
                        <td className="py-3 sm:py-4 flex items-center gap-2 sm:gap-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg object-cover"
                          />
                          <Link
                            to={`/product/${item.product}`}
                            className="text-petPrimary hover:underline font-medium text-xs sm:text-sm md:text-base break-words"
                          >
                            {item.name}
                          </Link>
                        </td>
                        <td className="text-xs sm:text-sm">{item.qty}</td>
                        <td className="text-xs sm:text-sm">${item.price.toFixed(2)}</td>
                        <td className="font-semibold text-xs sm:text-sm">
                          ${(item.qty * item.price).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* ================= Order Summary ================= */}
          <div className="bg-petCardBg rounded-2xl shadow p-4 sm:p-6 space-y-4 sm:space-y-6">
            <h2 className="text-xl sm:text-2xl font-semibold">Order Summary</h2>

            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base md:text-lg">
              <li className="flex justify-between">
                <span>Items</span>
                <span>${cart.itemsPrice}</span>
              </li>
              <li className="flex justify-between">
                <span>Shipping</span>
                <span>${cart.shippingPrice}</span>
              </li>
              <li className="flex justify-between">
                <span>Tax</span>
                <span>${cart.taxPrice}</span>
              </li>
              <li className="flex justify-between font-bold text-lg sm:text-xl border-t pt-3 sm:pt-4">
                <span>Total</span>
                <span>${cart.totalPrice}</span>
              </li>
            </ul>

            {error && (
              <Message variant="danger">
                {error.data?.message}
              </Message>
            )}

            <button
              type="button"
              className="w-full bg-black hover:bg-red-500 text-white py-2.5 sm:py-3 rounded-full text-base sm:text-lg transition disabled:opacity-50"
              disabled={cart.cartItems.length === 0}
              onClick={placeOrderHandler}
            >
              Place Order
            </button>

            {isLoading && <Loader />}
          </div>
        </div>

        {/* ================= Shipping & Payment ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mt-6 sm:mt-8 md:mt-10">
          <div className="bg-white/90 r-t rounded-2xl shadow-md p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Shipping</h2>
            <p className="text-petPrimary leading-relaxed text-sm sm:text-base">
              {cart.shippingAddress.address},{" "}
              {cart.shippingAddress.city},{" "}
              {cart.shippingAddress.postalCode},{" "}
              {cart.shippingAddress.country}
            </p>
          </div>

          <div className="bg-white/90 r-t rounded-xl shadow-md p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">
              Payment Method
            </h2>
            <p className="text-petPrimary text-sm sm:text-base">
              {cart.paymentMethod}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceOrder;
