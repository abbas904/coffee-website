import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";

import { setCategories, setProducts, setChecked } from "../redux/shop/shopSlice";
import ProductCard from './products/ProductCard'

// Skeleton Card مع shimmer
const SkeletonCard = () => (
  <div className="animate-pulse bg-white rounded-lg shadow-md p-4 flex flex-col gap-3">
    <div className="h-40 bg-gray-200 rounded-md"></div>
    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
  </div>
);

const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector((state) => state.shop);

  const { data: categoriesData, isLoading: categoriesLoading } = useFetchCategoriesQuery();
  const { data: filteredData, isLoading: productsLoading } = useGetFilteredProductsQuery({ checked, radio });

  const [priceFilter, setPriceFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const [showSkeleton, setShowSkeleton] = useState(true);

  // Load Categories
  useEffect(() => {
    if (!categoriesLoading && categoriesData) {
      dispatch(setCategories(categoriesData));
    }
  }, [categoriesData, categoriesLoading, dispatch]);

  // Filter Products مع delay صغير لإظهار Skeleton
  useEffect(() => {
    if (!productsLoading && filteredData) {
      setShowSkeleton(true);
      setTimeout(() => {
        const filtered = filteredData.filter((p) =>
          priceFilter ? p.price.toString().includes(priceFilter.toString()) : true
        );
        dispatch(setProducts(filtered));
        setShowSkeleton(false);
      }, 300); // delay صغير لإظهار Skeleton حتى لو البيانات سريعة
    }
  }, [filteredData, productsLoading, checked, radio, priceFilter, dispatch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [products]);

  const handleBrandClick = (brand) => {
    const productsByBrand = filteredData?.filter((product) => product.brand === brand);
    dispatch(setProducts(productsByBrand || []));
  };

  const handleCheck = (value, id) => {
    const updatedChecked = value ? [...checked, id] : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
  };

  const handlePriceChange = (e) => setPriceFilter(e.target.value);

  const uniqueBrands = [...new Set(filteredData?.map((p) => p.brand).filter(Boolean))];

  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = products?.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil((products?.length || 0) / productsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="container mx-auto px-3 sm:px-6 md:px-8 py-4 sm:py-6">
  <div className="flex flex-col md:flex-row gap-4 sm:gap-6">

    {/* Sidebar */}
    <aside className="w-full md:w-64 bg-white/90 p-3 sm:p-4 border-t rounded-lg shadow-md flex-shrink-0 md:max-h-[90vh] md:overflow-y-auto">
      {/* Categories */}
      <div className="mb-4 sm:mb-6">
        <h2 className="text-center text-sm sm:text-base md:text-lg font-semibold py-2 bg-petPrimary rounded-full mb-3 sm:mb-4 text-white">
          Filter by Categories
        </h2>
        {categories?.map((c) => (
          <div key={c._id} className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={checked.includes(c._id)}
              onChange={(e) => handleCheck(e.target.checked, c._id)}
              className="w-4 h-4 text-pink-600"
            />
            <label className="ml-2 text-sm sm:text-base">{c.name}</label>
          </div>
        ))}
      </div>

      {/* Brands */}
      <div className="mb-4 sm:mb-6">
        <h2 className="text-center text-sm sm:text-base md:text-lg font-semibold py-2 bg-petPrimary rounded-full mb-3 sm:mb-4 text-white">
          Filter by Brands
        </h2>
        {uniqueBrands.map((brand) => (
          <div key={brand} className="flex items-center mb-2">
            <input
              type="radio"
              name="brand"
              onChange={() => handleBrandClick(brand)}
              className="w-4 h-4 text-pink-600"
            />
            <label className="ml-2 text-sm sm:text-base">{brand}</label>
          </div>
        ))}
      </div>

      {/* Price */}
      <div className="mb-4 sm:mb-6">
        <h2 className="text-center text-sm sm:text-base md:text-lg font-semibold py-2 bg-petPrimary rounded-full mb-3 sm:mb-4 text-white">
          Filter by Price
        </h2>
        <input
          type="text"
          placeholder="Enter Price"
          value={priceFilter}
          onChange={handlePriceChange}
          className="w-full px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border text-sm sm:text-base"
        />
      </div>

      <button
        className="w-full py-2 mt-3 sm:mt-4 bg-petPrimary text-white rounded-lg text-sm sm:text-base"
        onClick={() => window.location.reload()}
      >
        Reset Filters
      </button>
    </aside>

    {/* Products */}
    <main className="flex-1">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-petPrimary mb-3 sm:mb-4 text-center">
        Everything Your Pet Loves 🐾
      </h1>
      <p className="text-center text-gray-400 mb-6 sm:mb-8 text-sm sm:text-base">
        Premium food & accessories for happy pets
      </p>

      {/* Skeleton أو Products */}
      {showSkeleton ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {Array(productsPerPage).fill(0).map((_, idx) => <SkeletonCard key={idx} />)}
        </div>
      ) : products?.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {currentProducts.map((p) => <ProductCard key={p._id} p={p} />)}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row justify-center items-center mt-8 sm:mt-10 gap-2 sm:gap-4">
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className={`px-3 sm:px-4 py-2 rounded-lg font-semibold text-sm sm:text-base ${
                  currentPage === 1 ? "bg-gray-500 text-gray-300 cursor-not-allowed" : "bg-petPrimary text-white hover:bg-red-500"
                }`}
              >
                Prev
              </button>
              <span className="px-3 sm:px-4 py-2 font-semibold text-sm sm:text-base">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={`px-3 sm:px-4 py-2 rounded-lg font-semibold text-sm sm:text-base ${
                  currentPage === totalPages ? "bg-gray-300 text-gray-300 cursor-not-allowed" : "bg-petPrimary text-white hover:bg-red-500"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </main>
  </div>
</div>

  );
};

export default Shop;
