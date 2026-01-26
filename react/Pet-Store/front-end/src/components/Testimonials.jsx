import React from "react";
import Slider from "react-slick";

// استيراد الصور
import EmilyImg from "../assets/image/testimonials/test1.png";
import SarahImg from "../assets/image/testimonials/test2.png";
import MichaelImg from "../assets/image/testimonials/test3.png";

const testimonialsData = [
  {
    id: 1,
    name: "Emily Harper",
    role: "Dog Mom & Blogger",
    text: "I’ve tried dozens of pet brands, but this shop truly stands out. Their natural treats and grooming products have made a huge difference in my dog’s coat and energy.",
    img: EmilyImg,
    rating: 5,
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Cat Lover",
    text: "Amazing quality and fast delivery. My cat absolutely loves their organic food and toys!",
    img: SarahImg,
    rating: 5,
  },
  {
    id: 3,
    name: "Michael Brown",
    role: "Pet Owner",
    text: "Best pet store ever! Great support team and premium products. Totally recommended.",
    img: MichaelImg,
    rating: 5,
  },
];

const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 700, // حركة أبطأ وأكثر سلاسة
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    arrows: false,
    adaptiveHeight: true,
    pauseOnHover: true,
  };

  return (
    <section className="testimonials py-10 sm:py-16 md:py-20 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* العنوان الرئيسي */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-petPrimary mb-3 sm:mb-4">
          What Our Customers Say ?
        </h2>
        <p className="text-gray-600 text-sm sm:text-base md:text-lg mb-8 sm:mb-10 md:mb-12 px-2">
          Trusted by pet lovers all around the world. See what they have to say about our products and services!
        </p>

        <Slider {...settings}>
          {testimonialsData.map((testimonial) => (
            <div key={testimonial.id} className="px-2 sm:px-4">
              <div className="quote-wrap bg-white p-6 sm:p-8 md:p-10 lg:p-12 rounded-2xl shadow-xl transition-transform transform hover:scale-[1.02] duration-300">
                {/* Rating */}
                <ul className="flex justify-center mb-4 sm:mb-6 gap-1 sm:gap-2">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <li key={i} className="text-yellow-400 text-lg sm:text-xl md:text-2xl">★</li>
                  ))}
                </ul>

                {/* النص */}
                <p className="text-gray-800 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed mb-6 sm:mb-8">
                  {testimonial.text}
                </p>

                {/* المؤلف */}
                <div className="flex flex-col items-center">
                  {testimonial.img && (
                    <img
                      src={testimonial.img}
                      alt={testimonial.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mb-3 sm:mb-4 object-cover border-2 border-yellow-400"
                    />
                  )}
                  <h6 className="font-semibold text-gray-900 text-base sm:text-lg">{testimonial.name}</h6>
                  <span className="text-gray-500 text-xs sm:text-sm">{testimonial.role}</span>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Testimonials;
