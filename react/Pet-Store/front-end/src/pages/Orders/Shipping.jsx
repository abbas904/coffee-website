import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  saveShippingAddress,
  savePaymentMethod,
} from "../../redux/features/cart/cartSlice";
import ProgressSteps from "../../components/ProgressSteps";

const Shipping = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  // Payment
  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [navigate, shippingAddress]);

  return (
    <div className="container mx-auto mt-6 sm:mt-8 md:mt-10 px-4 sm:px-6">
      <ProgressSteps step1 step2 />
      <div className="mt-8 sm:mt-12 md:mt-[10rem] flex justify-center items-center flex-wrap">
        <form onSubmit={submitHandler} className="w-full max-w-md md:max-w-lg lg:w-[40rem]">
          <h1 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Shipping</h1>
          <div className="mb-3 sm:mb-4">
            <label className="block text-white mb-2 text-sm sm:text-base">Address</label>
            <input
              type="text"
              className="w-full p-2 sm:p-3 border rounded text-sm sm:text-base"
              placeholder="Enter address"
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="mb-3 sm:mb-4">
            <label className="block text-white mb-2 text-sm sm:text-base">City</label>
            <input
              type="text"
              className="w-full p-2 sm:p-3 border rounded text-sm sm:text-base"
              placeholder="Enter city"
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="mb-3 sm:mb-4">
            <label className="block text-white mb-2 text-sm sm:text-base">Postal Code</label>
            <input
              type="text"
              className="w-full p-2 sm:p-3 border rounded text-sm sm:text-base"
              placeholder="Enter postal code"
              value={postalCode}
              required
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>
          <div className="mb-3 sm:mb-4">
            <label className="block text-white mb-2 text-sm sm:text-base">Country</label>
            <input
              type="text"
              className="w-full p-2 sm:p-3 border rounded text-sm sm:text-base"
              placeholder="Enter country"
              value={country}
              required
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
          <div className="mb-3 sm:mb-4">
            <label className="block text-gray-400 text-sm sm:text-base">Select Method</label>
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-pink-500"
                  name="paymentMethod"
                  value="PayPal"
                  checked={paymentMethod === "PayPal"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />

                <span className="ml-2 text-sm sm:text-base">PayPal or Credit Card</span>
              </label>
            </div>
          </div>

          <button
            className="bg-pink-500 text-white py-2.5 sm:py-3 px-4 rounded-full text-base sm:text-lg w-full"
            type="submit"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default Shipping;