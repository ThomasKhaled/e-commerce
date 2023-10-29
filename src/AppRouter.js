// AppRouter.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Authentication/Signup";
import MainPage from "./Pages/Main/MainPage";
import ItemInfoPage from "./Pages/ItemInfo/ItemInfoPage";
import Cart from "./Pages/Cart/Cart";
import AboutUs from "./Pages/AboutUs/AboutUs";
import PrivacyAndPolicy from "./Pages/PrivacyAndPolicy/PrivacyAndPolicy";
import Favorites from "./Pages/Favorites/Favorites";
import Profile from "./Pages/Profile/Profile";
import ViewAllCategory from "./Pages/ViewAllCategory/ViewAllCategory";
import Buy from "./Pages/Buy/Buy";
import Completion from "./Pages/Completion/Completion";
const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Signup />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/item" element={<ItemInfoPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about_us" element={<AboutUs />} />
        <Route path="/privacy&policy" element={<PrivacyAndPolicy />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/view_all_category" element={<ViewAllCategory />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/completion" element={<Completion />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
