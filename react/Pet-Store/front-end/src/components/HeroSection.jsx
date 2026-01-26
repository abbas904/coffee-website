import bg2 from "../assets/image/heroSection/bg2.jpg";
import dogImg from "../assets/image/heroSection/dog-bg.png";
import catImg from "../assets/image/heroSection/bg-3.png";
import bone from "../assets/image/heroSection/logo-4.svg";
import pawl from "../assets/image/heroSection/pawl.svg";
import pet from "../assets/image/heroSection/pet.svg";
import { useState } from "react";

const HeroSection = () => {
  const [loaded, setLoaded] = useState(false);

  return (
    <section
      className={`relative w-full flex justify-center items-center overflow-hidden px-4 sm:px-6 md:px-20 rounded-xl bg-center bg-cover transition-opacity duration-1000 ease-in-out ${
        loaded ? "opacity-100" : "opacity-0"
      }`}
      style={{
        backgroundImage: `url(${bg2})`,
        minHeight: "70vh",
        maxHeight: "100vh",
      }}
    >
      {/* preload background */}
      <img
        src={bg2}
        alt=""
        className="hidden"
        onLoad={() => setLoaded(true)}
      />

      {/* overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* content */}
      <div className="relative z-10 max-w-2xl text-center md:text-left px-4">
        <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-2 sm:mb-4 opacity-0 animate-fade-slide delay-100">
          🐾
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 sm:mb-4 text-white opacity-0 animate-fade-slide delay-200">
          Find Your Perfect Pet Friend
        </h1>

        <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-6 text-white opacity-0 animate-fade-slide delay-300">
          Discover adorable pets and accessories for your furry friends.
        </p>
      </div>

      {/* floating images */}
      <img
        src={dogImg}
        alt="Dog"
        className="absolute bottom-0 left-2 w-[150px] sm:w-[200px] md:w-[250px] lg:w-[300px] xl:w-[350px] max-w-full z-10 animate-slide-up-left"
      />
      <img
        src={catImg}
        alt="Cat"
        className="absolute bottom-0 right-0 w-[150px] sm:w-[200px] md:w-[250px] lg:w-[300px] xl:w-[350px] max-w-full z-10 animate-slide-up-right"
      />

      {/* floating SVGs */}
      <img
        src={bone}
        alt="Bone"
        className="absolute top-[45%] left-[5%] w-8 sm:w-18 md:w-16 lg:w-20 h-auto z-10 animate-floating"
      />
      <img
        src={pawl}
        alt="Paw"
        className="absolute top-[50%] right-[15%] w-8 sm:w-18 md:w-16 lg:w-20 h-auto z-10 animate-floating-delay"
      />
      <img
        src={pet}
        alt="Pet"
        className="absolute top-[10%] left-[35%] w-8 sm:w-18 md:w-16 lg:w-20 h-auto z-10 animate-floating-slow"
      />

      {/* Animations */}
      <style>
        {`
          @keyframes fade-slide {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-slide { animation: fade-slide 1s forwards; }
          .delay-100 { animation-delay: 0.1s; }
          .delay-200 { animation-delay: 0.2s; }
          .delay-300 { animation-delay: 0.3s; }

          @keyframes floating {
            0%,100% { transform: translateY(0); }
            50% { transform: translateY(-15px); }
          }
          .animate-floating { animation: floating 3s ease-in-out infinite; }
          .animate-floating-delay { animation: floating 4s ease-in-out infinite; }
          .animate-floating-slow { animation: floating 5s ease-in-out infinite; }

          @keyframes slide-up-left {
            0% { transform: translateY(50px); opacity:0; }
            100% { transform: translateY(0); opacity:1; }
          }
          .animate-slide-up-left { animation: slide-up-left 1s ease-out forwards; }

          @keyframes slide-up-right {
            0% { transform: translateY(50px); opacity:0; }
            100% { transform: translateY(0); opacity:1; }
          }
          .animate-slide-up-right { animation: slide-up-right 1s ease-out forwards; }
        `}
      </style>
    </section>
  );
};

export default HeroSection;
