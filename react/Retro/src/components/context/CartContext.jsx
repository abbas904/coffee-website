import { createContext, useEffect, useState, useMemo } from "react";
import axios from "axios";

export const CartContext = createContext();

export function CartContextProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const [numsItems, setNumsItems] = useState(() => {
    const storedCount = localStorage.getItem("numsItems");
    return storedCount ? JSON.parse(storedCount) : 0;
  });

  const cartTotal = useMemo(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cart]);

  useEffect(() => {
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    setNumsItems(totalQuantity);
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("numsItems", JSON.stringify(totalQuantity));
  }, [cart]);

  // إضافة وجبة للسلة مع السعر الصحيح
  async function addMealToCart(mealId, quantity = 1) {
    try {
      const res = await axios.get(`https://dummyjson.com/recipes/${mealId}`);
      const mealData = res.data;
      const price = Math.round((mealData.nutrition?.calories || 200) / 10);

      setCart((prev) => {
        const existingIndex = prev.findIndex((it) => it.id === mealData.id);
        if (existingIndex !== -1) {
          const updated = [...prev];
          updated[existingIndex].quantity += quantity;
          return updated;
        }

        const newItem = {
          id: mealData.id,
          title: mealData.name,
          price,
          image: mealData.image || mealData.images?.[0] || "",
          quantity,
        };
        return [...prev, newItem];
      });
    } catch (err) {
      console.error("Failed to add meal to cart:", err);
    }
  }

  function updateQuantity(mealId, newQuantity) {
    setCart((prev) =>
      newQuantity <= 0
        ? prev.filter((it) => it.id !== mealId)
        : prev.map((it) => (it.id === mealId ? { ...it, quantity: newQuantity } : it))
    );
  }

  function increaseQuantity(mealId) {
    const current = cart.find((it) => it.id === mealId)?.quantity || 0;
    updateQuantity(mealId, current + 1);
  }

  function decreaseQuantity(mealId) {
    const current = cart.find((it) => it.id === mealId)?.quantity || 0;
    updateQuantity(mealId, current - 1);
  }

  function removeFromCart(mealId) {
    setCart((prev) => prev.filter((it) => it.id !== mealId));
  }

  function clearCart() {
    setCart([]);
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        numsItems,
        cartTotal,
        addMealToCart,
        updateQuantity,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
