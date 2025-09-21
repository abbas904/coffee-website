import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { FaStar, FaLeaf, FaUserTie, FaShippingFast } from "react-icons/fa";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";

// Assets
import aboutImg from "../assets/about/1.jpg";
import heroBg from "../assets/21.jpg";

// Brands
import brand1 from "../assets/about/1.png";
import brand2 from "../assets/about/2.png";
import brand3 from "../assets/about/3.png";
import brand4 from "../assets/about/4.png";
import brand5 from "../assets/about/5.png";

// Testimonials
import testimonial1 from "../assets/testemonial/1.jpg";
import testimonial2 from "../assets/testemonial/5.jpg";
import testimonial3 from "../assets/testemonial/6.jpg";
import testimonial4 from "../assets/testemonial/10.jpg";

// Variants
export const fadeIn = (direction, type, delay, duration) => ({
  hidden: {
    x: direction === "left" ? 80 : direction === "right" ? -80 : 0,
    y: direction === "up" ? 80 : direction === "down" ? -80 : 0,
    opacity: 0,
  },
  show: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: { type, delay, duration, ease: "easeOut" },
  },
});

export const staggerContainer = (staggerChildren = 0.2, delayChildren = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});

export const plateVariants = {
  hidden: { x: "120%", rotate: 120 },
  show: { x: 0, rotate: 0, transition: { type: "spring", duration: 1.8, delay: 0.5 } },
};

export default function About() {
  const brands = [brand1, brand2, brand3, brand4, brand5];
  const testimonials = [
    {
      title: "Best Chicken Fry",
      review: "Amazing food, friendly staff, and a cozy atmosphere. Definitely my go-to restaurant now!",
      foodImg: testimonial1,
      teamImg: testimonial4,
    },
    {
      title: "This pizza is so good",
      review: "The pizza here is simply the best in town. Fresh ingredients and perfect taste!",
      foodImg: testimonial2,
      teamImg: testimonial3,
    },
  ];
  const counters = [
    { value: 10, suffix: "+", label: "Years of Experience" },
    { value: 5000, suffix: "+", label: "Happy Customers" },
    { value: 150, suffix: "+", label: "Special Recipes" },
    { value: 50, suffix: "+", label: "Team Members" },
  ];
  const team = [
    { name: "John Carter", role: "Head Chef", img: "https://randomuser.me/api/portraits/men/22.jpg" },
    { name: "Sophia Taylor", role: "Manager", img: "https://randomuser.me/api/portraits/women/26.jpg" },
    { name: "David Brown", role: "Food Specialist", img: "https://randomuser.me/api/portraits/men/45.jpg" },
  ];

  // Animated Counter
  const AnimatedCounter = ({ target, suffix }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!isInView) return;
      let start = 0;
      const duration = 2000;
      const incrementTime = 50;
      const step = Math.ceil(target / (duration / incrementTime));

      const timer = setInterval(() => {
        start += step;
        if (start >= target) {
          start = target;
          clearInterval(timer);
        }
        setCount(start);
      }, incrementTime);

      return () => clearInterval(timer);
    }, [isInView, target]);

    return <h3 ref={ref} className="text-4xl font-bold mb-2">{count}{suffix}</h3>;
  };

  return (
    <section className="bg-gray-50">
      {/* Hero Section */}
      <motion.div
        className="relative bg-cover bg-center text-center py-32"
        style={{ backgroundImage: `url(${heroBg})` }}
        variants={fadeIn("up", "tween", 0, 1)}
        initial="hidden"
        animate="show"
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 px-4">
          <motion.h1 className="text-5xl sm:text-6xl font-bold text-red-500 mb-4">
            About Us
          </motion.h1>
          <ul className="flex justify-center gap-2 text-white text-lg">
            <li><Link to="/" className="hover:underline">Home /</Link></li>
            <li>About</li>
          </ul>
        </div>
      </motion.div>

      {/* Our Story */}
      <motion.div className="container mx-auto flex flex-col lg:flex-row items-center gap-12 py-20 px-6" variants={staggerContainer()} initial="hidden" whileInView="show">
        <motion.div className="lg:w-1/2" variants={fadeIn("left", "spring", 0.2, 1)}>
          <img src={aboutImg} alt="About" className="rounded-xl shadow-2xl w-full" />
        </motion.div>
        <motion.div className="lg:w-1/2" variants={fadeIn("right", "spring", 0.4, 1)}>
          <h4 className="text-red-500 text-2xl font-semibold">Our Story</h4>
          <h2 className="text-4xl font-bold leading-snug mt-4">Until I discovered cooking, I was never really interested in anything</h2>
          <p className="text-gray-600 mt-6 text-lg leading-relaxed">
            The first restaurant proprietor is believed to have been one A. Boulanger, a soup vendor, who opened his business in Paris in 1765. The design above his door advertised restored dishes for the public.
          </p>
        </motion.div>
      </motion.div>

      {/* Brands */}
      <motion.div className="bg-[#0f1f29] py-16" variants={staggerContainer()} initial="hidden" whileInView="show">
        <div className="max-w-6xl mx-auto flex items-center justify-center mb-10 px-4">
          <div className="flex-1 h-[1px] bg-gray-600"></div>
          <h3 className="text-white text-2xl font-bold uppercase px-4">Trusted By 5K+ Sponsors</h3>
          <div className="flex-1 h-[1px] bg-gray-600"></div>
        </div>
        <Swiper slidesPerView={1} spaceBetween={16} autoplay={{ delay: 1200, disableOnInteraction: false }} breakpoints={{480:{slidesPerView:2},640:{slidesPerView:3},768:{slidesPerView:4},1024:{slidesPerView:5}}} modules={[Autoplay]} loop>
          {brands.concat(brands).map((brand,i)=>(
            <SwiperSlide key={i}><img src={brand} alt={`Brand ${i+1}`} className="mx-auto h-20 object-contain"/></SwiperSlide>
          ))}
        </Swiper>
      </motion.div>

      {/* Testimonials */}
    <motion.div 
  className="py-10 mb-10 mt-10"
  variants={staggerContainer()}
  initial="hidden"
  whileInView="show"
>
  <div className="container mx-auto px-6">
    <h3 className="text-4xl font-bold text-center mb-12">What Our Clients Say</h3>
    <Swiper
      slidesPerView={1}
      spaceBetween={30}
      loop
      autoplay={{ delay: 2000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      breakpoints={{
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 2 },
      }}
      modules={[Autoplay, Pagination]}
      className="max-w-6xl mx-auto"
    >
      {testimonials.map((t, i) => (
        <SwiperSlide key={i}>
          <motion.div 
            className="bg-[#0f1f29]/90 p-8 rounded-xl shadow-lg text-center mx-4 md:mx-2"
            variants={fadeIn("up", "spring", i * 0.2, 1)}
          >
            <div className="flex justify-center gap-2 mb-3">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="text-yellow-400 text-lg md:text-xl"/>
              ))}
            </div>
            <h4 className="text-red-600 text-xl md:text-2xl font-semibold mb-3">{t.title}</h4>
            <p className="text-white text-sm md:text-base">{t.review}</p>
            <div className="flex justify-center gap-3 mt-5">
              <img src={t.foodImg} alt="Food" className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover shadow-md"/>
              <img src={t.teamImg} alt="Client" className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover shadow-md"/>
            </div>
          </motion.div>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
</motion.div>


      {/* Why Choose Us */}
   <motion.div
  className="container mx-auto px-6 py-20"
  variants={staggerContainer()}
  initial="hidden"
  whileInView="show"
>
  {/* العنوان الرئيسي */}
  <h2 className="text-4xl font-bold text-center mb-12">
    Why Choose Us ?
  </h2>

  {/* الكروت */}
  <div className="grid md:grid-cols-3 gap-8">
    {[
      { icon: <FaLeaf />, title: "Fresh Ingredients", desc: "We use only the freshest and finest ingredients in all our meals." },
      { icon: <FaUserTie />, title: "Expert Chefs", desc: "Our chefs are highly trained and bring creativity to every dish." },
      { icon: <FaShippingFast />, title: "Fast Delivery", desc: "Enjoy delicious food delivered to your doorstep quickly and hot." }
    ].map((item, i) => (
      <motion.div
        key={i}
        className="bg-white p-8 rounded-xl shadow text-center hover:shadow-xl transition flex flex-col items-center"
        variants={fadeIn("up", "spring", i * 0.2, 1)}
      >
        <div className="text-red-500 text-5xl mb-4">{item.icon}</div>
        <h5 className="font-semibold text-xl mb-3">{item.title}</h5>
        <p className="text-gray-600">{item.desc}</p>
      </motion.div>
    ))}
  </div>
</motion.div>


      {/* Our Team */}
      <motion.div
  className="container mx-auto px-6 py-20"
  variants={staggerContainer()}
  initial="hidden"
  whileInView="show"
>
  <h2 className="text-4xl font-bold text-center mb-12">Meet Our Team</h2>
  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
    {team.map((member, idx) => (
      <motion.div
        key={idx}
        className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition"
        variants={fadeIn("up", "spring", idx * 0.2, 1)}
      >
        <img
          src={member.img}
          alt={member.name}
          className="w-28 h-28 rounded-full mx-auto mb-4 object-cover"
        />
        <h5 className="font-semibold text-xl">{member.name}</h5>
        <p className="text-gray-600">{member.role}</p>
      </motion.div>
    ))}
  </div>
</motion.div>


      {/* Counters */}
      <motion.div className="container mx-auto px-6 py-20 grid sm:grid-cols-2 md:grid-cols-4 gap-8 text-center" variants={staggerContainer()} initial="hidden" whileInView="show">
        {counters.map((counter, idx) => (
          <motion.div key={idx} className="text-black p-10 rounded-xl shadow-lg" style={{ backgroundColor: "#ebe9e6" }} variants={fadeIn("up","spring",idx*0.2,1)}>
            <AnimatedCounter target={counter.value} suffix={counter.suffix} />
            <p className="text-lg">{counter.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Call To Action */}
      <motion.div className="text-black py-20 text-center" variants={fadeIn("up","spring",0,1)} initial="hidden" whileInView="show">
        <h2 className="text-4xl font-bold mb-6">Ready to Taste the Best?</h2>
        <p className="mb-8 text-red-700 text-lg">Join us today and experience the real taste of quality food!</p>
        <Link to="/contact" className="text-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition" style={{ backgroundColor: "#ebe9e6" }}>
          Contact Us
        </Link>
      </motion.div>
    </section>
  );
}
