import React from "react";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

import OpenRoute from "./routing/OpenRoute";
import PrivateRoute from "./routing/PrivateRoute";

import Login from "./components/Auth/Login";
import MainLayout from "./components/MainLayout";
import AddProduct from "./pages/AddProduct";
import AddColor from "./pages/AddColor"
import ColorList from "./pages/ColorList";
import MyFormComponent from "./pages/TestingRoute";


function App() {
  return (
    <div className="flex min-h-screen w-screen flex-col bg-slate-100">
      <Routes>
        <Route
          path="/"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />

        <Route
          path="dashboard"
          element={
            <PrivateRoute>
              <MainLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="color" element={<AddColor />} />
          <Route path="color/:id" element={<AddColor />} />

          <Route path="list-color" element={<ColorList />} />
          <Route path="testing" element={<MyFormComponent />} />




        </Route>
      </Routes>
    </div>
  );
}

export default App;
