import React, { useEffect } from "react";

import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
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
import TrackOrder from "./pages/TrackOrder";
import Credit from "./pages/Credit";
import Refer from "./pages/Refer";
import Order from "./pages/Order";
import Footer from "./components/common/Footer/Footer"
import Checkout from "./pages/Checkout"

import Whatsapp from "./components/common/Whatsapp";
import ContactUs from "./pages/ContactUs";
import NotFoundPage from "./pages/404";
import Search from "./pages/SerachFunctionallity";
import TermsConditions from "./pages/TermAndCondition";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import FAQ from "./pages/FAQ";
import usePageTracking from "./seo/usePageTracking"
import MyComingSoonPage from "./pages/ComminSoon";
import CancellationRefund from "./pages/ReturnRefundPolicy";
import ShippingDelivery from "./pages/ShipingPolicy";
import AboutUs from "./pages/AboutUs";







function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { checkout } = useSelector((state) => state.payment);
  const { token } = useSelector((state) => state.auth);
  usePageTracking()
  
  useEffect(() => {
    dispatch(getAllProduct());

    if (token) {
      fetchWishlist(token, dispatch);
      dispatch(fetchMyProfile(token,navigate));
    }
  }, [token]);

  return (
    <div className="min-w-screen min-h-screen flex flex-col font-montserrat ">

      <Header />
     

      <Routes>
        {/* <Route path="/" element={<MyComingSoonPage />} /> */}
        <Route path="/" element={<Home />} />
    {/* not found */}
    <Route path="*" element={<NotFoundPage />} />


        <Route path="/cart" element={<CartMain />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/search" element={<Search />} />
        <Route path="/allProduct" element={<AllProduct />} />
        <Route path="/allProduct/:query" element={<AllProduct />} />
        <Route path="/product/:productID" element={<ProductDetails />} />
        <Route path="/product/:productID/:refer" element={<ProductDetails />} />
       
       
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/return-refund-policy" element={<CancellationRefund />} />
        <Route path="/shipping-policy" element={<ShippingDelivery />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/fqa" element={<FAQ />} />

       
       







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
