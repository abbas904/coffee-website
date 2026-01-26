import aboutBanner from "../assets/image/About/pattern-bg.jpg";
import petImg from "../assets/image/About/animal3.png";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaDog, FaBone, FaPaw } from "react-icons/fa";

const AboutSection = () => {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className={`relative w-full mt-10 sm:mt-16 md:mt-20 rounded-xl overflow-hidden bg-cover bg-center shadow-xl transition-opacity duration-1000 ease-in-out ${
        loaded ? "opacity-100" : "opacity-0"
      }`}
      style={{ backgroundImage: `url(${aboutBanner})`, minHeight: "400px" }}
    >


      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-20 flex flex-col lg:flex-row items-center lg:items-start gap-6 sm:gap-8 md:gap-10 h-full">

        {/* Left Text Column */}
        <div className="flex-1 text-white lg:text-left text-center flex flex-col justify-center h-full animate-fade-slide delay-100">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 sm:mb-6 drop-shadow-lg">
            About Our Pet Shop
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-6 text-black leading-relaxed drop-shadow-md">
            Premium food, toys, and accessories for your beloved pets. Our mission is to keep every furry friend happy, healthy, and loved.
          </p>
          <button
            onClick={() => navigate("/shop")}
            className="bg-petPrimary hover:bg-orange-600 text-white font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-full transition mb-4 sm:mb-6 text-sm sm:text-base"
          >
            Shop Now
          </button>
                <div className="absolute top-5 right-90 w-14 h-14 bg-white/30 rounded-full animate-floating-delay z-10"></div>
                   <div className="absolute top-80 right-35 w-14 h-14 bg-white/30 rounded-full animate-floating-delay z-10"></div>
                      <div className="absolute top-30 right-5 w-14 h-14 bg-white/30 rounded-full animate-floating-delay z-10"></div>
        </div>

        {/* Right Column: Info Boxes + Pet Image */}
        <div className="flex-1 relative w-full flex flex-col items-center justify-end">
          
          {/* Info Boxes Row */}
          <div className="relative lg:absolute top-0 lg:top-40 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start w-full px-4 sm:px-4 z-20 animate-fade-slide delay-200 mb-4 lg:mb-20">
            <div className="bg-white/90 backdrop-blur-md p-3 sm:p-4 rounded-xl shadow-lg flex-1 text-center hover:shadow-2xl transition">
              <FaDog className="text-orange-500 text-2xl sm:text-3xl mb-2 mx-auto" />
              <h4 className="font-bold text-sm sm:text-base md:text-lg mb-1">Premium Food</h4>
              <p className="text-xs sm:text-sm">Healthy & nutritious food for your pets.</p>
            </div>
            <div className="bg-white/90 backdrop-blur-md p-3 sm:p-4 rounded-xl shadow-lg flex-1 text-center hover:shadow-2xl transition">
              <FaBone className="text-orange-500 text-2xl sm:text-3xl mb-2 mx-auto" />
              <h4 className="font-bold text-sm sm:text-base md:text-lg mb-1">Toys & Accessories</h4>
              <p className="text-xs sm:text-sm">Keep your pets active and playful.</p>
            </div>
            <div className="bg-white/90 backdrop-blur-md p-3 sm:p-4 rounded-xl shadow-lg flex-1 text-center hover:shadow-2xl transition">
              <FaPaw className="text-orange-500 text-2xl sm:text-3xl mb-2 mx-auto" />
              <h4 className="font-bold text-sm sm:text-base md:text-lg mb-1">Expert Care</h4>
              <p className="text-xs sm:text-sm">Guidance & advice for a happy, healthy pet.</p>
            </div>
          </div>

          {/* Pet Image at bottom-right */}
          <img
            src={petImg}
            alt="Happy Pet"
            className="w-full sm:w-[300px] md:w-[400px] lg:w-[500px] xl:w-[400px] max-w-full rounded-lg shadow-lg animate-float hover:scale-105 transition-transform z-10 mx-auto lg:mb-20 lg:mx-12 lg:mt-[-40px]"
          />

          {/* Optional Floating Icons */}
          <div className="absolute top-10 left-10 w-12 h-12 bg-white/30 rounded-full animate-floating z-10"></div>
          <div className="absolute top-50 right-20 w-14 h-14 bg-white/30 rounded-full animate-floating-delay z-10"></div>
        </div>
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0); }
            30% { transform: translateY(-10px); }
            50% { transform: translateY(-20px); }
            75% { transform: translateY(-10px); }
            100% { transform: translateY(0); }
          }
          .animate-float {
            animation: float 4s ease-in-out infinite;
          }

          @keyframes fade-slide {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-slide {
            animation: fade-slide 1s forwards;
          }
          .delay-100 { animation-delay: 0.1s; }
          .delay-200 { animation-delay: 0.2s; }
          .delay-300 { animation-delay: 0.3s; }
          .delay-400 { animation-delay: 0.4s; }

          @keyframes floating {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-15px); }
          }
          .animate-floating {
            animation: floating 3s ease-in-out infinite;
          }
          .animate-floating-delay {
            animation: floating 4s ease-in-out infinite;
          }

          @media (max-width: 1024px) {
            .animate-float { width: 300px !important; bottom: -10px; }
          }
          @media (max-width: 640px) {
            .animate-float { width: 200px !important; bottom: -5px; }
          }
        `}
      </style>
    </section>
  );
};

export default AboutSection;
