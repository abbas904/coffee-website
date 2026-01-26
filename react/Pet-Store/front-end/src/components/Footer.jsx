import React from "react";
import logo from "../assets/image/footer/logo.png";

const Footer = () => {
  return (
    <footer className="relative bg-lightCoffee text-gray-700">
      {/* الجزء العلوي للفوتر */}
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 sm:gap-10 md:gap-12">

          {/* Column 1: Special Offer */}
          <div className="flex-1 text-center sm:text-start">
            <h5 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900">
              Special Offer
            </h5>
        <p className="text-xs sm:text-sm leading-relaxed text-white">
  Premium Pet Care for Happy, Healthy Pets. Explore our high-quality food, toys, and accessories to keep your furry friends happy and healthy.
</p>

          </div>

          {/* Column 2: Logo */}
          <div className="flex-1 text-center">
            <a href="/" className="inline-block mb-3 sm:mb-4">
              <img
                src={logo}
                alt="Logo"
                className="mx-auto max-w-[120px] sm:max-w-[140px] md:max-w-[160px] w-full object-contain"
              />
            </a>
            <p className="text-white text-xs sm:text-sm">
              Premium pet care products for happier, healthier pets.
            </p>
          </div>

          {/* Column 3: Contact Us */}
          <div className="flex-1 text-center sm:text-end">
            <h5 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900">
              Contact Us
            </h5>
            <ul className="text-xs sm:text-sm space-y-2 text-white">
              <li>
                <address className="not-italic">
                  No: 58 A, East Madison Street, Baltimore, MD, USA 4508
                </address>
              </li>
              <li>Phone: +1 0000 - 123 - 456789</li>
              <li>
                <a
                  href="mailto:info@example.com"
                  className="hover:text-orange-500 transition-colors"
                >
                  Mail: info@example.com
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* الجزء السفلي للفوتر */}
      <div className="bg-gray-300 py-4 sm:py-6 mt-6 sm:mt-8 md:mt-10">
        <div className="container mx-auto px-4 sm:px-6 text-center text-xs sm:text-sm text-gray-600">
          &copy; {new Date().getFullYear()}  Pet Store. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
