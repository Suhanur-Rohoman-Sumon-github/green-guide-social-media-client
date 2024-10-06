"use client";
import { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., send data to an API or email service)
    console.log("Form submitted:", formData);
    // Reset form fields after submission
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-6 lg:px-20 py-12">
        <h1 className="text-4xl font-bold text-center text-green-500 mb-6">
          Contact Us
        </h1>
        <p className="text-lg text-center mb-12">
          Got any questions or feedback? Feel free to reach out to us by filling
          out the form below.
        </p>
        <div className=" rounded-lg shadow-lg p-8  mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                placeholder="Enter your name"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="message"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                placeholder="Write your message here"
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="px-6 py-3 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 focus:ring-4 focus:ring-green-500"
              >
                Send Message
              </button>
            </div>
          </form>
          <div className="text-center my-12">
            <h2 className="text-2xl font-semibold text-green-500 mb-6">
              Other Ways to Reach Us
            </h2>
            <p className="text-lg">Email: support@gardensocial.com</p>
            <p className="text-lg">Phone: +123-456-7890</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
