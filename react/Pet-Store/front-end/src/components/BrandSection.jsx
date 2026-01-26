import { useRef, useEffect, useState } from "react";
import brand1 from "../assets/image/brand/brand1.png";
import brand2 from "../assets/image/brand/brand2.png";
import brand3 from "../assets/image/brand/brand3.png";
import brand4 from "../assets/image/brand/brand4.png";
import brand5 from "../assets/image/brand/brand5.png";
import floatingIcon from "../assets/image/brand/bone.svg";

const brands = [brand1, brand2, brand3, brand4, brand5];

const BrandsSection = () => {
  const sliderRef = useRef(null);
  const [translate, setTranslate] = useState(0);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const totalWidth = slider.scrollWidth / 2; // بما إننا نكرر العناصر
    let x = 0;
    const speed = 0.5; // تحكم في سرعة السلايدر

    const animate = () => {
      x += speed;
      if (x >= totalWidth) x = 0;
      setTranslate(-x);
      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <section className="relative w-full py-8 sm:py-12 md:py-16 
         mt-0 sm:mt-0 md:mt-0 
         clear-both overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        {/* العنوان */}
        <div className="flex flex-col md:flex-row items-center justify-between
            mb-6 sm:mb-8 md:mb-10 gap-4 md:gap-6">
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-2xl sm:text-xl md:text-2xl lg:text-5xl font-extrabold text-petPrimary break-words leading-tight">
              Trusted Brands For Your Pets
            </h2>
            <p className="mt-2 sm:mt-4 text-black text-sm sm:text-base md:text-lg lg:text-xl">
              Quality products from the best brands in the industry 🐾
            </p>
          </div>

          <div className="flex-shrink-0 mt-4 md:mt-0">
            <img
              src={floatingIcon}
              alt="Icon"
              className="w-12 sm:w-16 md:w-20 lg:w-28 animate-spin-slow"
            />
          </div>
        </div>

        {/* Slider */}
        <div className="relative w-full overflow-hidden">
          <div
            ref={sliderRef}
            className="flex gap-4 sm:gap-6 whitespace-nowrap"
            style={{ transform: `translateX(${translate}px)` }}
          >
            {[...brands, ...brands].map((brand, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-24 sm:w-32 md:w-36 lg:w-40 xl:w-48 flex justify-center items-center p-2 sm:p-4 md:p-5 lg:p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-transform duration-300 hover:scale-105"
              >
                <img
                  src={brand}
                  alt={`Brand ${idx + 1}`}
                  className="h-12 sm:h-16 md:h-20 lg:h-20 xl:h-24 w-auto object-contain max-w-full"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spinSlow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spinSlow 8s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default BrandsSection;
