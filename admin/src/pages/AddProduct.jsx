import React, { useState } from "react";

const AddProduct = () => {
  const [productData, setProductData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    sizes: [],
    gender: [],
    quantity: "",
    sold: 0,
    images: [{ public_id: "", url: "" }],
  });
  return <div></div>;
};

export default AddProduct;
