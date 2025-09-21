// src/pages/ChefDetails.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaDribbble } from "react-icons/fa";

import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "../utils/motion";

// استيراد صور الشيفين
import chef1 from "../assets/Chefs/8.jpg";
import chef2 from "../assets/Chefs/11.jpg";
import chef3 from "../assets/Chefs/12.jpg";
import chef4 from "../assets/Chefs/13.jpg";
import chef5 from "../assets/Chefs/14.jpg";
import chef6 from "../assets/Chefs/15.jpg";
import chef7 from "../assets/Chefs/16.jpg"; 
import chef8 from "../assets/Chefs/8.jpg";

import heroBg from "../assets/21.jpg";

const chefsData = [
  {
    id: "1",
    name: "Alexander Petllo",
    image: chef1,
    bio: "Expert in Italian cuisine, creating delicious pasta and pizza.",
    location: "Rome, Italy",
    email: "alexander@example.com",
    phone: "+39-06-1234-5678",
    socials: { facebook: "#", dribbble: "#", linkedin: "#", instagram: "#" },
    education: [{ school: "Culinary School Rome", degree: "Bachelor", year: "2005-2009" }],
    experience: [{ title: "Head Chef", company: "Rome Italian Restaurant", date: "2010-2015" }],
    skills: [{ name: "Pasta", value: 95 }, { name: "Pizza", value: 90 }],
  },
  {
    id: "2",
    name: "Mendia Juxef",
    image: chef2,
    bio: "Specializes in gourmet burgers and fast food with style.",
    location: "New York, USA",
    email: "mendia@example.com",
    phone: "+1-212-555-7890",
    socials: { facebook: "#", dribbble: "#", linkedin: "#", instagram: "#" },
    education: [{ school: "New York Culinary School", degree: "BA", year: "2006-2010" }],
    experience: [{ title: "Burger Chef", company: "Burger King NYC", date: "2011-2014" }],
    skills: [{ name: "Burgers", value: 95 }, { name: "Fast Food", value: 90 }],
  },
  {
    id: "3",
    name: "Petro William",
    image: chef3,
    bio: "Master of French cuisine.",
    location: "Paris, France",
    email: "petro@example.com",
    phone: "+33-1-2345-6789",
    socials: { facebook: "#", dribbble: "#", linkedin: "#", instagram: "#" },
    education: [{ school: "Paris Culinary Institute", degree: "Master", year: "2007-2012" }],
    experience: [{ title: "Main Chef", company: "Paris Gourmet", date: "2013-Present" }],
    skills: [{ name: "French Cuisine", value: 95 }, { name: "Pastry", value: 90 }],
  },
  {
    id: "4",
    name: "Kunnel Jexos",
    image: chef4,
    bio: "Pizza and Italian dishes expert.",
    location: "Berlin, Germany",
    email: "kunnel@example.com",
    phone: "+49-30-123456",
    socials: { facebook: "#", dribbble: "#", linkedin: "#", instagram: "#" },
    education: [{ school: "Berlin Culinary Academy", degree: "Bachelor", year: "2008-2012" }],
    experience: [{ title: "Pizza Master", company: "Berlin Pizzeria", date: "2013-Present" }],
    skills: [{ name: "Pizza", value: 95 }, { name: "Italian Cuisine", value: 90 }],
  },
  {
    id: "5",
    name: "Alexander Petllo II",
    image: chef5,
    bio: "Expert in Mediterranean cuisine.",
    location: "Athens, Greece",
    email: "alexander2@example.com",
    phone: "+30-21-12345678",
    socials: { facebook: "#", dribbble: "#", linkedin: "#", instagram: "#" },
    education: [{ school: "Athens Culinary School", degree: "Bachelor", year: "2006-2010" }],
    experience: [{ title: "Sous Chef", company: "Athens Gourmet", date: "2011-2016" }],
    skills: [{ name: "Mediterranean", value: 90 }, { name: "Seafood", value: 85 }],
  },
  {
    id: "6",
    name: "Istiak Ahmed",
    image: chef6,
    bio: "Master of Middle Eastern cuisine.",
    location: "Cairo, Egypt",
    email: "istiak@example.com",
    phone: "+20-2-12345678",
    socials: { facebook: "#", dribbble: "#", linkedin: "#", instagram: "#" },
    education: [{ school: "Cairo Culinary School", degree: "Bachelor", year: "2005-2010" }],
    experience: [{ title: "Head Chef", company: "Cairo Restaurant", date: "2011-Present" }],
    skills: [{ name: "Grilling", value: 90 }, { name: "Middle Eastern Cuisine", value: 95 }],
  },
  {
    id: "7",
    name: "Mendia Juxef II",
    image: chef7,
    bio: "Gourmet burger specialist with international experience.",
    location: "Los Angeles, USA",
    email: "mendia2@example.com",
    phone: "+1-310-555-6789",
    socials: { facebook: "#", dribbble: "#", linkedin: "#", instagram: "#" },
    education: [{ school: "LA Culinary School", degree: "BA", year: "2008-2012" }],
    experience: [{ title: "Burger Chef", company: "LA Gourmet", date: "2013-Present" }],
    skills: [{ name: "Burgers", value: 95 }, { name: "Fast Food", value: 90 }],
  },
  {
    id: "8",
    name: "Kunnel Jexos II",
    image: chef8,
    bio: "Pizza and pasta expert with global experience.",
    location: "Madrid, Spain",
    email: "kunnel2@example.com",
    phone: "+34-91-1234567",
    socials: { facebook: "#", dribbble: "#", linkedin: "#", instagram: "#" },
    education: [{ school: "Madrid Culinary Institute", degree: "Master", year: "2009-2013" }],
    experience: [{ title: "Pizza Chef", company: "Madrid Pizzeria", date: "2014-Present" }],
    skills: [{ name: "Pizza", value: 95 }, { name: "Pasta", value: 90 }],
  },
];

export default function ChefDetails() {
  const { id } = useParams();
  const chef = chefsData.find((c) => c.id === id || c.id === Number(id));

  if (!chef) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold mb-4">Chef not found!</h2>
        <Link
          to="/chefs"
          className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition"
        >
          Go back to Chefs
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 px-4">
      {/* Hero / Breadcrumb */}
     <div
  className="relative bg-cover bg-center text-center text-light py-32"
  style={{ backgroundImage: `url(${heroBg})` }}
>
  <div className="absolute inset-0 bg-black/20"></div>
  <div className="relative z-10">
    <h1 className="text-5xl md:text-6xl font-bold text-red-600 mb-4">
      Chef Details
    </h1>
    <ul className="flex justify-center gap-2 text-white">
      <li>
        <Link to="/" className="hover:underline flex items-center gap-1">
          <i className="fas fa-home"></i> Home
        </Link>
      </li>
      <li>/</li>
      <li>
        <Link to="/chefs" className="hover:underline">
          Chefs
        </Link>
      </li>
      <li>/</li>
      <li>Chef Details</li>
    </ul>
  </div>
</div>

<div style={{ backgroundColor: "#ebe9e6",  width : "100%"  ,height : "80%"}}>
    

      {/* Details */}
      <div className="max-w-6xl mx-auto px-4 py-12 lg:flex lg:gap-12 ">
        <div className="lg:w-1/2">
          <img src={chef.image} alt={chef.name} className="w-full h-auto rounded-xl shadow-lg object-cover"/>
        </div>
        <div className="lg:w-1/2 mt-8 lg:mt-0 flex flex-col justify-center space-y-6">
          <h2 className="text-4xl font-bold text-gray-900">{chef.name}</h2>
          <p className="text-gray-700">{chef.bio}</p>

          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center gap-3">
              <i className="fas fa-map-marker-alt text-red-600"></i>
              <p>{chef.location}</p>
            </li>
            <li className="flex items-center gap-3">
              <i className="fas fa-envelope text-red-600"></i>
              <a href={`mailto:${chef.email}`} className="hover:underline">{chef.email}</a>
            </li>
            <li className="flex items-center gap-3">
              <i className="fas fa-phone-alt text-red-600"></i>
              <a href={`tel:${chef.phone}`} className="hover:underline">{chef.phone}</a>
            </li>
          </ul>

          <div className="flex items-center gap-6 mt-4">
            <Link
              to="/contact"
              className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition"
            >
              Contact Me
            </Link>
            <div className="flex gap-3 items-center">
              {chef.socials.facebook && <FaFacebookF className="text-gray-700 hover:text-red-600 text-xl transition"/>}
              {chef.socials.dribbble && <FaDribbble className="text-gray-700 hover:text-red-600 text-xl transition"/>}
              {chef.socials.linkedin && <FaLinkedinIn className="text-gray-700 hover:text-red-600 text-xl transition"/>}
              {chef.socials.instagram && <FaInstagram className="text-gray-700 hover:text-red-600 text-xl transition"/>}
            </div>
          </div>
        </div>
      </div>
</div>
      {/* Education / Experience / Skills */}
      <div className="bg-gray-100 mt-12 p-8 rounded-xl max-w-6xl mx-auto lg:flex lg:gap-12">
        <div className="lg:w-1/2 space-y-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Education</h3>
            <ul className="space-y-2">
              {chef.education.map((edu, idx) => (
                <li key={idx} className="bg-white p-4 rounded-lg shadow">
                  <h5 className="font-semibold">{edu.school}</h5>
                  <span className="text-gray-600">{edu.degree}</span>
                  <p className="text-gray-500">{edu.year}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4">Experience</h3>
            <ul className="space-y-2">
              {chef.experience.map((exp, idx) => (
                <li key={idx} className="bg-white p-4 rounded-lg shadow">
                  <h5 className="font-semibold">{exp.title}</h5>
                  <span className="text-gray-600">{exp.company}</span>
                  <p className="text-gray-500">{exp.date}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

         <div className="lg:w-1/2 mt-8 lg:mt-0">
      <h3 className="text-2xl font-bold mb-6 text-gray-800">Skills</h3>
      {chef.skills.map((skill, idx) => (
        <div key={idx} className="mb-6">
          {/* الاسم + النسبة */}
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-700 font-medium">{skill.name}</span>
            <span className="text-sm font-semibold text-gray-600">{skill.value}%</span>
          </div>

          {/* progress bar مع أنيميشن */}
          <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden shadow-inner">
            <motion.div
              className="h-3 rounded-full bg-gradient-to-r from-red-500 to-red-700"
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.value}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </div>
        </div>
      ))}
    </div>
      </div>
    </div>
  );
}
