import React, { useState } from "react";
import { styles } from "../assets/dummyadmin";
import { FiHeart, FiStar, FiUpload } from "react-icons/fi";
import axios from "axios";

const AddItems = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    rating: 0,
    hearts: 0,
    image: null,
    preview: "",
  });

  const [categories] = useState([
    "Breakfast", "Lunch", "Dinner", 
    "Mexican", "Italian", "Desserts", "Drinks"
  ]);

  const [hoverRating, setHoverRating] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file,
        preview: URL.createObjectURL(file),
      }));
    }
  };

  const handleRating = (rating) => setFormData(prev => ({ ...prev, rating }));
  const handleHearts = () => setFormData(prev => ({ ...prev, hearts: prev.hearts + 1 }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = new FormData();
      payload.append('name', formData.name);
      payload.append('description', formData.description);
      payload.append('category', formData.category);
      payload.append('price', formData.price);
      payload.append('rating', formData.rating);
      payload.append('hearts', formData.hearts);
      if (formData.image) {
        payload.append('image', formData.image);
      }

      const res = await axios.post("https://mern-food-delivery-webapplication-backend.onrender.com/api/items", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setFormData({
        name: "",
        description: "",
        category: "",
        price: "",
        rating: 0,
        hearts: 0,
        image: null,
        preview: "",
      });

      alert("Item added successfully!");

    } catch (err) {
      console.error("Error uploading item:", err.response?.data || err.message);
      alert("Failed to add item. Please try again.");
    }
  };

  return (
    <div className={styles.formWrapper}>
      <div className="max-w-4xl mx-auto">
        <div className={styles.formCard}>
          <h2 className={styles.formTitle}>Add New Menu Items</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className={styles.uploadWrapper}>
              <label htmlFor="file-upload" className={styles.uploadLabel}>
                {formData.preview ? (
                  <img src={formData.preview} alt="Preview" className={styles.previewImage} />
                ) : (
                  <div className="text-center p-4">
                    <FiUpload className={styles.uploadIcon} />
                    <p className={styles.uploadText}>Click to upload product image</p>
                  </div>
                )}
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  required
                />
              </label>
            </div>

            <div className="space-y-4">
              <div>
                <label className={styles.inputLabel}>Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={styles.inputField}
                  required
                />
              </div>

              <div>
                <label className={styles.inputLabel}>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className={`${styles.inputField} h-32`}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={styles.inputLabel}>Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className={styles.inputField}
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={styles.inputLabel}>Price</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className={styles.inputField}
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={styles.inputLabel}>Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="text-2xl"
                      >
                        <FiStar
                          className={
                            star <= (hoverRating || formData.rating)
                              ? "text-amber-400 fill-current"
                              : "text-gray-300"
                          }
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className={styles.inputLabel}>Popularity</label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleHearts}
                      className="text-2xl text-amber-400"
                    >
                      <FiHeart />
                    </button>
                    <input
                      type="number"
                      name="hearts"
                      value={formData.hearts}
                      onChange={handleInputChange}
                      className={styles.inputField}
                      min="0"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <button type="submit" className={styles.actionBtn}>
              Add Item
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddItems;