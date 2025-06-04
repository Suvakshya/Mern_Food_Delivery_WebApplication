import React, { useState } from "react";
import { motion } from "framer-motion";
import { features, stats, teamMembers } from '../../assets/dummydata.js';

const About = () => {
  const [hoveredStat, setHoveredStat] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a120b] via-[#3c2a21] to-[#1a120b] text-amber-50 overflow-hidden relative">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10 mix-blend-soft-light">
        <div className="absolute top-1/4 left-20 w-96 h-96 bg-amber-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-orange-600/15 rounded-full blur-3xl" />
      </div>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-24 px-6 sm:px-12 lg:px-24 text-center relative"
      >
        <div className="max-w-4xl mx-auto">
          <motion.h1 
            className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 font-[Playfair_Display] italic bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-500"
          >
            Culinary Express
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto tracking-wide leading-relaxed italic"
          >
            Crafting unforgettable dining experiences delivered to your doorstep.
          </motion.p>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="py-12 px-6 sm:px-12 lg:px-24 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div 
                key={f.id} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="relative group"
              >
                <div className="absolute -inset-1 bg-gradient-to-br from-amber-600/30 to-amber-500/30 rounded-3xl blur-lg opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
                <div className="relative bg-[#4b3b3b]/90 backdrop-blur-lg rounded-3xl overflow-hidden border border-amber-600/30 hover:border-amber-500 transition-all duration-500 h-full p-8 flex flex-col items-center text-center">
                  <div className={`p-5 rounded-full bg-gradient-to-b ${f.color} mb-6 transition-transform duration-300 group-hover:scale-110`}>
                    <Icon className="text-3xl text-white" />
                  </div>
                  <h3 className="text-2xl font-bold font-[Playfair_Display] italic text-amber-300 mb-3">
                    {f.title}
                  </h3>
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                    {f.text}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 sm:px-12 lg:px-24 relative">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-16 font-[Playfair_Display] italic text-amber-300"
          >
            Our Impact
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative group"
                onMouseEnter={() => setHoveredStat(i)}
                onMouseLeave={() => setHoveredStat(null)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} rounded-2xl opacity-20 blur-md transition-all duration-500 ${hoveredStat === i ? 'scale-105' : ''}`} />
                <div className="relative bg-[#4b3b3b]/90 backdrop-blur-lg rounded-2xl overflow-hidden border border-amber-600/30 p-8 text-center transition-all duration-500 h-full">
                  <div className="flex justify-center mb-4">
                    <stat.icon className={`text-4xl ${hoveredStat === i ? 'animate-bounce' : ''}`} />
                  </div>
                  <h3 className="text-5xl font-bold font-[Playfair_Display] italic mb-2">
                    {stat.number}
                  </h3>
                  <p className="text-gray-300 uppercase tracking-wider text-sm">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-6 sm:px-12 lg:px-24 relative">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-16 font-[Playfair_Display] italic text-amber-300"
          >
            Meet Our Master Chefs
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {teamMembers.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative group"
              >
                <div className="absolute -inset-1 bg-gradient-to-br from-amber-600/30 to-amber-500/30 rounded-3xl blur-lg opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
                <div className="relative bg-[#4b3b3b]/90 backdrop-blur-lg rounded-3xl overflow-hidden border border-amber-600/30 hover:border-amber-500 transition-all duration-500 h-full">
                  <div className="h-64 overflow-hidden">
                    <img 
                      src={member.img} 
                      alt={member.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold font-[Playfair_Display] italic text-amber-300 mb-1">
                      {member.name}
                    </h3>
                    <p className="text-amber-100 mb-3">{member.role}</p>
                    <p className="text-gray-300 text-sm mb-4">{member.bio}</p>
                    <div className="flex gap-3">
                      {Object.entries(member.social).map(([platform, url]) => (
                        <a 
                          key={platform}
                          href={url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-amber-100 hover:text-amber-400 transition-colors"
                        >
                          {platform.charAt(0).toUpperCase() + platform.slice(1)}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;