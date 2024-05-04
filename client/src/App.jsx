import React from "react";
import "./App.css"
import { Route, Routes } from "react-router-dom";
import MobileMenu from "./components/common/MobileMenu";
import Home from "./pages/Home";
import Header from "./components/common/Header"
import CartMain from "./pages/CartMain";
import ProductDetails from "./pages/ProductDetails";
function App() {
 

  return (
    <div className="min-w-screen min-h-screen flex flex-col">
      <Header/>

      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<CartMain />} />
      <Route path="product/:productID" element={<ProductDetails />} />




      </Routes>


      <div className="fixed bottom-0 z-40">
    <MobileMenu />
      </div>
    </div>

  );
}

export default App;
