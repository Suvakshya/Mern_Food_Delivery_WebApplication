import React, { useState, useEffect } from "react";
import { useCart } from "../../CartContext/CartContext";
import { FaFire, FaHeart, FaStar, FaPlus, FaMinus } from "react-icons/fa"; 
import FloatingParticle from "../FloatingParticle/FloatingParticle";
import axios from "axios";

const SpecialOffer = () => {
  const [showAll, setShowAll] = useState(false);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { cartItems, addToCart, updateQuantity, removeFromCart } = useCart();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/items');
        const data = response.data?.data || [];
        
        if (!Array.isArray(data)) {
          throw new Error("Invalid data format received from server");
        }
        
        // Process image URLs similar to OurHomeMenu
        const processedItems = data.map(item => ({
          ...item,
          imageUrl: item.image 
            ? item.image.startsWith('http') 
              ? item.image 
              : `http://localhost:4000/uploads/${item.image}`
            : item.imageUrl
        }));
        
        setItems(processedItems);
        setError(null);
      } catch (error) {
        console.error('Error fetching items:', error);
        setError(error.message || 'Failed to load items. Please try again.');
        setItems([]);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const getCartEntry = (id) => cartItems.find((ci) => ci.item._id === id);
  const getQuantity = (id) => getCartEntry(id)?.quantity || 0;

  const addButtonBase = "relative flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg font-medium";
  const addButtonHover = "hover:shadow-lg hover:shadow-amber-500/30";
  const commonTransition = "transition-all duration-300";

  if (loading) {
    return (
      <div className="bg-gradient-to-b from-[#1a1212] to-[#2a1e1e] text-white py-16 px-6 sm:px-12 lg:px-24 font-[Poppins]">
        <div className="max-w-7xl mx-auto text-center">
          Loading special offers...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-b from-[#1a1212] to-[#2a1e1e] text-white py-16 px-6 sm:px-12 lg:px-24 font-[Poppins]">
        <div className="max-w-7xl mx-auto text-center text-red-400">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-[#1a1212] to-[#2a1e1e] text-white py-16 px-6 sm:px-12 lg:px-24 font-[Poppins]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h1 className="text-5xl font-bold mb-4 transform transition-all bg-gradient-to-r from-amber-400 to-red-500 bg-clip-text text-transparent font-[Playfair_Display] italic">
            Today's <span className="text-stroke-gold">Special</span> Offers
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto tracking-wide leading-relaxed italic">
            Savor the extraordinary with our culinary masterpieces crafted to
            perfection.
          </p>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {(showAll ? items : items.slice(0, 4)).map((item) => {
            const qty = getQuantity(item._id);
            const cartEntry = getCartEntry(item._id);

            return (
              <div
                key={item._id}
                className="relative group bg-[#4b3b3b] rounded-3xl overflow-hidden shadow-2xl transform hover:-translate-y-4 transition-all duration-500 hover:shadow-red-900/40 border-2 border-transparent hover:border-amber-500/20 before:absolute before:inset-0 hover:before:opacity-20"
              >
                <div className="relative h-64 overflow-hidden">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover brightness-90 group-hover:brightness-110 transition-all duration-500"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Available';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                      <span className="text-gray-400">No image available</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90" />
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full">
                    <span className="flex items-center gap-2 text-amber-400">
                      <FaStar className="text-xl drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]" />
                      <span className="font-bold">{item.rating}</span>
                    </span>
                    <span className="flex items-center gap-2 text-red-400">
                      <FaHeart className="text-xl animate-heartbeat" />
                      <span className="font-bold">{item.hearts}</span>
                    </span>
                  </div>
                </div>

                <div className="p-6 relative z-10">
                  <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent font-[Playfair_Display] italic">
                    {item.name}
                  </h3>
                  <p className="text-gray-300 mb-5 text-sm leading-relaxed tracking-wide">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-2xl font-bold text-amber-400 flex-1">
                      Rs. {Number(item.price).toFixed(2)}
                    </span>
                    {qty > 0 ? (
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => qty > 1 
                            ? updateQuantity(cartEntry._id, qty - 1) 
                            : removeFromCart(cartEntry._id)
                          }
                          className="w-8 h-8 rounded-full bg-amber-900/40 flex items-center justify-center hover:bg-amber-800/50 transition-all duration-200 active:scale-95"
                        >
                          <FaMinus className="w-3 h-3 text-amber-100" />
                        </button>
                        <span className="w-8 text-center text-amber-100 font-cinzel">
                          {qty}
                        </span>
                        <button
                          onClick={() => updateQuantity(cartEntry._id, qty + 1)}
                          className="w-8 h-8 rounded-full bg-amber-900/40 flex items-center justify-center hover:bg-amber-800/50 transition-all duration-200 active:scale-95"
                        >
                          <FaPlus className="w-3 h-3 text-amber-100" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(item, 1)}
                        className={`${addButtonBase} ${addButtonHover} ${commonTransition}`}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-transparent opacity-0 hover:opacity-10 transition-opacity duration-300" />
                        <FaPlus className="text-lg transition-transform" />
                        <span className="relative z-10">Add</span>
                      </button>
                    )}
                  </div>
                </div>

                <div className="absolute inset-0 rounded-3xl pointer-events-none border-2 border-transparent group-hover:border-amber-500/30 transition-all duration-500" />

                <div className="opacity-0 group-hover:opacity-100">
                  <FloatingParticle />
                </div>
              </div>
            );
          })}
        </div>

        {items.length > 4 && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="flex items-center gap-3 bg-gradient-to-r from-red-700 to-amber-700 text-white px-8 py-4 rounded-2xl font-bold text-lg uppercase tracking-wider hover:gap-4 hover:scale-105 hover:shadow-xl hover:shadow-amber-500/20 transition-all duration-300 group border-2 border-amber-400/30 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 via-transparent to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <FaFire className="text-xl animate-pulse" />
              <span className="relative z-10">{showAll ? "Show Less" : "Show More"}</span>
              <div className="h-full w-1 bg-amber-400 absolute right-0 top-0 group-hover:animated-border-pulse" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpecialOffer;