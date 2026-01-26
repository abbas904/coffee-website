import { useEffect, useState } from "react";
import bannerBg from "../assets/image/Count/BnnerCount.jpg";
import img1 from "../assets/image/Count/flowCount.png";
import img2 from "../assets/image/Count/float.png";
import { Link } from "react-router-dom";

const TARGET_DATE = new Date("2026-06-04T00:00:00").getTime();

const Count = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const diff = TARGET_DATE - now;

      if (diff <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full min-h-[300px] sm:h-[350px] md:h-[400px] mt-10 sm:mt-16 md:mt-20 flex items-center">
      {/* خلفية البانر */}
      <div
      
        className="absolute inset-0 bg-cover bg-center z-10"
        style={{ backgroundImage: `url(${bannerBg})` }}
        
      >
        
      </div>

      {/* Overlay خفيف */}
      <div className="absolute inset-0 bg-black/10 z-10"></div>
<h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[8rem] font-bold text-white/50 z-20 pointer-events-none select-none">
  SALE
</h1>

      {/* المحتوى (على اليمين) */}
      <div className="relative z-20 max-w-full sm:max-w-[400px] md:max-w-[500px] mx-auto sm:ml-auto sm:mr-4 md:mr-8 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-2xl text-gray-800">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
          Great Deal Will End Soon
        </h2>

        <p className="text-xs sm:text-sm md:text-base leading-relaxed mb-4 sm:mb-6">
          Grab amazing discounts on our products for a limited time. Don't miss out!
        </p>

        {/* الكاونت */}
        <div className="mb-4 sm:mb-5">
          <ul className="flex gap-2 sm:gap-3 justify-center sm:justify-end flex-wrap">
            <li className="bg-white p-2 sm:p-3 rounded-xl text-center min-w-[60px] sm:min-w-[70px] shadow-lg flex-1 max-w-[80px]">
              <span className="block text-lg sm:text-xl font-bold text-orange-500">{timeLeft.days}</span>
              <span className="text-xs text-gray-500">Days</span>
            </li>

            <li className="bg-white p-2 sm:p-3 rounded-xl text-center min-w-[60px] sm:min-w-[70px] shadow-lg flex-1 max-w-[80px]">
              <span className="block text-lg sm:text-xl font-bold text-orange-500">{String(timeLeft.hours).padStart(2, "0")}</span>
              <span className="text-xs text-gray-500">Hrs</span>
            </li>

            <li className="bg-white p-2 sm:p-3 rounded-xl text-center min-w-[60px] sm:min-w-[70px] shadow-lg flex-1 max-w-[80px]">
              <span className="block text-lg sm:text-xl font-bold text-orange-500">{String(timeLeft.minutes).padStart(2, "0")}</span>
              <span className="text-xs text-gray-500">Mins</span>
            </li>

            <li className="bg-white p-2 sm:p-3 rounded-xl text-center min-w-[60px] sm:min-w-[70px] shadow-lg flex-1 max-w-[80px]">
              <span className="block text-lg sm:text-xl font-bold text-orange-500">{String(timeLeft.seconds).padStart(2, "0")}</span>
              <span className="text-xs text-gray-500">Secs</span>
            </li>
          </ul>
        </div>

       <Link
  to="/shop"
  className="inline-block w-full sm:w-auto text-center px-5 sm:px-7 py-2 sm:py-3 bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600 transition text-sm sm:text-base"
>
  Shop Now
</Link>
      </div>

      {/* الصور الطايرة */}
      <img
        src={img1}
        alt=""
        className="hidden sm:block absolute top-[50%] left-[5%] md:left-[10%] z-30 w-[60px] sm:w-[80px] md:w-[90px] lg:w-[120px] animate-floating-slow"
      />

      <img
        src={img2}
        alt=""
        className="hidden sm:block absolute bottom-[10%] right-[3%] md:right-[5%] z-30 w-[60px] sm:w-[80px] md:w-[90px] lg:w-[120px] animate-floating-delay"
      />
    </section>
  );
};

export default Count;
