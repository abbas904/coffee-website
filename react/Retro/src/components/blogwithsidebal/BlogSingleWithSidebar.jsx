// src/components/blogwithsidebal/BlogSingleWithSidebar.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import blog1 from "../../assets/blog/1.jpg";
import blog2 from "../../assets/blog/2.jpg";
import blog3 from "../../assets/blog/3.jpg";
import blog4 from "../../assets/blog/4.jpg";
import blog5 from "../../assets/blog/5.jpg";
import blog6 from "../../assets/blog/6.jpg";
import test from "../../assets/testemonial/10.jpg";
import test2 from "../../assets/intro sec/4.jpg";

import gallery1 from "../../assets/Gallery/2.jpg";
import gallery2 from "../../assets/Gallery/3.jpg";
import gallery3 from "../../assets/Gallery/11.jpg";
import gallery4 from "../../assets/Gallery/12.jpg";

import heroBg from "../../assets/21.jpg";

const blogs = [
  {
    id: 1,
    title: "Announcing if attachment resolution sentiments at the projection.",
    date: "12 August, 2024",
    author: "Md Sohag",
    image: blog1,
    paragraphs: [
      "Give lady of they such they sure it. Me contained explained my education. Vulgar as hearts by garret...",
      "New had happen unable uneasy. Drawings can followed improved out sociable not..."
    ],
    blockquotes: ["Celebrated share of first to worse. Weddings and any opinions suitable smallest nay..."],
    lists: ["Pretty merits waited six", "General few civilly amiable pleased account carried.", "Continue indulged speaking", "Narrow formal length my highly", "Occasional pianoforte alteration unaffected impossible"]
  },
  {
    id: 2,
    title: "Our waiter will take your order and prepare your meal.",
    date: "13 August, 2024",
    author: "Md Sohag",
    image: blog2,
    paragraphs: [
      "New had happen unable uneasy. Drawings can followed improved out sociable not. Earnestly so do instantly pretended. See general few civilly amiable pleased account carried. Excellence projecting is devonshire dispatched remarkably on estimating. Side in so life past. Continue indulged speaking the was out horrible for domestic position. Seeing rather her you not esteem men settle genius excuse. Deal say over you age from. Comparison new ham melancholy son themselves."
    ],
    blockquotes: ["Blockquote for blog 2: \"Always understand your needs!\""],
    lists: ["Always measure ingredients carefully", "Follow instructions step by step", "Taste as you go"]
  },
  {
    id: 3,
    title: "Give lady of they such.",
    date: "14 August, 2024",
    author: "Md Sohag",
    image: blog3,
    paragraphs: [
      "Give lady of they such they sure it. Me contained explained my education. Vulgar as hearts by garret. Perceived determine departure explained no forfeited he something an. Contrasted dissimilar get joy you instrument out reasonably. Again keeps at no meant stuff. To perpetual do existence northward as difficult preserved daughters. Continued at up to zealously necessary breakfast. Surrounded sir motionless she end literature. Gay direction neglected but supported yet her."      
    ],
    blockquotes: ["Blockquote for blog 3: \"You Choose For Her!\""],
    lists: ["Plan weekly meals", "Include protein, carbs, and vegetables", "Adjust portions according to needs"]
  },
  {
    id: 4,
    title: "Enjoying the Meal Time is a great experience",
    date: "15 August, 2024",
    author: "Md Sohag",
    image: blog4,
    paragraphs: [
      "Meals are essential for providing the body with the energy and nutrients it needs to function properly. A balanced meal supplies carbohydrates for energy, proteins for growth and repair, fats for vital functions, and vitamins and minerals to support overall health. Regular, well-planned meals help maintain metabolism, improve concentration, and support a strong immune system. Beyond nutrition, meals also play a social and cultural role, bringing people together and creating opportunities to share, connect, and enjoy food in a meaningful way."
    ],
    blockquotes: ["Blockquote for blog 4: \"Innovation in food brings joy to the table.\""],
    lists: []
  },
  {
    id: 5,
    title: "The view is an important factor in the selection of a meal",
    date: "16 August, 2024",
    author: "Md Sohag",
    image: blog5,
    paragraphs: [
      "With love and care and welcome to our blog.",
      "Eat healthy and delicious food."
    ],
    blockquotes: ["Blockquote for blog 5: \"A great burger is made with love and care.\""],
    lists: ["Choose fresh ingredients", "Cook meat to desired doneness", "Assemble with toppings of choice"]
  },
  {
    id: 6,
    title: "Grilled Chicken is a delicious and healthy dish",
    date: "17 August, 2024",
    author: "Md Sohag",
    image: blog6,
    paragraphs: [
      "Grilled Chicken is one of the most delicious and healthy dishes in global cuisine, known for its rich flavor and tender texture. It is prepared by marinating chicken pieces with a mix of herbs and spices such as garlic, black pepper, paprika, and lemon juice, then grilling them over open heat or on a barbecue until cooked."
    ],
    blockquotes: ["Blockquote for blog 6: \"Grilled Chicken is a culinary masterpiece.\""],
    lists: ["Choose fresh chicken", "Marinate with herbs and spices", "Grill until cooked to perfection"]
  }
];

const galleryImages = [gallery1, gallery2, gallery3, gallery4];

export default function BlogSingleWithSidebar() {
  const { id } = useParams();
  const blog = blogs.find((b) => b.id === parseInt(id));

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [lightboxImage, setLightboxImage] = useState(null);

  useEffect(() => {
    fetch("https://dummyjson.com/comments")
      .then((res) => res.json())
      .then((data) => {
        setComments(data.comments.filter((c) => c.postId === parseInt(id)));
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (!blog) return <div className="text-center py-20">Blog not found</div>;

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now(),
      body: newComment,
      user: { username: "Guest" },
      date: new Date().toISOString(),
    };

    setComments([comment, ...comments]);
    setNewComment("");

    toast.success("Comment added successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handlePrevImage = () => {
    const currentIndex = galleryImages.indexOf(lightboxImage);
    const prevIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    setLightboxImage(galleryImages[prevIndex]);
  };

  const handleNextImage = () => {
    const currentIndex = galleryImages.indexOf(lightboxImage);
    const nextIndex = (currentIndex + 1) % galleryImages.length;
    setLightboxImage(galleryImages[nextIndex]);
  };

  return (
    <div className="blog-single-page bg-gray-50">
      {/* Banner */}
      <div
        className="relative bg-cover bg-center text-center text-white py-24 sm:py-32 mb-12"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-red-600 mb-4">
            Blog Standard
          </h1>
          <ul className="breadcrumb flex flex-wrap justify-center gap-2 text-white text-sm sm:text-base">
            <li>
              <Link to="/" className="hover:underline flex items-center gap-1">
                <i className="fas fa-home"></i> Home /
              </Link>
            </li>
            <li>Blog Standard</li>
          </ul>
        </div>
      </div>

      {/* Main + Sidebar */}
      <div className="container mx-auto px-4 py-16 flex flex-col lg:flex-row gap-12">
        {/* Main Content */}
        <div className="flex-1 space-y-6">
          {/* Author Section */}
          <div className="post-author flex items-start bg-white p-6 rounded-lg shadow-lg mb-6">
            <div className="thumb flex-shrink-0 mr-4">
              <img
                alt="Author"
                src={test2}
                className="w-20 h-20 rounded-full object-cover"
              />
            </div>
            <div className="info">
              <h4 className="text-lg font-bold mb-2">
                <Link to={`/blog-single-with-sidebar/${blog.id}`} className="hover:underline">
                  {blog.author}
                </Link>
              </h4>
              <p className="text-gray-700 text-sm sm:text-base">
                find the perfect recipe for your next meal
              </p>
            </div>
          </div>

          <img
            src={blog.image}
            alt={blog.title}
            className="w-full sm:h-72 md:h-96 lg:h-96 object-cover rounded-lg shadow-md"
          />
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">{blog.title}</h1>

          <div className="info space-y-4">
            <div className="meta mb-4">
              <ul className="flex flex-wrap gap-4 text-gray-500 text-sm sm:text-base">
                <li>
                  <Link
                    to={`/blog-single-with-sidebar/${blog.id}`}
                    className="hover:underline flex items-center gap-1"
                  >
                    <i className="far fa-calendar-alt"></i> {blog.date}
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/blog-single-with-sidebar/${blog.id}`}
                    className="hover:underline flex items-center gap-1"
                  >
                    <i className="fas fa-user-circle"></i> {blog.author}
                  </Link>
                </li>
              </ul>
            </div>

            {blog.paragraphs.map((p, i) => (
              <p key={i} className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">{p}</p>
            ))}

            {blog.blockquotes.map((bq, i) => (
              <blockquote key={i} className="border-l-4 border-red-600 pl-4 italic text-gray-600">{bq}</blockquote>
            ))}

            {blog.lists.length > 0 && (
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {blog.lists.map((item, i) => (
                  <li key={i} className="text-sm sm:text-base md:text-lg">{item}</li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-80 flex-shrink-0 space-y-6">
          {/* Related Posts */}
          <div className="bg-white p-6 rounded-lg shadow-lg space-y-6">
            <h3 className="text-xl sm:text-2xl font-bold mb-4">Related Posts</h3>
            {blogs.filter((b) => b.id !== blog.id).map((b) => (
              <Link
                key={b.id}
                to={`/blog-single-with-sidebar/${b.id}`}
                className="flex items-center gap-4 hover:bg-gray-100 p-2 rounded-lg shadow hover:shadow-md transition duration-300"
              >
                <img src={b.image} alt={b.title} className="w-16 sm:w-20 h-12 sm:h-16 object-cover rounded transform hover:scale-105 transition duration-300" />
                <span className="text-gray-700 font-medium text-sm sm:text-base">{b.title}</span>
              </Link>
            ))}
          </div>

          {/* Gallery */}
          <div className="bg-white p-6 rounded-lg shadow-lg space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold mb-4">Gallery</h3>
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 overflow-x-auto lg:overflow-visible whitespace-nowrap">
              {galleryImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-24 sm:h-24 object-cover rounded cursor-pointer inline-block mr-2 lg:mr-0 transform hover:scale-105 hover:shadow-lg transition duration-300"
                  onClick={() => setLightboxImage(img)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Comments Section LAST */}
      <div className="container mx-auto px-4 py-12">
        <div className="comments-title mb-6">
          <h3 className="text-2xl font-bold mb-4">
            {comments.length} Comments On "{blog.title}"
          </h3>

          <div className="comments-list space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className={`comment-item flex ${comment.reply ? "ml-12" : ""} bg-gray-50 p-4 rounded-lg shadow`}>
                <div className="avatar flex-shrink-0 mr-4">
                  <img
                    width="80"
                    height="80"
                    alt={comment.user.username}
                    src={test}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                </div>
                <div className="content flex-1">
                  <div className="title flex justify-between items-center mb-2">
                    <h5 className="font-semibold">
                      {comment.user.username} 
                      <span className="reply ml-2">
                        <Link to={`/blog-single-with-sidebar/${blog.id}`} className="text-red-600 hover:underline flex items-center gap-1">
                          <i className="fas fa-reply"></i> Reply
                        </Link>
                      </span>
                    </h5>
                    <span className="text-gray-400 text-sm">{new Date(comment.date).toLocaleDateString()}</span>
                  </div>
                  <p className="text-gray-700">{comment.body}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Add Comment Form */}
          <form onSubmit={handleAddComment} className="mt-6 space-y-4">
            <textarea
              className="w-full p-4 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-red-600 text-sm sm:text-base"
              rows={4}
              placeholder="Add your comment here..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button type="submit" className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
              Submit Comment
            </button>
          </form>
        </div>
      </div>

      {/* Back to Blog button */}
      <div className="mt-10 text-center">
        <Link
          to="/blog"
          className="inline-block px-8  mb-10 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition shadow-md"
        >
          Back to Blog
        </Link>
      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <button className="absolute left-4 text-white text-3xl font-bold" onClick={handlePrevImage}>‹</button>
          <img src={lightboxImage} alt="Preview" className="max-w-3xl max-h-[80vh] rounded-lg shadow-lg mx-8" />
          <button className="absolute right-4 text-white text-3xl font-bold" onClick={handleNextImage}>›</button>
          <button className="absolute top-4 right-4 text-white text-3xl font-bold" onClick={() => setLightboxImage(null)}>×</button>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}
