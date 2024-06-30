import React, { useEffect, useState } from "react";
import { getAllProduct } from "../serivces/operations/product";
import "./GetProducts.css";
import EditProductModal from "./EditProductModal"; // Import your modal component

const GetProducts = () => {
  const [products, setProducts] = useState([]);
  const [editProductId, setEditProductId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await getAllProduct();
        setProducts(result);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleEditClick = (productId) => {
    setEditProductId(productId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditProductId(null);
  };

  return (
    <div className="products-container">
      <h1>Products</h1>
      {products.length > 0 ? (
        <table className="products-table">
          <thead>
            <tr>
              <th>Title</th>
              {/* Other table headers */}
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.title}</td>
                {/* Other table data */}
                <td>
                  <button onClick={() => handleEditClick(product._id)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-products-message">No products found.</p>
      )}

      {/* Modal for editing */}
      {isModalOpen && (
        <EditProductModal
          product={products.find((product) => product._id === editProductId)}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default GetProducts;
