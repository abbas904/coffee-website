import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import mlogo from "../../assets/logo.png"; // استبدل باللوجو عندك

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        {/* الشعار */}
        <div className="mb-6 md:mb-0">
          <img src={mlogo} alt="Logo" className="w-32 mx-auto md:mx-0" />
        </div>

        {/* روابط Footer */}
        <div className="flex flex-col sm:flex-row gap-6 text-sm mb-6 md:mb-0">
          <a href="/" className="hover:text-red-500 transition">
            Home
          </a>
          <a href="/about" className="hover:text-red-500 transition">
            About
          </a>
          <a href="/blog" className="hover:text-red-500 transition">
            Blog
          </a>
          <a href="/contact" className="hover:text-red-500 transition">
            Contact
          </a>
        </div>

        {/* أيقونات سوشيال */}
        <div className="flex gap-4 text-gray-400">
          <a href="#" className="hover:text-red-500 transition">
            <FaFacebookF />
          </a>
          <a href="#" className="hover:text-red-500 transition">
            <FaTwitter />
          </a>
          <a href="#" className="hover:text-red-500 transition">
            <FaInstagram />
          </a>
          <a href="#" className="hover:text-red-500 transition">
            <FaLinkedinIn />
          </a>
        </div>
      </div>

      {/* حقوق الملكية */}
      <div className="mt-6 text-center text-gray-400 text-xs">
        © {new Date().getFullYear()} Your Company. All Rights Reserved.
      </div>
    </footer>
  );
}
