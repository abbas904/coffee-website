// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import Menu from "./pages/Menu";
import Chefs from "./pages/Chefs";
import AboutUs from "./pages/AboutUs";
import BlogSingleWithSidebar from "./components/blogwithsidebal/BlogSingleWithSidebar";
import Recipe from "./pages/Recipe";
import ChefDetails from "./pages/ChefDetails";
import MealsSlider from "./components/mealslider/MealsSlider";
import MealCategoryPage from "./components/mealcategory/MealCategoryPage";
import CheckOut from "./pages/CheckOut";

import { CartContextProvider } from "./components/context/CartContext";

export default function App() {
  return (
    <Router>
      <CartContextProvider>
        {/* Navbar لازم يكون جوه الـ Provider */}
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog-single-with-sidebar/:id" element={<BlogSingleWithSidebar />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/chefs" element={<Chefs />} />
          <Route path="/chefs-details/:id" element={<ChefDetails />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/meals" element={<MealsSlider />} />
          <Route path="/recipe/:id" element={<Recipe />} />
          <Route path= "cart" element={<Cart />} />
            <Route path="/checkout" element={<CheckOut />} />
          <Route path="/meals/:type" element={<MealCategoryPage />} />
        </Routes>

        <Footer />
      </CartContextProvider>
    </Router>
  );
}
