import React, { useEffect, useState } from "react";
import { getAllProduct } from "../serivces/operations/product";
import { deleteProduct } from "../serivces/operations/admin";
import { Link } from "react-router-dom";
import "./GetProducts.css";

const GetProducts = () => {
  const [products, setProducts] = useState([]);

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

  const handleDeleteClick = async (productId) => {
    try {
      await deleteProduct({ productId });
      setProducts(products.filter((product) => product._id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="products-container">
      <h1>Products</h1>
      {products.length > 0 ? (
        <div className="container mx-auto px-4">
          <table className="min-w-full bg-white shadow-md rounded">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="w-1/12 px-4 py-2">Title</th>
                <th className="w-1/12 px-4 py-2">High Price</th>
                <th className="w-1/12 px-4 py-2">Price</th>
                <th className="w-1/12 px-4 py-2">Images</th>
                <th className="w-1/12 px-4 py-2">Quantity</th>
                <th className="w-1/12 px-4 py-2">Sizes</th>
                <th className="w-1/12 px-4 py-2">Sold</th>
                <th className="w-1/12 px-4 py-2">View</th>
                <th className="w-1/12 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr
                  key={index}
                  className="text-center border-b border-gray-200"
                >
                  <td className="px-4 py-2">{product.title}</td>
                  <td className="px-4 py-2">{product.highPrice}</td>
                  <td className="px-4 py-2">{product.price}</td>
                  <td className="px-4 py-2">
                    <div className="flex justify-center">
                      {product.images.map((image, idx) => (
                        <img
                          key={idx}
                          src={image.url}
                          alt={`Product ${index} Image ${idx}`}
                          className="w-16 h-16 object-cover m-1"
                        />
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-2">{product.quantity}</td>

                  <td className="px-4 py-2 flex gap-2">
                    {product.sizes?.map((one) => (
                      <p>{one?.size}</p>
                    ))}
                  </td>

                  <td className="px-4 py-2">{product.sold}</td>
                  <td className="px-4 py-2">{product.view}</td>
                  <td className="px-4 py-2">
                    <div className="flex justify-center space-x-2">
                      <Link
                        to={`/admin/add-product/${product._id}`}
                        className="bg-blue-500 text-white px-2 py-1 rounded"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteClick(product._id)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="no-products-message">No products found.</p>
      )}
    </div>
  );
};

export default GetProducts;
