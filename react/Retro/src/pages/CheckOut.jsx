// src/pages/Checkout.jsx
import React, { useContext, useState } from "react";
import { CartContext } from "../components/context/CartContext";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Checkout = () => {
  const { cart, cartTotal, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // تحقق من الحقول
    if (!form.name || !form.email || !form.address || !form.phone) {
      toast.error("Please fill all fields!");
      return;
    }

    // تحقق إذا كانت السلة فارغة
    if (cart.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    // إشعار النجاح
    toast.success("Order placed successfully!");

    // تأخير صغير قبل تفريغ السلة والتنقل
    setTimeout(() => {
      clearCart(); // تفريغ السلة
      navigate("/"); // العودة للصفحة الرئيسية
    }, 1200); // 1.2 ثانية
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <Toaster position="top-right" />
      <h2 className="text-3xl font-bold mb-8 text-center">Checkout</h2>

      {/* Cart Summary */}
      <div className="bg-white p-6 rounded-2xl shadow mb-8">
        <h3 className="text-xl font-bold mb-4">Your Cart</h3>
        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <ul className="space-y-4">
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-gray-500">Qty: {item.quantity}</p>
                  </div>
                </div>
                <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
              </li>
            ))}
          </ul>
        )}
        <p className="text-right font-bold mt-4">Total: ${cartTotal.toFixed(2)}</p>
      </div>

      {/* Checkout Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow space-y-4"
      >
        <h3 className="text-xl font-bold mb-4">Your Information</h3>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded-lg"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded-lg"
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded-lg"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded-lg"
        />

        <button
          type="submit"
          className="w-full bg-red-600 text-white py-3 rounded-full font-bold hover:bg-red-700 transition"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;
