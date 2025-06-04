import React, { useEffect, useState } from "react";
import { useCart } from "../../CartContext/CartContext";
import { FaPlus, FaMinus } from "react-icons/fa";
import axios from "axios";

const categories = [
  "Breakfast",
  "Lunch",
  "Dinner",
  "Mexican",
  "Italian",
  "Desserts",
  "Drinks",
];

const OurMenu = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [menuData, setMenuData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { cartItems, addToCart, removeFromCart, updateQuantity } = useCart();

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const res = await axios.get('https://mern-food-delivery-webapplication-backend.onrender.com/api/items');
        
        // Handle different API response structures
        const items = Array.isArray(res.data) 
          ? res.data 
          : res.data?.data || [];
        
        if (!Array.isArray(items)) {
          throw new Error("Invalid data format received from server");
        }

        // Group items by category with proper image URLs
        const grouped = items.reduce((acc, item) => {
          if (!item.category) return acc;
          
          const category = item.category.trim();
          if (!acc[category]) {
            acc[category] = [];
          }
          
          // Construct proper image URL
          let imageUrl = '';
          if (item.image) {
            imageUrl = item.image.startsWith('http') 
              ? item.image 
              : `https://mern-food-delivery-webapplication-backend.onrender.com/uploads/${item.image}`;
          } else if (item.imageUrl) {
            imageUrl = item.imageUrl;
          }
          
          acc[category].push({
            ...item,
            imageUrl,
            category: category // Ensure consistent formatting
          });
          
          return acc;
        }, {});

        setMenuData(grouped);
      } catch (error) {
        console.error("Error fetching menu items:", error);
        setError(error.response?.data?.message || error.message || "Failed to load menu items");
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  const getCartEntry = id => cartItems.find(ci => ci.item._id === id);
  const getQuantity = id => getCartEntry(id)?.quantity || 0;
  const displayItems = (menuData[activeCategory] || []).slice(0, 12);

  if (loading) {
    return (
      <div className="bg-gradient-to-b from-[#1a1212] to-[#2a1e1e] text-white py-16 px-6 sm:px-12 lg:px-24 font-[Poppins] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500 mx-auto mb-4"></div>
          <p className="text-amber-100">Loading menu items...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-b from-[#1a1212] to-[#2a1e1e] text-white py-16 px-6 sm:px-12 lg:px-24 font-[Poppins] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-xl mb-4">Error loading menu</p>
          <p className="text-amber-100">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-2 bg-amber-600 rounded-lg hover:bg-amber-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-[#1a1212] to-[#2a1e1e] text-white py-16 px-6 sm:px-12 lg:px-24 font-[Poppins]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-4xl sm:text-5xl md:text-6xl mb-1 transform transition-all bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent font-[Playfair_Display] italic">
            <span className="font-cursive text-5xl md:text-7xl sm:text-6xl mb-0">
              Our Exquisite Menu
            </span>
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 sm:px-6 py-2 rounded-full border-2 transition-all duration-300 font-[Playfair_Display] text-sm sm:text-base ${
                activeCategory === cat
                  ? `bg-gradient-to-r from-amber-600 to-amber-800 border-amber-500/50 scale-105 shadow-lg shadow-amber-500/20`
                  : "bg-[#4b3b3b]/50 border-amber-800/30 text-amber-100 hover:bg-[#4b3b3b]/70 hover:scale-95"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {displayItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {displayItems.map((item) => {
              const quantity = getQuantity(item._id);
              const cartEntry = getCartEntry(item._id);

              return (
                <div
                  key={item._id}
                  className="relative group bg-[#4b3b3b] rounded-3xl overflow-hidden shadow-2xl transform hover:-translate-y-2 transition-all duration-500 hover:shadow-amber-500/20 border-2 border-transparent hover:border-amber-500/20"
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
                  </div>

                  <div className="p-6 relative z-10">
                    <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent font-[Playfair_Display] italic">
                      {item.name}
                    </h3>
                    <p className="text-gray-300 mb-5 text-sm leading-relaxed tracking-wide line-clamp-3">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-xl font-bold text-amber-400 flex-1">
                        Rs {item.price.toFixed(2)}
                      </span>
                      {quantity > 0 ? (
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => quantity > 1
                              ? updateQuantity(cartEntry._id, quantity - 1)
                              : removeFromCart(cartEntry._id)}
                            className="w-8 h-8 rounded-full bg-amber-900/40 flex items-center justify-center hover:bg-amber-800/50 transition-all duration-200 active:scale-95"
                          >
                            <FaMinus className="w-3 h-3 text-amber-100" />
                          </button>
                          <span className="w-8 text-center text-amber-100 font-cinzel">
                            {quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(cartEntry._id, quantity + 1)}
                            className="w-8 h-8 rounded-full bg-amber-900/40 flex items-center justify-center hover:bg-amber-800/50 transition-all duration-200 active:scale-95"
                          >
                            <FaPlus className="w-3 h-3 text-amber-100" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => addToCart(item, 1)}
                          className="relative flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg hover:shadow-amber-500/30 transition-all duration-300"
                        >
                          <span>Add</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-amber-100 text-lg mb-4">
              No items found in the {activeCategory} category
            </p>
            <p className="text-gray-400 text-sm">
              Try selecting a different category or check back later
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OurMenu;