import React from "react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Contact = () => {
  return (
    <section className="bg-gray-50">
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center h-[400px]"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1950&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <motion.div
            className="text-center text-white"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold mb-4">Get in Touch</h1>
            <p className="mb-6 text-lg">We’d love to hear from you anytime</p>
            <a
              href="#contact-form"
              className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-lg font-semibold shadow-lg hover:scale-105 transition-transform"
            >
              Contact Us
            </a>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-20 py-16 space-y-20">
        {/* Contact Info */}
        <motion.div
          className="grid md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {[ 
            { icon: <FaPhone />, title: "Hotline", content: "+47 333 78901", link: "tel:+4733378901" },
            { icon: <FaMapMarkerAlt />, title: "Location", content: "55 Main Street, NYC" },
            { icon: <FaEnvelope />, title: "Email", content: "info@gixus.com", link: "mailto:info@gixus.com" }
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-2xl hover:-translate-y-2 transition transform"
            >
              <div className="text-red-500 text-4xl mb-4">{item.icon}</div>
              <h5 className="text-xl font-semibold mb-2">{item.title}</h5>
              {item.link ? (
                <a href={item.link} className="text-gray-600 hover:text-red-500">
                  {item.content}
                </a>
              ) : (
                <p className="text-gray-600">{item.content}</p>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Contact Form + Map */}
        <motion.div
          className="grid lg:grid-cols-2 gap-12"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {/* Form */}
          <motion.form
            variants={fadeInUp}
            className="bg-white p-8 rounded-2xl shadow-lg space-y-6"
          >
            <div>
              <label className="block text-gray-700 font-semibold">Full Name</label>
              <input
                type="text"
                className="w-full mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-red-400"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold">Email</label>
              <input
                type="email"
                className="w-full mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-red-400"
                placeholder="example@mail.com"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold">Message</label>
              <textarea
                rows="5"
                className="w-full mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-red-400"
                placeholder="Write your message..."
              ></textarea>
            </div>
            <button className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition font-semibold hover:scale-105 transform">
              Send Message
            </button>
          </motion.form>

          {/* Map */}
          <motion.div
            variants={fadeInUp}
            className="rounded-2xl overflow-hidden shadow-lg"
          >
            <iframe
              className="w-full h-full min-h-[400px]"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24164.68404155697!2d-74.0060152!3d40.7127281!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzQ2LjgiTiA3NMKwMDAnMjIuNiJX!5e0!3m2!1sen!2sus!4v1619471914632!5m2!1sen!2sus"
              allowFullScreen=""
              loading="lazy"
              title="Google Map"
            ></iframe>
          </motion.div>
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="space-y-6 max-w-3xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
          {[
            {
              q: "How can I make a reservation?",
              a: "You can reserve your spot online or by calling our hotline anytime.",
            },
            {
              q: "Do you offer home delivery?",
              a: "Yes, we deliver within the city limits through our partners.",
            },
          ].map((faq, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="p-6 bg-white rounded-xl shadow hover:shadow-md transition"
            >
              <h5 className="font-semibold text-lg mb-2">{faq.q}</h5>
              <p className="text-gray-600">{faq.a}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-center mb-12">Meet Our Support Team</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              { name: "Sarah Johnson", role: "Customer Support", img: "https://randomuser.me/api/portraits/women/44.jpg" },
              { name: "Michael Smith", role: "Technical Support", img: "https://randomuser.me/api/portraits/men/32.jpg" },
              { name: "Emily Davis", role: "Community Manager", img: "https://randomuser.me/api/portraits/women/68.jpg" },
            ].map((member, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl hover:-translate-y-2 transition transform"
              >
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-28 h-28 rounded-full mx-auto mb-4 object-cover border-4 border-red-500 shadow"
                />
                <h5 className="font-semibold text-xl">{member.name}</h5>
                <p className="text-gray-600">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
