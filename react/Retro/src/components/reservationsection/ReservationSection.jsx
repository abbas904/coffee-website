import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaPhone, FaCalendarAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import logo from "../../assets/18.png";
import heroImg from "../../assets/33.jpg";
import bgVideo from "../../assets/1.mp4";

export default function ReservationSection() {
  const [selectedDate, setSelectedDate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      toast.success("تم الحجز بنجاح 🎉", {
        position: "top-right",
        autoClose: 1000,
      });
    }, 1000);
  };

  return (
    <section className="relative py-10 overflow-hidden">
      {/* الفيديو في الخلفية */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover -z-10"
      >
        <source src={bgVideo} type="video/mp4" />
      </video>

      {/* المحتوى فوق الفيديو */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-20 relative z-10 overflow-hidden">
        <div className="flex flex-col lg:flex-row shadow-2xl rounded-2xl overflow-hidden">
          
          {/* الصورة */}
          <motion.div
            className="w-full lg:w-1/2 h-[400px] sm:h-[500px] lg:h-[650px] overflow-hidden"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src={heroImg}
              alt="Reservation"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* الفورم + الخط الأحمر */}
          <motion.div
            className="w-full lg:w-1/2 flex"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* الخط الأحمر */}
            <div className="hidden lg:block w-[2px] bg-red-600"></div>

            {/* الفورم */}
            <div className="flex-1 bg-[#0f1f29]/90 p-6 sm:p-10 flex flex-col items-center justify-center w-full">
              
              {/* العنوان مع اللوجو */}
              <div className="flex flex-col mb-6 w-full">
                <div className="flex items-center gap-4">
                  <img src={logo} alt="Logo" className="w-32 sm:w-36 lg:w-40" />
                  <h4 className="text-red-600 font-semibold text-xl sm:text-2xl lg:text-3xl">
                    Reserve For
                  </h4>
                </div>
                <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold mt-2">
                  Amazing Dining !
                </h2>
              </div>

              {/* الفورم */}
              <form className="reservation-form w-full flex flex-col items-center">
                <div className="flex flex-col gap-8 w-full">
                  
                  {/* Phone */}
                  <div className="relative w-full">
                    <input
                      type="number"
                      name="phone"
                      id="phone"
                      placeholder="+4733378901"
                      required
                      className="w-full p-3 rounded border border-b-red-300 bg-[#0f1f29]/80 text-white"
                    />
                    <FaPhone className="absolute right-4 top-3 text-red-600" />
                  </div>

                  {/* Person select */}
                  <div className="relative w-full">
                    <select className="w-full p-3 rounded border border-b-red-300 bg-[#0f1f29]/80 text-white">
                      <option>1 Person</option>
                      <option>2 Person</option>
                      <option>3 Person</option>
                      <option>4 Person</option>
                      <option>5 Person</option>
                    </select>
                  </div>

                  {/* Date */}
                  <div className="relative w-full">
                    <input
                      type="date"
                      id="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full p-3 rounded border border-b-red-300 bg-[#0f1f29]/80 text-white"
                    />
                    <FaCalendarAlt className="absolute right-4 top-3 text-red-600" />
                  </div>

                  {/* Time select */}
                  <div className="relative w-full">
                    <select className="w-full p-3 rounded border border-b-red-300 bg-[#0f1f29]/80 text-white">
                      <option>10:00 AM</option>
                      <option>11:00 AM</option>
                      <option>12:00 PM</option>
                      <option>01:00 PM</option>
                      <option>02:00 PM</option>
                      <option>03:00 PM</option>
                    </select>
                  </div>

                  {/* Checkbox */}
                  <div className="flex items-center gap-2 text-white">
                    <input
                      type="checkbox"
                      id="terms"
                      className="accent-red-600"
                    />
                    <label htmlFor="terms">
                      I agree to the terms and conditions
                    </label>
                  </div>

                  {/* Submit button */}
                  <button
                    onClick={handleClick}
                    className={`mt-4 relative w-full flex items-center justify-center gap-2 font-bold py-3 rounded overflow-hidden transition-colors duration-300
                      ${
                        loading
                          ? "bg-red-600 text-white"
                          : "bg-white text-[#0f1f29] hover:bg-red-600 hover:text-white"
                      }
                    `}
                  >
                    {loading && (
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    )}
                    {loading ? "Loading..." : "Book A Table"}
                    {!loading && (
                      <span className="w-6 h-6 bg-red-600 flex items-center justify-center rounded-full text-white">
                        <FaUser className="text-sm" />
                      </span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      <ToastContainer />
    </section>
  );
}
