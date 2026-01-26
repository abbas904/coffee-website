import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useAllProductsQuery } from "../../redux/api/ProductApiSlice";
import AdminMenu from "./AdminMenu";

const AllProducts = () => {
  const { data, isLoading, isError } = useAllProductsQuery();
  const products = data?.products || [];
  const navigate = useNavigate();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading products</div>;

  return (
    <div className="container mx-auto ">
      {/* Main Layout */}
      <div className="grid grid-cols-1 ">
        
        {/* Products Section */}
        <div className="p-2">
          <div className="text-xl font-bold h-12 mb-2 mt-4 text-center md:text-left">
            All Products ({products.length})
          </div>

          {/* Centered Products Grid */}
          <div className="flex justify-center">
            <div className="w-full max-w-[85rem]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 place-items-center">
                {products.map((product) => (
                  <div
                    key={product._id}
                    className="w-full max-w-[38rem] cursor-pointer"
                    onClick={() =>
                      navigate(`/admin/product/update/${product._id}`)
                    }
                  >
                    <div className="flex bg-[#FFF0E0] hover:scale-105 transition-all duration-300 rounded-lg shadow-xl overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
className="w-[15rem] h-[15rem] object-cover border rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"

                      />

                      <div className="p-4 flex flex-col justify-between w-full">
                        <div className="flex justify-between items-start gap-2">
                          <h5 className="text-lg font-semibold text-black">
                            {product.name}
                          </h5>
                          <p className="text-customRed text-xs whitespace-nowrap">
                            {moment(product.createdAt).format("MMMM Do YYYY")}
                          </p>
                        </div>

                        <p className="text-customRed  text-sm mt-2 line-clamp-3">
                          {product.description}
                        </p>

                        <div className="flex justify-between items-center mt-4">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(
                                `/admin/product/update/${product._id}`
                              );
                            }}
                            className="px-3 py-2 text-sm font-medium text-black bg-customRed rounded-lg hover:bg-red-500 hover:scale-105 transition"
                          >
                            Update Product
                          </button>
                          <p className="font-semibold">$ {product.price}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Admin Menu */}
        <div className="p-3">
          <AdminMenu />
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
