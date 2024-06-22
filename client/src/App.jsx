import React, { useEffect } from "react";

import "./App.css";
import { Route, Routes } from "react-router-dom";
import MobileMenu from "./components/common/MobileMenu";
import Home from "./pages/Home";
import Header from "./components/common/Header";
import CartMain from "./pages/CartMain";
import ProductDetails from "./pages/ProductDetails";
import { useDispatch, useSelector } from "react-redux";

//network 
import { fetchMyProfile } from "./serivces/operations/user";
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
import { fetchWishlist } from "./serivces/operations/product";

import Wishlist from "./pages/Wishlist";
import ShirtViewer from "./pages/Test";
import TrackOrder from "./pages/TrackOrder";
import Credit from "./pages/Credit";
import Refer from "./pages/Refer";
import Order from "./pages/Order";
import Footer from "./components/common/Footer/Footer"
import Checkout from "./pages/Checkout"

import Whatsapp from "./components/common/Whatsapp";
import ContactUs from "./pages/ContactUs";
function App() {
  const dispatch = useDispatch();
  const { checkout } = useSelector((state) => state.payment);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getAllProduct());

    if (token) {
      fetchWishlist(token, dispatch);
      dispatch(fetchMyProfile(token));
    }
  }, [token]);

  return (
    <div className="min-w-screen min-h-screen flex flex-col font-montserrat ">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />


        <Route path="/test" element={<ShirtViewer />} />

        <Route path="/cart" element={<CartMain />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/allProduct" element={<AllProduct />} />
        <Route path="/allProduct/:query" element={<AllProduct />} />
        <Route path="product/:productID" element={<ProductDetails />} />
        <Route path="product/:productID/:refer" element={<ProductDetails />} />

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
        <Route
          path="trackorder"
          element={
            <PrivateRoute>
              <TrackOrder />
            </PrivateRoute>
          }
        />
        <Route
          path="wallet"
          element={
            <PrivateRoute>
              <Credit />
            </PrivateRoute>
          }
        />
        <Route
          path="refer"
          element={
            <PrivateRoute>
              <Refer />
            </PrivateRoute>
          }
        />
        <Route
          path="wishlist"
          element={
            <PrivateRoute>
              <Wishlist />
            </PrivateRoute>
          }
        />
        <Route
          path="order"
          element={
            <PrivateRoute>
              <Order />
            </PrivateRoute>
          }
        />
        <Route
          path="checkout"
          element={
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          }
        />
      </Routes>

      {checkout && (
        <PrivateRoute>
          <Modal
            show={checkout}
            handleClose={() => dispatch(setCheckout(false))}
          >
            <CheckoutForm  handleClose={() => dispatch(setCheckout(false))} />
          </Modal>
        </PrivateRoute>
      )}

      {/* <div className="fixed bottom-0 z-40">
        <MobileMenu />
      </div> */}
      <Footer />

      <div className="fixed bottom-8 md:right-10 right-4">
    <Whatsapp />

      </div>
    </div>
  );
}

export default App;
