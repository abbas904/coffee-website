import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/Cart/cartSlice";
import { toast } from "react-toastify";
import HeartIcon from "./HeartIcon";

const ProductCard = ({ p }) => {
  const dispatch = useDispatch();

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  toast.success("Item added successfully", {
  position: "top-right",  // هنا مباشرة string
  autoClose: 1000,
});

  };

  return (
    <div className="relative flex flex-col bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group">
      
      {/* صورة المنتج */}
      <div className="relative overflow-hidden h-48 md:h-56 bg-gray-50 flex items-center justify-center">
        <Link to={`/product/${p._id}`} className="absolute inset-0 flex items-center justify-center">
          <img
            src={p.image}
            alt={p.name}
            className="max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        <span className="absolute bottom-3 right-3 bg-white/90 text-black text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
          {p?.brand}
        </span>

        <HeartIcon product={p} />
      </div>

      {/* محتوى الكرت */}
      <div className="p-5 flex flex-col flex-1">
        {/* العنوان والسعر */}
        <div className="flex justify-between items-start mb-3">
          <h5 className="text-lg md:text-xl font-semibold text-petPrimary line-clamp-2 min-h-[3rem]">
            {p?.name}
          </h5>
          <p className="text-black font-bold p-2 text-sm md:text-base whitespace-nowrap">
            {p?.price?.toLocaleString("en-US", { style: "currency", currency: "USD" })}
          </p>
        </div>

        {/* الوصف */}
        <p className="text-gray-900 text-sm md:text-base mb-5 line-clamp-3 min-h-[4.5rem]">
          {p?.description}
        </p>

        {/* الأزرار دايمًا تحت */}
        <div className="flex justify-between items-center mt-auto">
          <Link
            to={`/product/${p._id}`}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-black bg-petCardBg rounded-lg hover:bg-red-500 transition-colors"
          >
            Read More
            <svg
              className="w-3.5 h-3.5 ml-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>

          <button
            className="p-2 bg-petPrimary rounded-full text-white hover:bg-pink-700 hover:scale-110 transition-transform duration-300"
            onClick={() => addToCartHandler(p, 1)}
          >
            <AiOutlineShoppingCart size={25} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
