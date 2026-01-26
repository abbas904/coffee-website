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
import { Link } from "react-router-dom";

const Product = ({ product }) => {
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
    <div className="rounded-2xl shadow-md hover:shadow-xl border-t hover:scale-105 transition-all duration-300 overflow-hidden w-full max-w-[260px] flex flex-col mx-auto">
      
      {/* صورة المنتج */}
      <div className="relative w-full aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain p-4 transition-transform duration-200 hover:scale-105"
        />

        {/* القلب */}
        <div
          className="absolute top-2 right-2 z-20 p-2 cursor-pointer hover:scale-110 transition-transform duration-200 flex items-center justify-center"
          onClick={toggleFavorites}
        >
          {isFavorite ? (
            <FaHeart className="text-petPrimary text-lg" />
          ) : (
            <FaRegHeart className="text-gray-400 text-lg hover:text-red-500 transition-colors" />
          )}
        </div>
      </div>

      {/* محتوى الكارد */}
      <div className="p-4 flex flex-col flex-1">
        <h2 className="text-gray-800 font-medium text-md leading-snug line-clamp-2 min-h-[40px] text-center">
          {product.name}
        </h2>

        <p className="text-green-600 font-bold text-lg mt-2 text-center">
          ${product.price?.toFixed(2)}
        </p>

        <Link
          to={`/product/${product._id}`}
          className="mt-auto text-center bg-white/90 border-t shadow-md text-black py-2 rounded-full text-sm font-medium hover:bg-red-500 transform duration-200"
        >
          Product Details
        </Link>
      </div>
    </div>
  );
};

export default Product;
