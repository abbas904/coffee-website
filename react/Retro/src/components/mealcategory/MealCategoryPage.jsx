// src/components/mealcategory/MealCategoryPage.jsx
import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { CartContext } from "../context/CartContext";

const ITEMS_PER_PAGE = 6;

const MealCardSkeleton = () => (
  <div className="bg-white rounded-2xl shadow-md overflow-hidden p-4 animate-pulse">
    <div className="h-48 bg-gray-300 rounded mb-4"></div>
    <div className="h-6 bg-gray-300 rounded mb-2"></div>
    <div className="h-4 bg-gray-300 rounded mb-2"></div>
    <div className="h-6 bg-gray-300 rounded w-1/2 mt-2"></div>
  </div>
);

const MealCategoryPage = () => {
  const { type } = useParams();
  const { addMealToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://dummyjson.com/recipes/meal-type/${type}`);
        const data = await res.json();
        setMeals(data.recipes || []);
        setCurrentPage(1);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setMeals([]);
        setLoading(false);
      }
    };
    fetchMeals();
  }, [type]);

  const filteredMeals = meals.filter((meal) =>
    meal.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredMeals.length / ITEMS_PER_PAGE);
  const displayedMeals = filteredMeals.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center mb-12  capitalize">
          {type} Recipes
        </h2>

        {/* Search */}
        <div className="mb-8 flex justify-center">
          <input
            type="text"
            placeholder="Search in this category..."
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            className="border px-4 py-2 rounded-lg shadow w-full max-w-md"
          />
        </div>

        {/* Meals Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: ITEMS_PER_PAGE }).map((_, idx) => (
              <MealCardSkeleton key={idx} />
            ))}
          </div>
        ) : displayedMeals.length === 0 ? (
          <p className="text-center text-gray-600 text-xl">No recipes found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedMeals.map((meal) => (
              <div
                key={meal.id}
                className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col"
              >
                <img
                  src={meal.image}
                  alt={meal.name}
                  className="w-full h-56 object-cover cursor-pointer"
                  onClick={() => navigate(`/recipe/${meal.id}`)}
                />
                <div className="p-6 flex flex-col flex-1">
                  <h3
                    className="text-2xl font-bold mb-2 cursor-pointer"
                    onClick={() => navigate(`/recipe/${meal.id}`)}
                  >
                    {meal.name}
                  </h3>
                  <div className="flex justify-between text-sm text-gray-500 mb-3">
                    <span>🍽 {meal.cuisine}</span>
                    <span>👩‍🍳 {meal.chef || "Chef"}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
                    {meal.instructions.join(" ").slice(0, 100)}...
                  </p>
                  <div className="flex justify-between items-center mt-auto">
                    <p className="text-red-600 font-bold text-sm">
                      ⏱ {meal.prepTimeMinutes} mins
                    </p>
                    <button
                      onClick={() => addMealToCart(meal.id, 1)}
                      className="bg-red-600 text-white px-4 py-2 rounded-full text-sm hover:bg-red-700 transition"
                    >
                      Add to Cart 🛒
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12 flex-wrap">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 transition"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded transition ${
                  currentPage === i + 1 ? "bg-red-600 text-white" : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 transition"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default MealCategoryPage;
