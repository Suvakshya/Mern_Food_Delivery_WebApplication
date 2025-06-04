import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FiGlobe, FiMapPin, FiPhone, FiMail, FiMessageSquare } from "react-icons/fi";
import { FaArrowRight } from "react-icons/fa";
import { contactFormFields } from "../../assets/dummydata";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    dish: "",
    query: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success(
      <div className="flex items-center">
        <span className="text-lg font-bold">🎉 Success!</span>
        <span className="ml-2">We'll contact you shortly</span>
      </div>,
      {
        style: {
          background: 'rgba(20, 83, 45, 0.9)',
          color: '#fff',
          padding: '16px 24px',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(74, 222, 128, 0.3)',
          border: '1px solid rgba(74, 222, 128, 0.3)',
          backdropFilter: 'blur(8px)',
          animation: 'bounce 0.5s'
        },
        iconTheme: {
          primary: '#4ADE80',
          secondary: '#fff',
        },
        duration: 4000,
      }
    );
    setFormData({
      name: "",
      phone: "",
      email: "",
      address: "",
      dish: "",
      query: "",
    });
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="min-h-screen bg-gradient-to-r from-orange-900 via-amber-900 to-gray-900 py-8 px-4 sm:px-6 font-[Poppins]">
      <Toaster 
        position="top-center"
        toastOptions={{
          className: '',
          style: {
            zIndex: 999999,
          },
        }}
      />
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-300">
            Connect With Us
          </span>
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contact info */}
          <div className="space-y-4">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border-l-2 border-amber-500 hover:bg-white/10 transition-colors">
              <div className="flex items-center mb-2">
                <FiMapPin className="text-amber-400 mr-3 text-xl" />
                <h3 className="text-amber-100 font-medium">Our Headquarters</h3>
              </div>
              <p className="text-amber-100 pl-8">Kathmandu, Nepal</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border-l-2 border-green-500 hover:bg-white/10 transition-colors">
              <div className="flex items-center mb-2">
                <FiPhone className="text-green-400 mr-3 text-xl" />
                <h3 className="text-amber-100 font-medium">Contact Number</h3>
              </div>
              <p className="text-amber-100 pl-8 flex items-center">
                <FiGlobe className="text-green-400 mr-2" />
                +977 9744803230
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border-l-2 border-orange-500 hover:bg-white/10 transition-colors">
              <div className="flex items-center mb-2">
                <FiMail className="text-orange-400 mr-3 text-xl" />
                <h3 className="text-amber-100 font-medium">Email Address</h3>
              </div>
              <p className="text-amber-100 pl-8">FoodFrenzy@gmail.com</p>
            </div>
          </div>
          
          {/* Contact form */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-amber-500/30 hover:border-amber-500/50 transition-all">
            <form onSubmit={handleSubmit} className="space-y-4">
              {contactFormFields.map(({ label, name, type, placeholder, pattern, Icon }) => (
                <div key={name} className="mb-3">
                  <label className="block text-amber-100 text-sm mb-1 font-medium">{label}</label>
                  <div className="relative">
                    <Icon className="absolute left-3 top-3 text-amber-500" />
                    <input
                      type={type}
                      name={name}
                      value={formData[name]}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-2 bg-white/10 border border-amber-500/30 rounded-lg text-amber-50 focus:ring-1 focus:ring-amber-500 focus:outline-none"
                      placeholder={placeholder}
                      pattern={pattern}
                      required
                    />
                  </div>
                </div>
              ))}
              
              <div className="mb-3">
                <label className="block text-amber-100 text-sm mb-1 font-medium">Your Query</label>
                <div className="relative">
                  <FiMessageSquare className="absolute left-3 top-3 text-amber-500" />
                  <textarea
                    rows="3"
                    name="query"
                    value={formData.query}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2 bg-white/10 border border-amber-500/30 rounded-lg text-amber-50 focus:ring-1 focus:ring-amber-500 focus:outline-none"
                    placeholder="Type your message here..."
                    required
                  ></textarea>
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:from-amber-700 hover:to-orange-700 transition-all hover:shadow-lg hover:shadow-amber-500/20"
              >
                <span className="font-medium">Submit Query</span>
                <FaArrowRight className="text-sm transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

// 10;23;00