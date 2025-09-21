import React from "react";
import chefImg from "../../assets/5.jpg";
import bgImg from "../../assets/8.png";
import imag from "../../assets/7.png";
import { Phone } from "lucide-react";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/motion";

export default function AboutSection() {
  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-0 px-4 relative -mt-40 lg:-mt-0">

      {/* العمود الأول: النص + hotline */}
      <motion.div
        variants={fadeIn("up", "spring", 0.5, 0.85)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="flex flex-col items-center bg-[#F7EEE5] p-6 sm:p-10 rounded-3xl shadow-xl text-center space-y-6 sm:space-y-12 relative z-10"
      >
        <img 
          src={imag} 
          alt="Restaurant" 
          className="w-auto max-w-full h-auto object-contain py-4" 
        />

        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 -mt-2">
          Welcome To Our Luxury Restaurant
        </h2>

        <p className="text-gray-700 sm:text-lg leading-relaxed max-w-3xl mx-auto px-2 sm:px-0">
          The first restaurant proprietor is believed to have been one A. Boulanger, 
          a soup vendor, who opened his business in Paris in 1765.
        </p>

        <a
          href="tel:+4733378901"
          className="flex items-center gap-4 bg-white shadow-md rounded-xl p-4 sm:p-5 border-2 border-red-500 hover:bg-gray-50 transition w-full max-w-sm mx-auto justify-center"
        >
          <Phone className="h-6 w-6 text-red-500" />
          <div className="text-left">
            <span className="text-sm text-gray-500 block">HOTLINE 24/7</span>
            <h4 className="text-lg font-semibold text-gray-900">+473337890</h4>
          </div>
        </a>
      </motion.div>

      {/* العمود الأوسط: صورة الشيف */}
     <motion.div
  className="h-auto lg:h-full w-full relative z-0"
  variants={fadeIn("up", "spring", 0.5, 0.95)}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true, amount: 0.2 }}
>
  <img
    src={chefImg}
    alt="Chef"
    className="w-full h-auto lg:h-full object-cover rounded-3xl"
  />
</motion.div>


      {/* العمود الثالث: Opening Hours */}
      <motion.div
        variants={fadeIn("up", "spring", 0.5, 0.95)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2}}
        className="flex flex-col justify-center items-center text-white p-6 sm:p-8 rounded-3xl shadow-lg relative z-10"
        style={{
          backgroundColor: "#E22335",
          backgroundImage: `url(${bgImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Opening Hours</h2>
        <ul className="w-full max-w-xs text-center">
          <li className="flex justify-between py-2 border-b border-white/30">
            <span>Saturday :</span>
            <div>6.00 AM - 12.00 PM</div>
          </li>
          <li className="flex justify-between py-2 border-b border-white/30">
            <span>Sunday :</span>
            <div>8.30 AM - 11.00 PM</div>
          </li>
          <li className="flex justify-between py-2 border-b border-white/30">
            <span>Monday :</span>
            <div>9.00 AM - 10.30 PM</div>
          </li>
          <li className="flex justify-between py-2 border-b border-white/30">
            <span>Tuesday :</span>
            <div>8.00 AM - 12.00 PM</div>
          </li>
          <li className="flex justify-between py-2 border-b border-white/30">
            <span>Wednesday :</span>
            <div>9.45 AM - 10.00 PM</div>
          </li>
          <li className="flex justify-between py-2 border-b border-white/30">
            <span>Thursday :</span>
            <div>8.15 AM - 12.00 PM</div>
          </li>
          <li className="flex justify-between py-2">
            <span>Friday :</span>
            <div className="font-semibold">Closed</div>
          </li>
        </ul>
      </motion.div>
    </div>
  );
}
