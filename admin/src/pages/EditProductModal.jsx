import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests

const EditProductModal = ({ product, closeModal }) => {
  const [formData, setFormData] = useState({
    id: product._id,
    title: product.title,
    description: product.description,
    price: product.price,
    category: product.category,
    sizes: JSON.stringify(product.sizes), // Convert array to JSON string
    quantity: product.quantity,
    fabric: product.fabric,
    gsm: product.gsm,
    washingInstructions: product.washingInstructions,
    printing: product.printing,
    gender: JSON.stringify(product.gender), // Convert array to JSON string
    images: JSON.stringify(product.images.map(image => ({ url: image.url }))), // Convert array of objects to JSON string
    views: product.views,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/edit', formData);
      console.log('Edit Product API Response:', response.data);
      closeModal(); // Close modal after successful edit (assuming closeModal is a function passed from parent)
    } catch (error) {
      console.error('Failed to edit product:', error);
      // Handle error (optional)
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <h2>Edit Product: {product.title}</h2>
        <form onSubmit={handleSubmit}>
          {/* Title */}
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          
          {/* Description */}
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          
          {/* Price */}
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
          
          {/* Category */}
          <label>Category:</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
          
          {/* Sizes (comma-separated) */}
          <label>Sizes (comma-separated):</label>
          <input
            type="text"
            name="sizes"
            value={formData.sizes}
            onChange={handleChange}
          />
          
          {/* Quantity */}
          <label>Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
          />
          
          {/* Fabric */}
          <label>Fabric:</label>
          <input
            type="text"
            name="fabric"
            value={formData.fabric}
            onChange={handleChange}
          />
          
          {/* GSM */}
          <label>GSM:</label>
          <input
            type="number"
            name="gsm"
            value={formData.gsm}
            onChange={handleChange}
          />
          
          {/* Washing Instructions */}
          <label>Washing Instructions:</label>
          <textarea
            name="washingInstructions"
            value={formData.washingInstructions}
            onChange={handleChange}
          />
          
          {/* Printing */}
          <label>Printing:</label>
          <input
            type="text"
            name="printing"
            value={formData.printing}
            onChange={handleChange}
          />
          
          {/* Gender (comma-separated) */}
          <label>Gender (comma-separated):</label>
          <input
            type="text"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          />
          
          {/* Images (comma-separated URLs) */}
          <label>Images (comma-separated URLs):</label>
          <input
            type="text"
            name="images"
            value={formData.images}
            onChange={handleChange}
          />
          
          {/* Views */}
          <label>Views:</label>
          <input
            type="number"
            name="views"
            value={formData.views}
            onChange={handleChange}
          />
          
          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;
