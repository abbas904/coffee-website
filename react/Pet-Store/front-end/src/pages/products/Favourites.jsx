import { useSelector, useDispatch } from "react-redux";
import { selectFavoriteProduct, removeFromFavorites } from "../../redux/features/favorite/favoriteSlice";
import Product from "../products/Product";
import { FaHeartBroken, FaTimes } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";
const Favorites = () => {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavoriteProduct);
  const [removedIds, setRemovedIds] = useState([]);

  const handleRemove = (id) => {
    // تأثير اختفاء سلس
    setRemovedIds((prev) => [...prev, id]);
    setTimeout(() => {
      dispatch(removeFromFavorites(id));
      setRemovedIds((prev) => prev.filter((rid) => rid !== id));
    }, 300); // مدة التحريك قبل الحذف الفعلي
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-10">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center text-petPrimary mb-6 sm:mb-8 md:mb-10">
        ❤️ Favorite Products
      </h1>

      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-12 sm:mt-16 md:mt-20 text-gray-500 animate-fadeIn px-4">
          <FaHeartBroken className="text-5xl sm:text-6xl md:text-7xl mb-3 sm:mb-4 text-petPrimary animate-pulse" />
          <p className="text-base sm:text-lg font-semibold text-center">No favorite products yet</p>
          <p className="text-xs sm:text-sm mt-1 text-center">Add products to favorites to see them here</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {favorites.map((product) => (
            <div
              key={product._id}
              className={`relative transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                removedIds.includes(product._id)
                  ? "opacity-0 scale-90 transition-all duration-300"
                  : ""
              }`}
            >
              {/* زر الحذف */}
              <button
                onClick={() => handleRemove(product._id)}
                className="absolute top-2 right-2 z-10  rounded-full p-2 shadow hover:bg-red-100 text-red-500"
              >
                <FaTimes />
              </button>

              {/* كرت المنتج */}
              <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                {/* صورة المنتج */}
                <div className="flex justify-center items-center h-48 sm:h-56 md:h-60 p-3 sm:p-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-contain max-h-full w-auto scale-105 transition-transform duration-200"
                  />
                </div>

                {/* محتوى الكرت */}
                <div className="p-3 sm:p-4 flex flex-col flex-1 justify-between">
                  <h3 className="text-center text-sm sm:text-base md:text-lg font-semibold mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-center text-green-600 font-bold text-base sm:text-lg mb-2 sm:mb-3">
                    ${product.price?.toFixed(2)}
                  </p>
                  <Link
                    to={`/product/${product._id}`}
                    className="text-center shadow-md border-t text-black py-1.5 sm:py-2 rounded-lg text-sm sm:text-base font-medium hover:bg-red-500 transition-colors"
                  >
                    Product Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
