import React, { useEffect } from "react";

import "./App.css";
import { Route, Routes } from "react-router-dom";
import MobileMenu from "./components/common/MobileMenu";
import Home from "./pages/Home";
import Header from "./components/common/Header";
import CartMain from "./pages/CartMain";
import ProductDetails from "./pages/ProductDetails";
import { useDispatch, useSelector } from "react-redux";
// Routes
import OpenRoute from "./routes/OpenRoute";
import PrivateRoute from "./routes/PrivateRoute";

import { getAllProduct } from "./serivces/operations/product";
import AllProduct from "./pages/AllProduct";
import Login from "./pages/Login";
import Signup from "./components/core/Login/Signup";
import Profile from "./pages/Profile";
import CheckoutForm from "./components/core/Cart/CheckoutForm";
import { setCheckout } from "./slices/paymentSlice";
import Modal from "./components/core/Cart/Modal";

import SummaryDetails from "./pages/Test";

function App() {
  const dispatch = useDispatch();
  const { checkout} = useSelector((state) => state.payment);

  useEffect(() => {
    dispatch(getAllProduct());
  }, []);

  return (
    <div className="min-w-screen min-h-screen flex flex-col">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/test" element={<SummaryDetails />} />

        <Route path="/cart" element={<CartMain />} />
        <Route path="/allProduct" element={<AllProduct />} />
        <Route path="product/:productID" element={<ProductDetails />} />
        <Route path="test" element={<Signup email={"hdsffjhgfdsj"} />} />
        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        <Route
          path="login/:refer"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />

        <Route
          path="profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
      </Routes>




      {checkout && (
          <Modal show={checkout} handleClose={()=> dispatch(setCheckout(false))}>
            <CheckoutForm />
          </Modal>
        )}


      <div className="fixed bottom-0 z-40">
        <MobileMenu />
      </div>
    </div>
  );
}

export default App;
