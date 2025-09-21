// src/components/mealsSlider/MealsSlider.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// صور لكل كاتيجوري
import snackImg from "../../assets/Gallery/10.jpg";
import lunchImg from "../../assets/Gallery/1.jpg";
import dinnerImg from "../../assets/Gallery/7.jpg";
import breakfastImg from "../../assets/Gallery/5.jpg";
import Image from "../../assets/banners/20.png";// الخلفية من public


const categories = [
  { title: "Snack", api: "snack", img: snackImg },
  { title: "Lunch", api: "lunch", img: lunchImg },
  { title: "Dinner", api: "dinner", img: dinnerImg },
  { title: "Breakfast", api: "breakfast", img: breakfastImg },
];

export default function MealsSlider() {
  const navigate = useNavigate();

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, type: "spring" },
    }),
  };

  return (
    <section
      className="py-12 bg-cover bg-center relative"
      style={{ backgroundImage: `url(${Image})` }}
    >
      <div className="container mx-auto px-4 relative z-10">
        {/* العنوان الرئيسي */}
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-center mb-16 text-gray-900"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Explore Our <span className="text-red-600">Delicious Meals</span>
        </motion.h2>

        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          modules={[Pagination, Autoplay]}
          autoplay={{ delay: 1000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="!pb-12"
        >
          {categories.map((cat, i) => (
            <SwiperSlide key={i}>
              <motion.div
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={cardVariants}
                className="relative rounded-3xl overflow-hidden  cursor-pointer group"
                onClick={() => navigate(`/meals/${cat.api}`)}
              >
                <img
                  src={cat.img}
                  alt={cat.title}
                  className="w-full h-72 md:h-80 object-cover transform group-hover:scale-105 transition duration-500"
                />

                {/* Overlay Gradient خفيف لتوضيح النصوص */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-b-3xl"></div>
                  <h3 className="relative text-2xl md:text-3xl font-bold text-white mb-1">
                    {cat.title}
                  </h3>
                 
                  <button
                    className="relative bg-red-600 text-white px-4 py-2 rounded-full text-sm md:text-base font-semibold hover:bg-red-700 transition cursor-pointer"
                    onClick={() => navigate(`/meals/${cat.api}`)}
                  >
                    View Recipes
                  </button>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
