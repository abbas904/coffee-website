import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import blog1 from "../assets/blog/1.jpg";
import blog2 from "../assets/blog/2.jpg";
import blog3 from "../assets/blog/3.jpg";
import blog4 from "../assets/blog/4.jpg";
import blog5 from "../assets/blog/5.jpg";
import blog6 from "../assets/blog/6.jpg";
import heroBg from "../assets/21.jpg";

const blogs = [
  { id: 1, title: "Announcing if attachment resolution sentiments at the projection.", date: "12 August, 2024", author: "Admin", image: blog1, excerpt: "Bndulgence diminution so discovered mr apartments..." },
  { id: 2, title: "Minuter him own clothes but observe country at the maintaining.", date: "13 August, 2024", author: "Admin", image: blog2, excerpt: "Bndulgence diminution so discovered mr apartments..." },
  { id: 3, title: "Minuter him own clothes but observe country maintaining pported her.", date: "14 August, 2024", author: "Admin", image: blog3, excerpt: "Bndulgence diminution so discovered mr apartments..." },
  { id: 4, title: "Another blog example post", date: "15 August, 2024", author: "Admin", image: blog4, excerpt: "Bndulgence diminution so discovered mr apartments..." },
  { id: 5, title: "How to cook delicious burger", date: "16 August, 2024", author: "Admin", image: blog5, excerpt: "Bndulgence diminution so discovered mr apartments..." },
  { id: 6, title: "Pizza recipes you must try", date: "17 August, 2024", author: "Admin", image: blog6, excerpt: "Bndulgence diminution so discovered mr apartments..." },
];

export default function Blog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 1;
  const blogsPerPage = 3;

  const indexOfLastBlog = page * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  return (
    <section className="py-16 bg-gray-50">
      <div
        className="relative bg-cover bg-center text-center text-white py-24 sm:py-32 mb-12"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-red-600 mb-4">
            Blog 
          </h1>
          <ul className="breadcrumb flex justify-center gap-2 text-white text-sm sm:text-base">
            <li>
              <Link to="/" className="hover:underline flex items-center gap-1">
                <i className="fas fa-home"></i> Home /
              </Link>
            </li>
            <li>Blog Page</li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Blog cards */}
        <div className="grid md:grid-cols-1 gap-8">
          {currentBlogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <Link to={`/blog-single-with-sidebar/${blog.id}`}>
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-auto object-cover"
                />
              </Link>
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-3">
                  <Link
                    to={`/blog-single-with-sidebar/${blog.id}`}
                    className="hover:text-red-600 transition"
                  >
                    {blog.title}
                  </Link>
                </h2>
                <div className="flex gap-4 text-gray-500 text-sm mb-3">
                  <span><i className="far fa-calendar-alt"></i> {blog.date}</span>
                  <span><i className="far fa-user-circle"></i> {blog.author}</span>
                </div>
                <p className="text-gray-600">{blog.excerpt}</p>
                <Link
                  to={`/blog-single-with-sidebar/${blog.id}`}
                  className="mt-4 inline-block px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                >
                  Continue Reading
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-10 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setSearchParams({ page: i + 1 })}
              className={`px-4 py-2 rounded ${
                page === i + 1
                  ? "bg-red-600 text-white"
                  : "bg-white text-gray-600 border"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
