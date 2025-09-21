import React from "react";
import { motion } from "framer-motion";
import { FaFacebookF, FaDribbble, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";

import chef1 from "../../assets/Chefs/11.jpg";
import chef2 from "../../assets/Chefs/12.jpg";
import chef3 from "../../assets/Chefs/13.jpg";
import chef4 from "../../assets/Chefs/14.jpg";
import arrow1 from "../../assets/17.png";
import  arrow2 from "../../assets/18.png";

// بيانات الشيفات
const chefs = [
  { id: 1, name: "Alexander Petllo", role: "Assistant Chef", img: chef1, delay: 0.1, offset: "-translate-y-6" },
  { id: 2, name: "Mendia Juxef", role: "Burger King", img: chef2, delay: 0.2, offset: "translate-y-4" },
  { id: 3, name: "Petro William", role: "Main Chef", img: chef3, delay: 0.3, offset: "-translate-y-4" },
  { id: 4, name: "Kunnel Jexos", role: "Pizza Master", img: chef4, delay: 0.4, offset: "translate-y-6" },
];

export default function ChefSection() {
  return (
    <section className="py-16" style={{ backgroundColor: "#ebe9e6" }}>
      <div className="max-w-7xl mx-auto px-4">
        {/* العنوان */}
        <div className="flex flex-col items-center mb-12">
  <div className="flex items-center justify-center">
    {/* Logo يسار */}
    <img src={arrow1} alt="Logo Left" className="lg:w-30 sm:w-10  mr-4" />

    <motion.h3
      className="text-red-800 font-semibold mb-2 text-xl sm:text-lg md:text-2xl lg:text-3xl"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      Professional Chefs
    </motion.h3>

    {/* Logo يمين */}
    <img src={arrow2} alt="Logo Right" className="lg:w-30 sm:w-10 ml-4" />
  </div>

  {/* العنوان الثاني منفصل */}
  <motion.h2
    className="lg:text-5xl md:text-4xl font-extrabold text-gray-800 leading-tight mt-2"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.2 }}
  >
    Meet Our Kitchen Kings
  </motion.h2>
</div>



        {/* الشبكة */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
          {chefs.map((chef) => (
            <motion.div
              key={chef.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6, delay: chef.delay }}
              viewport={{ once: true }}
              className={`text-center ${chef.offset}`}
            >
              {/* صورة */}
              <div className="relative group overflow-hidden rounded-2xl">
                <img
                  src={chef.img}
                  alt={chef.name}
                  className="w-full h-auto sm:h-96 md:h-110 object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* أيقونات السوشيال */}
                <motion.ul
                  initial={{ y: 40, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10"
                >
                  {[
                    { href: "https://facebook.com", icon: <FaFacebookF />, color: "border-blue-600 text-blue-600" },
                    { href: "https://dribbble.com", icon: <FaDribbble />, color: "border-pink-500 text-pink-500" },
                    { href: "https://linkedin.com", icon: <FaLinkedinIn />, color: "border-blue-700 text-blue-700" },
                  ].map((item, index) => (
                    <li key={index}>
                      <a
                        href={item.href}
                        className={`w-10 h-10 flex items-center justify-center rounded-full border ${item.color} bg-white hover:bg-orange-500 hover:border-orange-500 hover:text-white transition shadow-md text-lg`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {item.icon}
                      </a>
                    </li>
                  ))}
                </motion.ul>
              </div>

              {/* البيانات تحت الصورة */}
              <div className="mt-4">
                <h4 className="text-lg md:text-xl font-semibold text-gray-800">{chef.name}</h4>
                <span className="text-sm md:text-base text-gray-500">{chef.role}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* زر الانتقال لصفحة الشيفات */}
        <div className="mt-12 text-center">
          <Link
            to="/chefs"
            className="inline-block px-6 py-3 bg-orange-500 text-white font-semibold rounded-full shadow-lg hover:bg-orange-600 transition"
          >
            View All Chefs
          </Link>
        </div>
      </div>
    </section>
  );
}
