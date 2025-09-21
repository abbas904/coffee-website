import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../assets/logo.png";
import logoBlack from "../../assets/logoBlack.png";
import { CartContext } from "../context/CartContext";
import { fadeIn, staggerContainer } from "../../utils/motion"; // استورد الـ animations

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const { cart, numsItems, cartTotal } = useContext(CartContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Detect scroll past hero
  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = document.getElementById("home")?.offsetHeight || 0;
      setScrolledPastHero(window.scrollY > heroHeight - 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active link styling
  const isActive = (path) => location.pathname === path;

  const linkClasses = (path) =>
    `border border-transparent rounded-md px-4 py-1 transition-all duration-500 font-sans ${
      scrolledPastHero
        ? isActive(path)
          ? "text-red-600 border-red-600"
          : "text-black hover:text-red-600"
        : isActive(path)
        ? "text-red-500 border-red-500"
        : "text-white hover:text-red-400"
    }`;

  return (
    <motion.nav
      className={`fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-4 flex items-center justify-between transition-all duration-500 backdrop-blur-md ${
        scrolledPastHero
          ? "bg-white/95 shadow-md border-black/20"
          : "bg-transparent border-white/50"
      }`}
      variants={fadeIn("down", "tween", 0, 0.5)}
      initial="hidden"
      animate="show"
    >
      {/* Desktop Left Links */}
      <ul className="hidden md:flex space-x-6 text-lg font-semibold">
        <li className={linkClasses("/")}>
          <Link to="/">Home</Link>
        </li>
        <li className={`relative group ${linkClasses("/about")}`}>
          <span className="flex items-center gap-1 cursor-pointer">Pages ▼</span>
          <ul className="absolute left-0 mt-2 rounded-lg shadow-lg w-44 text-left bg-white text-black opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transform origin-top transition-all duration-300 z-50">
            <li className="px-4 py-2 rounded-md hover:bg-gray-100">
              <Link to="/about">About Us</Link>
            </li>
            <li className="px-4 py-2 rounded-md hover:bg-gray-100">
              <Link to="/chefs">Chefs</Link>
            </li>
          </ul>
        </li>
        <li className={linkClasses("/menu")}>
          <Link to="/menu">Menu</Link>
        </li>
      </ul>

      {/* Logo Center */}
      <motion.div
        className="absolute left-1/2 transform -translate-x-1/2"
        initial={{ y: 0 }}
        animate={{ y: scrolledPastHero ? -2 : 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <img
          src={scrolledPastHero ? logoBlack : logo}
          alt="Logo"
          className="h-12 w-auto transition-all duration-500"
        />
      </motion.div>

      {/* Desktop Right Links */}
      <ul className="hidden md:flex items-center space-x-6 text-lg font-semibold relative">
        <li className={linkClasses("/blog")}>
          <Link to="/blog">Blog</Link>
        </li>
        <li className={linkClasses("/contact")}>
          <Link to="/contact">Contact</Link>
        </li>

        {/* Cart */}
        <li
          className="relative flex items-center cursor-pointer"
          onMouseEnter={() => setCartOpen(true)}
          onMouseLeave={() => setCartOpen(false)}
        >
          <ShoppingCart size={24} className={scrolledPastHero ? "text-black" : "text-white"} />
          {numsItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {numsItems}
            </span>
          )}
          <AnimatePresence>
            {cartOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 top-10 w-80 sm:w-96 bg-white shadow-xl border rounded-lg p-4 z-50 flex flex-col"
              >
                <h3 className="font-semibold text-lg mb-2">Your Order</h3>
                <div className="max-h-80 sm:max-h-96 overflow-y-auto">
                  {cart.length === 0 && <p className="text-gray-500">Cart is empty</p>}
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center mb-2 p-2 rounded hover:bg-gray-50 transition"
                    >
                      <div className="flex items-center gap-2">
                        <img src={item.image} alt={item.title} className="w-10 h-10 object-cover rounded" />
                        <span className="text-sm">{item.title} x {item.quantity}</span>
                      </div>
                      <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 border-t pt-2 flex justify-between items-center font-semibold">
                  <span>Total:</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="mt-3 flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={() => navigate("/cart")}
                    className="flex-1 text-center bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                  >
                    Go to Cart
                  </button>
                  <button
                    onClick={() => navigate("/checkout")}
                    className="flex-1 text-center bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
                  >
                    Checkout
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </li>
      </ul>

      {/* Hamburger */}
      <button
        className="md:hidden flex items-center text-white z-50"
        onClick={() => setMobileMenuOpen((prev) => !prev)}
      >
        {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="absolute top-full left-0 w-full bg-white shadow-md md:hidden z-40"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <ul className="flex flex-col gap-2 p-4 text-black font-semibold">
              {["/", "/about", "/chefs", "/menu", "/blog", "/contact"].map((path, i) => (
                <li key={i} className="px-4 py-2 border-b border-gray-200">
                  <Link to={path}>{path.replace("/", "") || "Home"}</Link>
                </li>
              ))}
              <li className="px-4 py-2 flex items-center border-b border-gray-200 relative">
                <Link to="/cart" className="flex items-center gap-2">
                  <ShoppingCart size={20} />
                  {numsItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                      {numsItems}
                    </span>
                  )}
                  Cart
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
