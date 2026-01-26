import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import Product from "./products/Product";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import BrandSection from '../components/BrandSection'
import Count from "../components/Count"
import Testimonials from '../components/Testimonials'
import  Footer  from "../components/Footer";
import FadeUpOnScroll from "../components/FadeUpOnScroll";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSpecialProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/api/products/special");
        // data هنا عبارة عن مصفوفة مباشرة
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.error || "حدث خطأ أثناء جلب البيانات");
        setLoading(false);
      }
    };

    fetchSpecialProducts();
  }, []);

  return (
    <>

    <HeroSection/>
    <AboutSection />
    <div className="relative" style={{ zIndex: 1 }}>
      <Header />
    </div>
    <div className="relative" style={{ zIndex: 10 }}>
       <BrandSection/>
    </div>
<FadeUpOnScroll delay={100}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-12 sm:mt-16 md:mt-20">

  {/* العنوان + زر Shop */}
  <div className="flex flex-col sm:flex-row items-center sm:items-center justify-between mb-4 gap-4">
    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] font-extrabold text-petPrimary text-center sm:text-left">
      Special Products
    </h1>

    <Link
      to="/shop"
      className="bg-petPrimary font-bold rounded-full py-2 px-6 sm:px-8 text-white hover:bg-pink-700 transition-colors text-sm sm:text-base"
    >
      Shop
    </Link>
    
  </div>

  {/* المحتوى */}
 {loading ? (
  <div className="flex justify-center items-center min-h-[50vh]">
    <Loader />
  </div>
) : error ? (
  <Message variant="danger">{error}</Message>
) : Array.isArray(products) && products.length > 0 ? (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
    {products.map((product) => (
      <Product key={product._id} product={product} />
    ))}
  </div>
) : (
  <p className="text-center text-gray-400 mt-10">لا يوجد منتجات</p>
)}

</div>
</FadeUpOnScroll>
  <Count/>
  <Testimonials/>
  <Footer/>
    </>
  
  );
};

export default Home;
