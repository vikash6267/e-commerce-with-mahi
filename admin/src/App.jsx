import React from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddProduct from "./pages/AddProduct";
import GetProducts from "./pages/GetProducts";

const App = () => {
  return (
    <div className="flex">
      <div className="w-20">
        <Sidebar />
      </div>
      <div className=" p-8 w-full">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/admin/add-product" element={<AddProduct />} />
          <Route path="/admin/add-product/:id" element={<AddProduct />} />
          <Route path="/admin/get-products" element={<GetProducts />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
