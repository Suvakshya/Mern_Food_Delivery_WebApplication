import React, { useState } from "react";
import { FaRegEnvelope } from "react-icons/fa";
import { BiChevronRight } from "react-icons/bi";
import {socialIcons} from "../../assets/dummydata";

const Footer = () => {
  const navItems = [
    { name: "Home", link: "/" },
    { name: "Menu", link: "/menu" },
    { name: "About Us", link: "/about" },
    { name: "Contact", link: "/contact" },
  ];

  const [email, setEmail] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thanks for subscribing! We'll send updates to ${email}`);
    setEmail("");
  };

  return (
    <footer className="bg-[#1a1212] text-amber-100 py-16 px-6 sm:px-12 lg:px-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          {/* LEFT COLUMN */}
          <div className="space-y-6">
            <h2 className="text-5xl font-bold font-[Playfair_Display] italic text-amber-400">
              Foodi-Frenzy
            </h2>
            <p className="text-gray-300 text-lg italic max-w-md">
              When culinary artistry meets doorstep convenience.<br />
              Savor handcrafted perfection, delivered with care.
            </p>
            <form onSubmit={handleSubmit} className="relative mt-4 group">
              <div className="flex items-center gap-2 mb-2">
                <FaRegEnvelope className="text-amber-400 animate-pulse" />
                <span className="font-bold text-amber-400">
                  Get Exclusive Offers
                </span>
              </div>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-[#4b3b3b]/50 border-2 border-amber-400/30 focus:outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-400/20 transition-all duration-300 placeholder-gray-400 pr-24"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-1.5 shadow-lg hover:shadow-amber-500/20 overflow-hidden transition-all duration-500 group"
                >
                  <span className="font-bold text-sm tracking-wide transition-transform duration-300 group-hover:-translate-x-1">
                    Join Now
                  </span>
                  <BiChevronRight className="text-xl transition-transform duration-300 group-hover:translate-x-1" />
                  <span className="absolute inset-0 bg-gradient-to-r from-amber-600/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </button>
              </div>
            </form>
          </div>

          {/* MIDDLE COLUMN */}
          <div className="flex justify-center">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold mb-4 border-l-4 border-amber-500 pl-3 font-[Playfair_Display] italic text-amber-300">
                Navigation
              </h3>
              <ul className="space-y-3">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.link}
                      className="flex items-center hover:text-amber-400 transition-all group font-[Poppins] hover:pl-2"
                    >
                      <BiChevronRight className="mr-2 text-amber-400 group-hover:animate-bounce" />
                      <span className="hover:italic">{item.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex justify-center lg:justify-end">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold mb-4 border-l-4 border-amber-500 pl-3 font-[Playfair_Display] italic text-amber-300">
                Social Connect
              </h3>
              <div className="flex gap-4">
                {socialIcons.map(({ icon:Icon, link, color, label }, idx) => (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={link}
                    key={idx}
                    className="text-2xl bg-[#4b3b3b]/50 p-3 rounded-full hover:bg-amber-400/20 hover:scale-110 transition-all duration-300 relative group"
                    style={{ color }}
                  >
                    <Icon className="hover:scale-125 transition-transform" />
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-amber-400 text-black px-2 py-1 rounded text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                      {label}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="border-t border-amber-800 pt-8 mt-8 text-center">
          <p className="text-amber-400 text-lg mb-2 font-[Playfair_Display]">
            &copy; 2025 Foodie-Frenzy. All Rights Reserved.
          </p>
          <div className="group inline-block">
            <a 
              href="#" 
              target="_blank" 
              className="text-lg font-cursive bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent hover:text-amber-300 transition-all duration-500"
            >
              Designed By Suvakshya Acharya
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;