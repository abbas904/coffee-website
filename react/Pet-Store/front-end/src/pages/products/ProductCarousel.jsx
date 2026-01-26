import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import { FaBox, FaClock, FaShoppingCart, FaStar, FaStore } from "react-icons/fa";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  const settings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 1000,  // عدلت من 1000 → 3000ms أفضل للعرض
    pauseOnHover: true,
  };

  return (
    <div className="w-full min-h-[400px] sm:min-h-[500px] md:min-h-[600px] mb-8">
      {isLoading ? null : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Slider
          {...settings}
          className="w-full border-2 rounded-lg "
        >
          {products.map(
            ({
              image,
              _id,
              name,
              price,
              description,
              brand,
              createdAt,
              numReviews,
              rating,
              quantity,
              countInStock,
            }) => (
              <div
                key={_id}
                className="px-2 sm:px-4 flex flex-col h-full rounded-lg shadow-lg"
              >
                <img
                  src={image}
                  alt={name}
                  className="w-full aspect-[4/3] rounded-lg object-cover mt-2"
                />

                <div className="mt-2 flex flex-col justify-between flex-1 text-petPrimary">
                  <h2 className="text-lg font-bold">{name}</h2>
                  <p className="text-green-600 font-bold text-lg">$ {price}</p>
                  <p className="text-sm text-black mt-2 line-clamp-3">
                    {description.substring(0, 120)}...
                  </p>

                  <div className="flex justify-between mt-4 text-sm sm:text-base">
                    <div className="space-y-1">
                      <p className="flex items-center">
                        <FaStore className="mr-2 text-pink-500" /> {brand}
                      </p>
                      <p className="flex items-center">
                        <FaClock className="mr-2 text-pink-500" />{" "}
                        {moment(createdAt).fromNow()}
                      </p>
                      <p className="flex items-center">
                        <FaStar className="mr-2 text-yellow-400" /> {numReviews} Reviews
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="flex items-center">
                        <FaStar className="mr-2 text-yellow-400" /> {Math.round(rating)} Ratings
                      </p>
                      <p className="flex items-center">
                        <FaShoppingCart className="mr-2 text-blue-500" /> Qty: {quantity}
                      </p>
                      <p className="flex items-center">
                        <FaBox className="mr-2 text-green-500" /> In Stock: {countInStock}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </Slider>
      )}
    </div>
  );
};

export default ProductCarousel;
