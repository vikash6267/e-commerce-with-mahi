import React from "react";
import "./App.css"
import { Route, Routes } from "react-router-dom";
import MobileMenu from "./components/common/MobileMenu";
import Home from "./pages/Home";
import Header from "./components/common/Header"
function App() {
 

  return (
    <div className="w-screen min-h-screen">
      <Header/>

      <Routes>
      <Route path="/" element={<Home />} />



      </Routes>


      <div className="fixed bottom-0 md:right-10 right-4 w-screen">
    <MobileMenu />
      </div>
    </div>

  );
}

export default App;
