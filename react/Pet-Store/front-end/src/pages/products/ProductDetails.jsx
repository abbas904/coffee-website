import React, { useState } from "react";
import {
  useCreateReviewMutation,
  useGetProductDetailsQuery,
} from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import moment from "moment";
import HeartIcon from "./HeartIcon";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector ,useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Ratings from "./Ratings";
import ProductTabs from "./ProductTabs";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/features/Cart/cartSlice";


const ProductDetails = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);
  const { userInfo } = useSelector((state) => state.auth);
  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();
  console.log(product);
const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review created successfully");
    } catch (error) {
      toast.error(error?.data || error.message);
    }
  };
    const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  return (
    <>
      <div className="px-4 sm:px-6">
        <Link
          to="/"
          className="text-petPrimary font-semibold hover:underline text-sm sm:text-base"
        >
          ← Go Back
        </Link>
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <>
          <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-10">
            {/* Back */}
            <Link
              to="/"
              className="inline-block mb-4 sm:mb-6 text-petPrimary font-semibold hover:underline text-sm sm:text-base"
            >
              ← Back to Home
            </Link>

            {isLoading ? (
              <Loader />
            ) : error ? (
              <Message variant="danger">
                {error?.data?.message || error.message}
              </Message>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
                {/* Image */}
                <div className="relative bg-white rounded-2xl border-1 shadow-lg p-3 sm:p-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] object-contain"
                  />
                  <HeartIcon product={product} />
                </div>

                {/* Details */}
                <div className="flex flex-col gap-4 sm:gap-6">
                  <h2 className="text-2xl sm:text-3xl font-extrabold">{product.name}</h2>

                  <p className="text-black leading-relaxed text-sm sm:text-base">
                    {product.description}
                  </p>

                  <p className="text-3xl sm:text-4xl font-bold text-petPrimary">
                    ${product.price}
                  </p>

                  {/* Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 rounded-xl">
                    <p className="flex items-center gap-2 text-sm sm:text-base">
                      <FaStore /> Brand: {product.brand}
                    </p>
                    <p className="flex items-center gap-2 text-sm sm:text-base">
                      <FaClock /> Added: {moment(product.createAt).fromNow()}
                    </p>
                    <p className="flex items-center gap-2 text-sm sm:text-base">
                      <FaStar /> Reviews: {product.reviews?.length || 0}
                    </p>
                    <p className="flex items-center gap-2 text-sm sm:text-base">
                      <FaBox /> In Stock: {product.countInStock}
                    </p>
                  </div>

                  {/* Rating + Qty */}
                  <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4">
                    <Ratings
                      value={product.rating || 0}
                      text={`${product.reviews?.length || 0} reviews`}
                    />

                    {product.countInStock > 0 && (
                      <select
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                        className="p-2 rounded-lg text-black w-20 sm:w-24 border-2 text-center text-sm sm:text-base"
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>

                  {/* Button */}
                  <button
                       onClick={addToCartHandler}
                    disabled={product.countInStock === 0}
                    className="bg-petPrimary hover:bg-red-500 transition text-white py-2.5 sm:py-3 rounded-xl font-bold disabled:opacity-50 text-sm sm:text-base"
                  >
                    <FaShoppingCart className="inline mr-2" />
                    Add To Cart
                  </button>
                </div>
                  <div className="mt-8 sm:mt-12 md:mt-16 container mx-auto px-4 sm:px-6 flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-10">
              <ProductTabs
                loadingProductReview={loadingProductReview}
                userInfo={userInfo}
                submitHandler={submitHandler}
                rating={rating}
                setRating={setRating}
                comment={comment}
                setComment={setComment}
                product={product}
              />
            </div>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetails;
