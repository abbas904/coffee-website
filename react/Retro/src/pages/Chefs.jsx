import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroBg from "../assets/21.jpg";
import chef1 from "../assets/Chefs/8.jpg";
import chef2 from "../assets/Chefs/11.jpg";
import chef3 from "../assets/Chefs/12.jpg";
import chef4 from "../assets/Chefs/13.jpg";
import chef5 from "../assets/Chefs/14.jpg";
import chef6 from "../assets/Chefs/15.jpg";
import chef7 from "../assets/Chefs/16.jpg"; 
import chef8 from "../assets/Chefs/8.jpg";

import { fadeIn, staggerContainer } from "../utils/motion";

const chefsData = [
  { id: 1, name: "Alexander Petllo", role: "Assistant Chef", img: chef1 },
  { id: 2, name: "Mendia Juxef", role: "Burger King", img: chef2 },
  { id: 3, name: "Petro William", role: "Main Chef", img: chef3 },
  { id: 4, name: "Kunnel Jexos", role: "Pizza Master", img: chef4 },
  { id: 5, name: "Alexander Petllo", role: "Assistant Chef", img: chef5 },
  { id: 6, name: "Istiak Ahmed", role: "Main Chef", img: chef6 },
  { id: 7, name: "Mendia Juxef", role: "Burger King", img: chef7 },
  { id: 8, name: "Kunnel Jexos", role: "Pizza Master", img: chef8 },
];

// مصفوفة لتفاوت ارتفاع الكروت
const cardTranslateY = [-30, 20, -20, 15, -25, 10, -15, 25];

export default function Chefs() {
  return (
    <div>
      {/* Hero / Breadcrumb */}
      <div
        className="relative bg-cover bg-center text-center text-light py-32"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10">
          <motion.h1
            className="text-5xl md:text-6xl font-bold text-red-600 mb-4"
            variants={fadeIn("up", "tween", 0, 0.6)}
            initial="hidden"
            animate="show"
          >
            Our Chefs
          </motion.h1>
          <ul className="breadcrumb flex justify-center gap-2 text-white">
            <li>
              <Link to="/" className="hover:underline">
                <i className="fas fa-home mr-1"></i> Home /
              </Link>
            </li>
            <li>Chefs</li>
          </ul>
        </div>
      </div>

      {/* Section header */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto text-center mb-12">
          <motion.h2
            className="text-4xl font-bold text-gray-900 mb-4"
            variants={fadeIn("up", "tween", 0, 0.5)}
            initial="hidden"
            animate="show"
          >
            Meet Our Chefs
          </motion.h2>
          <motion.p
            className="text-red-600 text-lg font-serif"
            variants={fadeIn("up", "tween", 0.2, 0.5)}
            initial="hidden"
            animate="show"
          >
            Talented and experienced chefs who make every dish special
          </motion.p>
        </div>

        {/* Chefs Grid with animation */}
        <motion.div
          className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={staggerContainer(0.2, 0.1)}
          initial="hidden"
          animate="show"
        >
          {chefsData.map((chef, index) => (
            <motion.div
              key={chef.id}
              className="chef-one-single mb-10"
              style={{ transform: `translateY(${cardTranslateY[index]}px)` }}
              variants={fadeIn("up", "spring", index * 0.2, 0.5)}
              initial="hidden"
              animate="show"
            >
              <div className="chef-style-one-item bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 flex flex-col">
                {/* Thumb */}
                <div className="thumb relative w-full aspect-[4/5]">
                  <img
                    src={chef.img}
                    alt={chef.name}
                    className="w-full h-full object-cover"
                  />
                  <ul className="chef-one-social absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
                    <li>
                      <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                    </li>
                    <li>
                      <a href="https://dribbble.com" target="_blank" rel="noreferrer">
                        <i className="fab fa-dribbble"></i>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
                        <i className="fab fa-linkedin-in"></i>
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Info */}
                <div className="info p-6 text-center flex-1 flex flex-col justify-end">
                  <h4 className="text-xl font-bold mb-1">
                    <Link to={`/chefs-details/${chef.id}`} className="hover:text-red-600">
                      {chef.name}
                    </Link>
                  </h4>
                  <span className="text-gray-500">{chef.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
