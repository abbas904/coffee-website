import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Navigation.css";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import FavoritesCount from "../products/FavoriteCount";
import "./Navigation.css";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
      setDropdownOpen(false); // تغلق القائمة بعد تسجيل الخروج
    } catch (error) {
      console.error(error);
    }
  };

  // دالة تغلق القائمة تلقائي عند الضغط على أي رابط
  const handleLinkClick = () => {
    setDropdownOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <div
        style={{ zIndex: 9999 }}
        className={`hidden lg:flex flex-col justify-between p-4 text-white bg-[#D8BFAA] w-[4%] hover:w-[15%] h-[100vh] fixed`}
        id="navigation-container"
      >
      {/* ===== القائمة الرئيسية ===== */}
      <div className="flex flex-col justify-center space-y-4">
        <Link
          to="/"
          onClick={handleLinkClick}
          className="flex items-center transition-transform transform hover:translate-x-2 text-gray-800"
        >
          <AiOutlineHome className="mr-2 mt-[3rem] text-gray-800" size={26} />
          <span className="hidden nav-item-name mt-[3rem]">HOME</span>
        </Link>

        <Link
          to="/shop"
          onClick={handleLinkClick}
          className="flex items-center transition-transform transform hover:translate-x-2 text-gray-800"
        >
          <AiOutlineShopping className="mr-2 mt-[3rem] text-gray-800" size={26} />
          <span className="hidden nav-item-name mt-[3rem]">SHOP</span>
        </Link>

        <Link to="/cart" className="flex relative" onClick={handleLinkClick}>
          <div className="flex items-center transition-transform transform hover:translate-x-2">
            <AiOutlineShoppingCart
              className="mt-[3rem] mr-2 text-gray-800"
              size={26}
            />
            <span className="hidden nav-item-name mt-[3rem] text-black">Cart</span>
          </div>

          {cartItems.length > 0 && (
            <div className="absolute top-9">
              <span className="px-1 py-0 text-sm text-black bg-petPrimary rounded-full">
                {cartItems.reduce((a, c) => a + c.qty, 0)}
              </span>
            </div>
          )}
        </Link>

        <Link to="/favorite" className="flex relative" onClick={handleLinkClick}>
          <div className="flex justify-center items-center transition-transform transform hover:translate-x-2">
            <FaHeart className="mt-[3rem] mr-2 text-red-500" size={20} />
            <span className="hidden nav-item-name mt-[3rem] text-black">Favorites</span>
            <FavoritesCount />
          </div>
        </Link>
      </div>

      {/* ===== Dropdown المستخدم ===== */}
      <div className="relative  ">
        <button
          onClick={toggleDropdown}
          className="flex items-center text-gray-800 focus:outline-none"
        >
          {userInfo && <span className="text-gray-800">{userInfo.username}</span>}
          {userInfo && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 ml-1 ${dropdownOpen ? "transform rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="gray"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
              />
            </svg>
          )}
        </button>

        {dropdownOpen && userInfo && (
          <ul
            className={`absolute left-14 mt-2 mr-14 space-y-2 bg-white text-gray-600 ${
              !userInfo.isAdmin ? "-top-20" : "-top-80"
            } shadow-lg rounded-md`}
          >
            {userInfo.isAdmin && (
              <>
                <li>
                  <Link
                    to="/admin/dashboard"
                    onClick={handleLinkClick}
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/productlist"
                    onClick={handleLinkClick}
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/categorylist"
                    onClick={handleLinkClick}
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Category
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/orderlist"
                    onClick={handleLinkClick}
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Orders
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/userlist"
                    onClick={handleLinkClick}
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Users
                  </Link>
                </li>
              </>
            )}

            <li>
              <Link
                to="/profile"
                onClick={handleLinkClick}
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Profile
              </Link>
            </li>
            <li>
              <button
                onClick={logoutHandler}
                className="block w-full px-4 py-2 text-left hover:bg-gray-100"
              >
                Logout
              </button>
            </li>
          </ul>
        )}

        {!userInfo && (
          <ul>
            <li>
              <Link
                to="/login"
                onClick={handleLinkClick}
                className="flex items-center mt-5 transition-transform transform hover:translate-x-2 text-gray-800"
              >
                <AiOutlineLogin className="mr-2 mt-[4px]" size={26} />
                <span className="hidden nav-item-name">LOGIN</span>
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                onClick={handleLinkClick}
                className="flex items-center mt-5 transition-transform transform hover:translate-x-2 text-gray-800"
              >
                <AiOutlineUserAdd size={26} />
                <span className="hidden nav-item-name">REGISTER</span>
              </Link>
            </li>
          </ul>
        )}
      </div>
      </div>

      {/* Mobile Navigation */}
      <div
        style={{ zIndex: 9999 }}
        className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#D8BFAA] border-t border-gray-300 shadow-lg"
      >
        <div className="flex justify-around items-center py-2 px-2">
          <Link
            to="/"
            onClick={handleLinkClick}
            className="flex flex-col items-center justify-center p-2 text-gray-800 hover:text-petPrimary transition-colors"
          >
            <AiOutlineHome size={24} />
            <span className="text-xs mt-1">Home</span>
          </Link>

          <Link
            to="/shop"
            onClick={handleLinkClick}
            className="flex flex-col items-center justify-center p-2 text-gray-800 hover:text-petPrimary transition-colors"
          >
            <AiOutlineShopping size={24} />
            <span className="text-xs mt-1">Shop</span>
          </Link>

          <Link
            to="/cart"
            onClick={handleLinkClick}
            className="flex flex-col items-center justify-center p-2 text-gray-800 hover:text-petPrimary transition-colors relative"
          >
            <AiOutlineShoppingCart size={24} />
            {cartItems.length > 0 && (
              <span className="absolute top-0 right-0 bg-petPrimary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItems.reduce((a, c) => a + c.qty, 0)}
              </span>
            )}
            <span className="text-xs mt-1">Cart</span>
          </Link>

         <Link
  to="/favorite"
  onClick={handleLinkClick}
  className="flex flex-col items-center justify-center p-2 text-gray-800 hover:text-petPrimary transition-colors relative"
>
  <div className="relative">
    <FaHeart size={20} className="text-red-500" />
    <span className="absolute -top-10 -right-1 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
      <FavoritesCount />
    </span>
  </div>
  <span className="text-xs mt-1">Favorites</span>
</Link>


          {userInfo ? (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex flex-col items-center justify-center p-2 text-gray-800 hover:text-petPrimary transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span className="text-xs mt-1 truncate max-w-[60px]">{userInfo.username}</span>
              </button>

              {dropdownOpen && (
                <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-xl min-w-[200px]">
                  <ul className="py-2">
                    {userInfo.isAdmin && (
                      <>
                        <li>
                          <Link
                            to="/admin/dashboard"
                            onClick={handleLinkClick}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Dashboard
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/admin/productlist"
                            onClick={handleLinkClick}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Products
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/admin/categorylist"
                            onClick={handleLinkClick}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Category
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/admin/orderlist"
                            onClick={handleLinkClick}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Orders
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/admin/userlist"
                            onClick={handleLinkClick}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Users
                          </Link>
                        </li>
                      </>
                    )}
                    <li>
                      <Link
                        to="/profile"
                        onClick={handleLinkClick}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={logoutHandler}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/login"
                onClick={handleLinkClick}
                className="flex flex-col items-center justify-center p-2 text-gray-800 hover:text-petPrimary transition-colors"
              >
                <AiOutlineLogin size={24} />
                <span className="text-xs mt-1">Login</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navigation;
