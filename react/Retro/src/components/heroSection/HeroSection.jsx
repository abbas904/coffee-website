import React, { useState, useEffect } from "react";
import heroImg from "../../assets/hero sec/2.jpg";
import heroVideo from "../../assets/hero sec/3.mp4";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "../../utils/motion";

export default function HeroSection() {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowVideo(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-[80vh] flex flex-col items-center justify-center text-center text-white overflow-hidden"
    >
      {/* الخلفية: صورة + فيديو + Overlay داكن */}
      <div className="absolute inset-0">
        {/* الصورة تظهر أولًا */}
        <img
          src={heroImg}
          alt="Background"
          className="w-full h-full object-cover absolute top-0 left-0"
        />

        {/* الفيديو يظهر تدريجيًا */}
        <video
          src={heroVideo}
          autoPlay
          loop
          muted
          className={`w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-1000 ${
            showVideo ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Overlay داكن كامل */}
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* المحتوى */}
      <motion.div
        className="relative z-10 flex flex-col items-center px-4 sm:px-6"
        variants={staggerContainer(0.2, 0.3)}
        initial="hidden"
        animate="show"
      >
        <motion.h3
          className="text-2xl uppercase  mb-2"
          variants={fadeIn("down", "tween", 0, 1)}
        >
          The Great
        </motion.h3>

        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black leading-tight mb-4"
          variants={fadeIn("down", "tween", 0.2, 1)}
        >
          RESTAURANT
        </motion.h1>

        <motion.div
          className="mt-4 sm:mt-6 border border-white inline-block px-4 sm:px-6 py-2 sm:py-3"
          variants={fadeIn("down", "tween", 0.4, 1)}
        >
          <p className="text-xs sm:text-sm uppercase">Since</p>
          <h2 className="text-2xl sm:text-3xl font-bold">1856</h2>
        </motion.div>
      </motion.div>
    </section>
  );
}
