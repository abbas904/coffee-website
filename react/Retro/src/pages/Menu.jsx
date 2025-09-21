// src/pages/Menu.jsx
import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { CartContext } from "../components/context/CartContext";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import heroBg from "../assets/21.jpg";

// Category Dropdown Component
const CategoryDropdown = ({ categories, selected, setSelected }) => {
  const [open, setOpen] = useState(false);
  const ref = React.useRef();

  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full sm:w-60" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full border px-4 py-2 rounded-lg shadow text-left flex justify-between items-center"
      >
        {selected} <span>▼</span>
      </button>
      {open && (
        <ul className="absolute top-full left-0 w-full bg-white border shadow-md rounded mt-1 z-50 max-h-60 overflow-auto">
          {categories.map((cat, idx) => (
            <li
              key={idx}
              onClick={() => {
                setSelected(cat);
                setOpen(false);
              }}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {cat}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const ITEMS_PER_PAGE = 6;

const Menu = () => {
  const { addMealToCart } = useContext(CartContext);
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [categories, setCategories] = useState([]);
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const res = await axios.get("https://dummyjson.com/recipes?limit=0");
        setMenu(res.data.recipes);
        const cuisines = [...new Set(res.data.recipes.map((r) => r.cuisine))];
        const mealTypes = [
          ...new Set(res.data.recipes.flatMap((r) => r.mealType)),
        ];
        const difficulties = [
          ...new Set(res.data.recipes.map((r) => r.difficulty)),
        ];
        const tags = [...new Set(res.data.recipes.flatMap((r) => r.tags))];
        setCategories(["all", ...cuisines, ...mealTypes, ...difficulties, ...tags]);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  let filteredMenu = menu.filter((item) => {
    const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory =
      category === "all" ||
      item.cuisine === category ||
      item.mealType?.includes(category) ||
      item.difficulty === category ||
      item.tags?.includes(category);
    return matchSearch && matchCategory;
  });

  if (sort) {
    filteredMenu.sort((a, b) => {
      if (sort === "rating") return b.rating - a.rating;
      if (sort === "time") return a.prepTimeMinutes - b.prepTimeMinutes;
      return 0;
    });
  }

  const totalPages = Math.ceil(filteredMenu.length / ITEMS_PER_PAGE);
  const displayedMenu = filteredMenu.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const getPagination = () => {
    const pages = [];
    const delta = 2;
    let l;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= page - delta && i <= page + delta)) {
        if (l) {
          if (i - l === 2) pages.push(l + 1);
          else if (i - l !== 1) pages.push("...");
        }
        pages.push(i);
        l = i;
      }
    }
    return pages;
  };

  return (
    <div className="min-h-screen bg-gray-50 w-full max-w-full">
      <Toaster />

      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center text-center py-24 sm:py-32 w-full"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 px-2 sm:px-4">
          <motion.h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
            🍽 Our Menu
          </motion.h1>
          <ul className="breadcrumb flex justify-center gap-2 text-white text-sm sm:text-base">
            <li>
              <Link to="/" className="hover:underline">
                <i className="fas fa-home mr-1"></i> Home /
              </Link>
            </li>
            <li>Menu</li>
          </ul>
        </div>
      </div>

      {/* Search + Filter + Sort */}
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="🔍 Search a recipe..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setPage(1);
          }}
          className="flex-1 border px-4 py-2 rounded-lg shadow w-full"
        />
        <CategoryDropdown
          categories={categories}
          selected={category}
          setSelected={(cat) => {
            setCategory(cat);
            setPage(1);
          }}
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border px-4 py-2 rounded-lg shadow w-full sm:w-auto"
        >
          <option value="">Sort</option>
          <option value="rating">Highest Rated ⭐</option>
          <option value="time">Fastest ⏱</option>
        </select>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {loading
          ? Array.from({ length: ITEMS_PER_PAGE }).map((_, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col p-6 animate-pulse"
              >
                <div className="h-56 bg-gray-300 w-full mb-4"></div>
                <div className="h-6 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-6 bg-gray-300 rounded w-1/2 mt-2"></div>
              </div>
            ))
          : displayedMenu.map((recipe) => (
              <motion.div
                key={recipe.id}
                whileHover={{ scale: 1.03 }}
                className="bg-white rounded-2xl border border-gray-200 shadow-md overflow-hidden flex flex-col"
              >
                <img
                  src={recipe.image || recipe.images?.[0]}
                  alt={recipe.name}
                  className="w-full h-56 object-cover cursor-pointer"
                  onClick={() => navigate(`/recipe/${recipe.id}`)}
                />
                <div className="p-6 flex flex-col flex-1">
                  <h3
                    className="text-2xl font-bold mb-2 cursor-pointer"
                    onClick={() => navigate(`/recipe/${recipe.id}`)}
                  >
                    {recipe.name}
                  </h3>
                  {recipe.description && (
                    <p className="text-gray-600 text-sm mb-2 line-clamp-3">
                      {recipe.description}
                    </p>
                  )}
                  {recipe.cuisine && (
                    <p className="text-gray-500 text-xs mb-2 truncate">🍴 {recipe.cuisine}</p>
                  )}
                  <div className="flex justify-between text-sm text-gray-600 mb-3">
                    <span>⏱ {recipe.prepTimeMinutes} mins</span>
                    <span>⭐ {recipe.rating}</span>
                  </div>
                  <button
                    onClick={() => {
                      addMealToCart(
                        recipe.id,
                        1,
                        recipe.name,
                        recipe.image || recipe.images?.[0],
                        Math.round((recipe.nutrition?.calories || 200) / 10)
                      );
                      toast.success(`${recipe.name} added to cart!`);
                    }}
                    className="mt-auto w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
                  >
                    Add to Cart 🛒
                  </button>
                </div>
              </motion.div>
            ))}
      </div>

      {/* Pagination */}
     {totalPages > 1 && (
  <div className="flex justify-center items-center gap-2 mt-12 mb-8 flex-wrap">
    <button
      onClick={() => setPage((p) => Math.max(p - 1, 1))}
      disabled={page === 1}
      className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 transition"
    >
      Prev
    </button>

    {Array.from({ length: totalPages }).map((_, i) => {
      // نظهر الصفحات القريبة من الصفحة الحالية فقط (+/-2)
      if (i + 1 === 1 || i + 1 === totalPages || (i + 1 >= page - 1 && i + 1 <= page + 1)) {
        return (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded transition ${
              page === i + 1 ? "bg-red-600 text-white" : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {i + 1}
          </button>
        );
      } else if (i + 1 === page - 2 || i + 1 === page + 2) {
        return <span key={i} className="px-2 text-gray-500">...</span>;
      } else {
        return null;
      }
    })}

    <button
      onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
      disabled={page === totalPages}
      className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 transition"
    >
      Next
    </button>
  </div>
)}

    </div>
  );
};

export default Menu;
