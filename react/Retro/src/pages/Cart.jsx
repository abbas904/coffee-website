// src/pages/Cart.jsx
import React, { useContext, useState } from "react";
import { CartContext } from "../components/context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import heroBg from "../assets/21.jpg";

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, cartTotal } = useContext(CartContext);
  const [coupon, setCoupon] = useState("");
  const navigate = useNavigate();

  const handleCheckout = () => {
    alert("Proceeding to checkout...");
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div
        className="w-full h-64 bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <h1 className="text-white text-4xl sm:text-5xl font-bold bg-black bg-opacity-40 p-4 rounded">
          Your Cart
        </h1>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-6">
        {cart.length === 0 ? (
          <p className="text-center text-xl mt-8">Your cart is empty.</p>
        ) : (
          <>
            {/* Products */}
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white shadow-lg rounded-lg p-4 flex flex-col sm:flex-row items-center sm:items-start gap-4 transition hover:shadow-xl"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full sm:w-24 h-24 object-cover rounded"
                  />
                  <div className="flex-1 flex flex-col justify-between w-full">
                    <div>
                      <h2 className="text-lg sm:text-xl font-semibold">{item.name}</h2>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                    <div className="mt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 w-full">
                      <p className="font-semibold">${item.price.toFixed(2)}</p>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300 transition"
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300 transition"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                      >
                        Remove
                      </button>
                    </div>
                    <p className="mt-2 text-right sm:text-left font-semibold">
                      Subtotal: ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Coupon & Checkout */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
              <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Coupon code"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 w-full sm:w-64"
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                  Apply coupon
                </button>
              </div>
              <button
                onClick={handleCheckout}
                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
              >
                Checkout
              </button>
            </div>

            {/* Cart Totals */}
            <div className="shop-cart-totals mt-8 bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto">
  <h2 className="text-2xl font-semibold mb-6 text-center">Cart totals</h2>
  <div className="flex flex-col gap-4">
    {/* Subtotal */}
    <div className="flex justify-between items-center">
      <span className="font-medium">Subtotal</span>
      <span className="font-medium">${cartTotal.toFixed(2)}</span>
    </div>

    {/* Shipping */}
    <div className="flex flex-col gap-1">
      <div className="flex justify-between items-start">
        <span className="font-medium">Shipping</span>
        <span className="font-medium">Free</span>
      </div>
      <p className="text-gray-600 text-sm">Shipping to Australia.</p>
      <Link to="/cart" className="text-blue-600 hover:underline text-sm">
        Change address
      </Link>
    </div>

    {/* Total */}
    <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-200">
      <span className="font-semibold text-lg">Total</span>
      <span className="font-semibold text-lg">${cartTotal.toFixed(2)}</span>
    </div>
  </div>
</div>

          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
