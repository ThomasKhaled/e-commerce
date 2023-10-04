// AppRouter.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Authentication/Signup";
import MainPage from "./Pages/Main/MainPage";
import ItemInfoPage from "./Pages/ItemInfo/ItemInfoPage";
import Cart from "./Pages/Cart/Cart";
import AboutUs from "./Pages/AboutUs/AboutUs";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Signup />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/item" element={<ItemInfoPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about_us" element={<AboutUs />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
