import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { CartContext } from "../components/context/CartContext";
import toast, { Toaster } from "react-hot-toast";


// Skeleton Loader
const RecipeSkeleton = () => (
  <div className="max-w-5xl mx-auto px-4 py-10 space-y-6">
    <div className="animate-pulse bg-gray-300 h-64 w-full rounded-lg"></div>
    <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="bg-gray-300 h-20 rounded-lg animate-pulse"></div>
      ))}
    </div>
    <div className="space-y-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-4 bg-gray-300 rounded w-full animate-pulse"></div>
      ))}
    </div>
  </div>
);

const Recipe = () => {
  const { id } = useParams();
  const { addMealToCart } = useContext(CartContext);
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://dummyjson.com/recipes/${id}`);
        const data = await res.json();
        setRecipe(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id]);

  if (loading) return <RecipeSkeleton />;

  if (!recipe)
    return <p className="text-center text-lg py-10">❌ Recipe not found.</p>;

  const imageUrl = recipe.image || recipe.images?.[0] || "";
  const price = Math.round((recipe.nutrition?.calories || 200) / 10);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Toaster position="top-right" />
      {/* Hero */}
      <div className="relative w-full h-72 md:h-96">
        <img src={imageUrl} alt={recipe.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg px-4 text-center">
            {recipe.name}
          </h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10 space-y-10">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <Link
            to="/menu"
            className="inline-block px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition"
          >
            ⬅️ Back to Menu
          </Link>

          <button
            onClick={() => {
              addMealToCart(recipe.id, 1, recipe.name, imageUrl, price);
              toast.success(`${recipe.name} added to cart!`);
            }}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Add to Cart 🛒 (${price})
          </button>
        </div>

        {/* Quick Info */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          <div className="bg-white shadow rounded-xl p-4 text-center">
            <p className="text-gray-500">⏱ Prep Time</p>
            <p className="font-semibold">{recipe.prepTimeMinutes} mins</p>
          </div>
          <div className="bg-white shadow rounded-xl p-4 text-center">
            <p className="text-gray-500">⭐ Rating</p>
            <p className="font-semibold">{recipe.rating}</p>
          </div>
          <div className="bg-white shadow rounded-xl p-4 text-center">
            <p className="text-gray-500">👥 Servings</p>
            <p className="font-semibold">{recipe.servings}</p>
          </div>
          <div className="bg-white shadow rounded-xl p-4 text-center">
            <p className="text-gray-500">🔥 Calories</p>
            <p className="font-semibold">{recipe.caloriesPerServing || recipe.nutrition?.calories} kcal</p>
          </div>
          <div className="bg-white shadow rounded-xl p-4 text-center">
            <p className="text-gray-500">💵 Price</p>
            <p className="font-semibold text-green-600">${price}</p>
          </div>
        </div>

        {/* Ingredients */}
        <div className="bg-white shadow rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-4">🥗 Ingredients</h2>
          {recipe.ingredients?.length > 0 ? (
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {recipe.ingredients.map((ing, index) => (
                <li key={index}>{ing}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No ingredients available.</p>
          )}
        </div>

        {/* Instructions */}
        <div className="bg-white shadow rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-4">👨‍🍳 Instructions</h2>
          {recipe.instructions?.length > 0 ? (
            <ol className="list-decimal list-inside space-y-3 text-gray-700 leading-relaxed">
              {recipe.instructions.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          ) : (
            <p className="text-gray-500">No instructions available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Recipe;
