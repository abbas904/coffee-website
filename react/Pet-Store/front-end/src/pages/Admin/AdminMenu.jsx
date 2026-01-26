import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaTimes, FaBars } from "react-icons/fa";

const AdminMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="
          fixed top-5 right-5 z-50
          bg-[#FF6B6B]
          p-3 rounded-full
          shadow-lg
          hover:bg-[#FF6B6B]
          transition
          flex items-center justify-center
        "
      >
        {isMenuOpen ? (
          <FaTimes size={18} color="#FFFFFF" /> // الأكس باللون الأبيض
        ) : (
          <FaBars size={18} color="black" /> // البار باللون الأسود
        )}
      </button>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          onClick={() => setIsMenuOpen(false)}
          className="fixed inset-0 bg-black opacity-20 z-40"
        />
      )}

      {/* Side Menu */}
      <aside
        className={`
          fixed top-0 right-0 h-full w-64
          bg-[#FF6B6B] text-white
          z-50
          transform transition-transform duration-300
          ${isMenuOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="p-6 border-b border-white flex justify-between items-center">
          <h2 className="text-lg font-semibold">Admin Panel</h2>
          {/* زر الإغلاق داخل القائمة */}
          <button
            onClick={() => setIsMenuOpen(false)}
            className="text-white hover:text-black transition"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <ul className="p-4 space-y-2">
          {[
            { to: "/admin/dashboard", label: "Dashboard" },
            { to: "/admin/categorylist", label: "Categories" },
            { to: "/admin/productlist", label: "Create Product" },
            { to: "/admin/allproductslist", label: "All Products" },
            { to: "/admin/userlist", label: "Users" },
            { to: "/admin/orderlist", label: "Orders" },
          ].map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                onClick={() => setIsMenuOpen(false)} // ✅ تغلق القائمة عند الضغط على أي رابط
                className={({ isActive }) =>
                  `
                  block px-4 py-2 rounded-md
                  transition
                  ${isActive
                    ? "bg-black text-white"
                    : "text-white hover:bg-black hover:text-white"
                  }
                `
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
};

export default AdminMenu;
