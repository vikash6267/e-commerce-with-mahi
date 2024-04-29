import React from "react";
import "./App.css"
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/common/Header"
function App() {
 

  return (
    <div className="w-screen h-screen">
      <Header/>

      <Routes>
      <Route path="/" element={<Home />} />



      </Routes>
    </div>

  );
}

export default App;
