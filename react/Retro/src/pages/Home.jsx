// Home.jsx
import React from "react";
import HeroSection from "../components/heroSection/HeroSection";
import AboutInfo from "../components/aboutInfo/AboutInfo";
import IntroSection from "../components/introsection/IntroSection";
import ResturantFacts from "../components/resturantfacts/RestuantFacts";
import MealsSlider from "../components/mealslider/MealsSlider"; // ✅ الاستدعاء
import ChefSection from "../components/chefsection/ChefSection";
import ReservationSection from "../components/reservationsection/ReservationSection";
import BlogSectionWithHeader from "../components/blogsection/BlogSectionWithHeader";

import ScrollProgressButton from "../components/ScrollProgressButton";

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <HeroSection />
  <ScrollProgressButton />
      {/* AboutInfo Section: جزء منه فوق Hero */}
      <div className="relative z-10 -mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AboutInfo />
      </div>

      {/* IntroSection بعد AboutInfo */}
      <div className="mt-20">
        <IntroSection />
      </div>


      {/* meals slider */}
      <div className="mt-20">
        <MealsSlider />
      </div>

      {/* restaurant facts */}
      <div className="mt-32">
        <ResturantFacts />
      </div>

      {/* ChefSection */}
      <div className="mt-32">
        <ChefSection />
      </div>

      {/* ReservationSection */}
      <div className="mt-32">
        <ReservationSection />
      </div>

      {/* BlogSectionWithHeader */}
      <div className="mt-32">
        <BlogSectionWithHeader />
      </div>
    </div>
  );
}
