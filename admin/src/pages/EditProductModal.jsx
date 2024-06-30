import React, { useState } from 'react';
import { editProduct } from '../serivces/operations/admin';

const EditProductModal = ({ product, closeModal }) => {
  const [formData, setFormData] = useState({
    title: product.title,
    description: product.description,
    price: product.price,
    fabric: product.fabric,
    washingInstructions: product.washingInstructions,
    printing: product.printing,
    sizes: product.sizes.join(', '), // Assuming sizes is an array
    gender: product.gender.join(', '), // Assuming gender is an array
    category: product.category,
    quantity: product.quantity,
    sold: product.sold,
    images: product.images.map(image => image.url).join(', '), // Assuming images is an array of objects with `url` property
    views: product.views,
  });
  const [token, setToken] = useState(''); // Set your authentication token here

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await editProduct(formData);
      closeModal(); // Close modal after successful edit
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
          
          {/* Fabric */}
          <label>Fabric:</label>
          <input
            type="text"
            name="fabric"
            value={formData.fabric}
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
          
          {/* Sizes */}
          <label>Sizes (comma-separated):</label>
          <input
            type="text"
            name="sizes"
            value={formData.sizes}
            onChange={handleChange}
          />
          
          {/* Gender */}
          <label>Gender (comma-separated):</label>
          <input
            type="text"
            name="gender"
            value={formData.gender}
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
          
          {/* Quantity */}
          <label>Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
          />
          
          {/* Sold */}
          <label>Sold:</label>
          <input
            type="number"
            name="sold"
            value={formData.sold}
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
