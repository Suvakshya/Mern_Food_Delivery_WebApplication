import React, { useEffect, useState } from "react";
import { styles } from "../assets/dummyadmin";
import { FiStar, FiTrash, FiTrash2 } from "react-icons/fi";
import axios from "axios";

const List = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/items');
        
        // Handle response data structure
        const data = response.data?.data || [];
        
        if (!Array.isArray(data)) {
          throw new Error("Invalid data format received from server");
        }
        
        setItems(data);
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

  const handleDelete = async (itemId) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      await axios.delete(`http://localhost:4000/api/items/${itemId}`);
      setItems(prev => prev.filter(item => item._id !== itemId));
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Failed to delete item');
    }
  };

  const renderStars = (rating) =>
    [...Array(5)].map((_, i) => (
      <FiStar
        key={i}
        className={`text-xl ${
          i < rating ? 'text-amber-400 fill-current' : "text-amber-100/30"
        }`}
      />
    ));

  if (loading) {
    return <div className={styles.pageLoading}>Loading Menu...</div>;
  }

  if (error) {
    return <div className={styles.pageError}>{error}</div>;
  }

  return (
    <div className={styles.pageWrapper}>
      <div className="max-w-7xl mx-auto">
        <div className={styles.cardContainer}>
          <h2 className={styles.title}>Manage Menu Items</h2>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead className={styles.thead}>
                <tr>
                  <th className={styles.th}>Image</th>
                  <th className={styles.th}>Name</th>
                  <th className={styles.th}>Category</th>
                  <th className={styles.th}>Price(Rs)</th>
                  <th className={styles.th}>Rating</th>
                  <th className={styles.th}>Hearts</th>
                  <th className={styles.thCenter}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.length > 0 ? (
                  items.map((item) => (
                    <tr key={item._id} className={styles.tr}>
                      <td className={styles.imgCell}>
                        {item.imageUrl && (
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className={styles.img}
                          />
                        )}
                      </td>
                      <td className={styles.nameCell}>
                        <div className="space-y-1">
                          <p className={styles.nameText}>{item.name}</p>
                          <p className={styles.descText}>{item.description}</p>
                        </div>
                      </td>
                      <td className={styles.categoryCell}>{item.category}</td>
                      <td className={styles.priceCell}>Rs. {item.price}</td>
                      <td className={styles.ratingCell}>
                        <div className="flex">{renderStars(item.rating)}</div>
                      </td>
                      <td className={styles.heartsCell}>{item.hearts}</td>
                      <td className={styles.actionCell}>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className={styles.deleteBtn}
                        >
                          <FiTrash2 className="text-2xl"/>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className={styles.noItems}>
                      No items found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;