import React from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddProduct from "./pages/AddProduct";
import GetProducts from "./pages/GetProducts";
import ProductForm from "./components/Product/SizeSelect";
import Coupons from "./pages/Coupons";
import AllUsers from "./pages/AllUsers";
import AllOrders from "./pages/AllOrders";
import Login from "./pages/Login";
import OpenRoute from "./components/routes/OpenRoute";
import PrivateRoute from "./components/routes/PrivateRoute";
import MainSidebar from "./components/Dashboard/index"
//Routes
const App = () => {
  return (
    <div className="flex">
     
      <div className=" p- w-full">
        <Routes>

        <Route path="/" element={<Navigate to="/admin/dashboard" />} />
          <Route
            path="/login"
            element={
              <OpenRoute>
                <Login />
              </OpenRoute>
            }
          />
          <Route element={
            <PrivateRoute>

            <MainSidebar />
            </PrivateRoute>

            }>
              

          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/add-product" element={<AddProduct />} />
          <Route path="/admin/add-product/:id" element={<AddProduct />} />
          <Route path="/admin/get-products" element={<GetProducts />} />

          <Route path="/admin/coupons" element={<Coupons />} />
          <Route path="/admin/all-users" element={<AllUsers />} />
          <Route path="/admin/all-orders" element={<AllOrders />} />

          <Route path="/admin/test" element={<ProductForm />} />
            </Route>
        </Routes>
      </div>
    </div>
  );
};

export default App;
