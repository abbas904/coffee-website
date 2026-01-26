import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Loader from "./Loader";
import {
  addToFavorites,
  removeFromFavorites,
  setFavorites,
} from "../redux/features/favorite/favoriteSlice";

import {
  addFavoriteToLocalStorage,
  getFavoritesFromLocalStorage,
  removeFavoriteFromLocalStorage,
} from "../utils/LocalStorage";
import ProductCarousel from "../pages/products/ProductCarousel";

const Header = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites) || [];
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // جلب المنتجات
  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/api/category/count");
        setTopProducts(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.error || "حدث خطأ أثناء جلب البيانات");
        setLoading(false);
      }
    };
    fetchTopProducts();
  }, []);

  // جلب المفضلات من LocalStorage
  useEffect(() => {
    const favoritesFromLocalStorage = getFavoritesFromLocalStorage();
    dispatch(setFavorites(favoritesFromLocalStorage));
  }, [dispatch]);

  const toggleFavorites = (product) => {
    const isFavorite = favorites.some((p) => p._id === product._id);
    if (isFavorite) {
      dispatch(removeFromFavorites(product));
      removeFavoriteFromLocalStorage(product._id);
    } else {
      dispatch(addToFavorites(product));
      addFavoriteToLocalStorage(product);
    }
  };

  if (loading) return <Loader />;
  if (error)
    return (
      <p className="text-center text-red-500 font-semibold mt-10">{error}</p>
    );

  return (
    <section className="mt-8 sm:mt-12 px-4 relative pb-20" style={{ zIndex: 1 }}>
      {/* العنوان */}
      <div className="mb-6 mt-4 sm:mt-8 lg:mt-0 text-center lg:text-left">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-black lg:ml-[20rem]">Top Products</h1>
        <p className="text-petPrimary mt-2 text-sm sm:text-base md:text-lg lg:ml-[20rem]">
          Best products from each category
        </p>
      </div>

      {/* الكروت + Carousel */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* العمود الأول: الكروت - عمودين */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {topProducts.map(({ category, product }) =>
            product ? (
              <div
                key={product._id}
                className="group  border-2 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
                style={{ minHeight: "20rem" }} // صغر الكارت
              >
                {/* الصورة + HeartIcon */}
                <div className="h-40 relative flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-contain pt-2 group-hover:scale-105 transition-transform duration-300"
                  />
                  <div
                    className="absolute top-2 right-2 text-xl cursor-pointer drop-shadow-lg"
                    onClick={() => toggleFavorites(product)}
                  >
                    {favorites.some((p) => p._id === product._id) ? (
                      <FaHeart className="text-petPrimary" />
                    ) : (
                      <FaRegHeart className="text-gray-300 hover:text-pink-500 transition-colors duration-200" />
                    )}
                  </div>
                </div>

                {/* المحتوى */}
                <div className="p-4 flex flex-col items-center text-center">
                  <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
                    {category}
                  </span>

                  <h3 className="text-gray-800 font-semibold text-lg line-clamp-2">
                    {product.name}
                  </h3>

                  <p className="mt-2 text-petPrimary font-bold text-base">
                    ${product.price?.toFixed(2)}
                  </p>

                  <Link
                    to={`/product/${product._id}`}
                    className="mt-3 inline-block  text-gray-700 border-t shadow-md px-4 py-1 rounded-lg text-md font-medium hover:bg-red-500 transition-colors"
                  >
                    Product Details
                  </Link>
                </div>
              </div>
            ) : (
              <div
                key={category}
                className="bg-white rounded-xl p-4 flex flex-col items-center justify-center shadow-md text-gray-400"
                style={{ minHeight: "20rem" }}
              >
                <span className="text-xs uppercase tracking-wider">{category}</span>
                <p className="mt-2 text-sm">لا يوجد منتجات</p>
              </div>
            )
          )}
        </div>

        {/* العمود الثاني: Carousel */}
        <div className="lg:mt-0 mt-6 sm:mt-8 flex justify-center items-start">
          <div className="w-full sm:w-[90%] lg:w-[28rem] xl:w-[32rem]">
            <ProductCarousel />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
