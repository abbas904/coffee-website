import React from "react";
import { Link } from "react-router-dom";
// استيراد الصور الخاصة باللوجو
import logoLeft from "../../assets/17.png";
import logoRight from "../../assets/18.png";

// استيراد صور البلوغ (انت هتعمل import لكل صورة بنفسك)
import blog1 from "../../assets/blog/4.jpg";
import blog2 from "../../assets/blog/2.jpg";
import blog3 from "../../assets/blog/3.jpg";

const blogs = [
  {
    id: 1,
    title: "Announcing if attachment resolution sentiments at the projection.",
    date: "18 March, 2024",
    author: "Md Sohag",
    category: "Burger",
    image: blog1,
    link: "/blog-single-with-sidebar/1",
  },
  {
    id: 2,
    title: "This prefabricated passive are comfortable highly sustainable",
    date: "25 April, 2024",
    author: "Md Sohag",
    category: "Food",
    image: blog2,
    link: "/blog-single-with-sidebar/2",
  },
  {
    id: 3,
    title: "Minuter him own clothes but observe country at the maintaining.",
    date: "15 June, 2024",
    author: "Md Sohag",
    category: "Pizza",
    image: blog3,
    link: "/blog-single-with-sidebar/3",
  },
];

export default function BlogSection() {
  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-8 md:mb-12">
          <div className="flex items-center justify-center gap-2 sm:gap-4 mb-4">
            <img src={logoLeft} alt="Logo Left" className="w-6 sm:w-8 md:w-10 lg:w-12" />
            <h4 className="text-red-800 text-lg sm:text-xl md:text-2xl font-semibold">
              News & Blog
            </h4>
            <img src={logoRight} alt="Logo Right" className="w-6 sm:w-8 md:w-10 lg:w-12" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              Our Latest News & Blog
            </h2>
          </div>
        </div>

        {/* Blog Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative">
                <a href={blog.link}>
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-48 sm:h-56 md:h-64 object-cover"
                  />
                </a>
                <ul className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded">
                  <li>{blog.category}</li>
                </ul>
              </div>
              <div className="p-4 sm:p-5">
                <h4 className="post-title text-base sm:text-lg font-semibold mb-2">
                  <Link
                    to="/blog"
                    className="relative inline-block group hover:text-red-600 transition"
                  >
                    {blog.title}
                    <span className="block h-0.5 bg-red-500 scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100 mt-1"></span>
                  </Link>
                </h4>
                <ul className="text-xs sm:text-sm text-gray-500 flex flex-col sm:flex-row gap-1 sm:gap-4">
                  <li>{blog.date}</li>
                  <li>{blog.author}</li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
