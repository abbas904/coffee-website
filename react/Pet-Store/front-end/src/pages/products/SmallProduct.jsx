import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../redux/features/favorite/favoriteSlice";
import {
  addFavoriteToLocalStorage,
  removeFavoriteFromLocalStorage,
} from "../../utils/LocalStorage";

const SmallProduct = ({ product, showButton }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites) || [];

  const isFavorite = favorites.some((p) => p._id === product._id);

  const toggleFavorites = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(product));
      removeFavoriteFromLocalStorage(product._id);
    } else {
      dispatch(addToFavorites(product));
      addFavoriteToLocalStorage(product);
    }
  };

  return (
    <div className="w-[20rem] p-5 m-3 border-t flex flex-col rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition duration-200">
      {/* صورة المنتج */}
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-contain hover:scale-105 transition-transform duration-200 cursor-pointer"
        />

        {/* قلب المفضلة */}
        <div
          className="absolute top-0 right-0 z-20 p-2 cursor-pointer hover:scale-110 transition-transform duration-200 flex items-center justify-center bg-white/90 rounded-full shadow-md"
          onClick={toggleFavorites}
        >
          {isFavorite ? (
            <FaHeart className="text-petPrimary text-lg" />
          ) : (
            <FaRegHeart className="text-black text-lg hover:text-red-500 transition-colors" />
          )}
        </div>
      </div>

      {/* تفاصيل المنتج */}
      <div className="p-4 flex flex-col flex-1">
        <Link to={`/product/${product._id}`}>
          <h2 className="flex justify-between items-center font-bold text-black mb-2">
            <span>{product.name}</span>
            <span className="text-white text-xs font-bold px-2.5 py-0.5 rounded-full bg-petPrimary">
              ${product.price}
            </span>
          </h2>
        </Link>

        {/* وصف المنتج */}
        {product.description && (
          <p className="text-petPrimary text-sm mb-4 line-clamp-3">
            {product.description}
          </p>
        )}

        {/* زر التفاصيل يظهر فقط إذا showButton = true */}
        {showButton && (
          <Link
            to={`/product/${product._id}`}
            className="mt-auto bg-petPrimary hover:bg-red-500 text-white text-center py-2 rounded-lg transition-colors duration-200"
          >
            View Details
          </Link>
        )}
      </div>
    </div>
  );
};

export default SmallProduct;
