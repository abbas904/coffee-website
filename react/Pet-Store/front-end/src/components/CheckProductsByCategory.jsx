import { useAllProductsQuery } from "../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";
import { useEffect } from "react";

const CheckProductsByCategory = () => {
  const { data: productsData, isLoading: productsLoading } = useAllProductsQuery();
  const { data: categories, isLoading: categoriesLoading } = useFetchCategoriesQuery();

  useEffect(() => {
    if (!productsLoading && !categoriesLoading) {
      const productsArray = productsData?.products || [];

      // مصفوفة المنتجات الفريدة لكل فئة
      const uniqueProducts = categories
        .map(cat => productsArray.find(p => p.category === cat._id))
        .filter(Boolean);

      console.log("=== Unique Products per Category ===");
      uniqueProducts.forEach(prod => {
        const cat = categories.find(c => c._id === prod.category);
        console.log(`Category: ${cat?.name}, Product: ${prod.name}`);
      });

      // عدد المنتجات لكل فئة
      const productsByCategory = categories.map(cat => {
        const matched = productsArray.filter(p => p.category === cat._id);
        return { category: cat.name, count: matched.length };
      });

      console.log("=== Products Count per Category ===");
      console.table(productsByCategory);
    }
  }, [productsData, categories, productsLoading, categoriesLoading]);

  return null; // لا حاجة لعرض شيء على الصفحة
};

export default CheckProductsByCategory;
