import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

// Component Imports
import NavBar from "./components/NavBar";
import NotificationToast from "./components/NotificationToast";
import GetProduct from "./components/GetProduct";
import AddProduct from "./components/AddProduct";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import MpesaPayment from "./components/MpesaPayment";
import CartModal from "./components/CartModal";
import Wishlist from "./components/Wishlist";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <NotificationToast />
      <Routes>
        <Route path="/" element={<GetProduct />} />
        <Route path="/add" element={<AddProduct />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/mpesa" element={<MpesaPayment />} />
        <Route path="/cart" element={<CartModal />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;