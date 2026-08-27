import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import NavBar from "./components/NavBar";
import NotificationToast from "./components/NotificationToast";
import Carousel from "./components/Carousel";
import GetProduct from "./components/GetProduct";
import AddProduct from "./components/AddProduct";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import MpesaPayment from "./components/MpesaPayment";
import CartModal from "./components/CartModal";
import Wishlist from "./components/Wishlist";
import Footer from "./components/Footer";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [user, setUser] = useState(null);

  // Load user session on initial load
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        setUser(null);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const [toast, setToast] = useState({ message: "", type: "success" });

  const showNotification = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast({ message: "", type: "success" });
    }, 3000);
  };

  const handleAddToCart = (product) => {
    setCartItems((prev) => [...prev, product]);
    showNotification(`${product.product_name} added to your cart!`, "warning");
  };

  const handleRemoveFromCart = (indexToRemove) => {
    setCartItems((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleAddToWishlist = (product) => {
    const exists = wishlistItems.some(
      (item) => (item.product_id || item.id) === (product.product_id || product.id)
    );
    if (exists) {
      showNotification(`${product.product_name} is already in your wishlist!`, "info");
      return;
    }
    setWishlistItems((prev) => [...prev, product]);
    showNotification(`${product.product_name} saved to wishlist!`, "success");
  };

  const handleRemoveFromWishlist = (productId) => {
    setWishlistItems((prev) =>
      prev.filter((item) => (item.product_id || item.id) !== productId)
    );
  };

  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100 bg-dark text-light">
        <NavBar 
          cartCount={cartItems.length} 
          wishlistCount={wishlistItems.length}
          onOpenCart={() => setShowCart(true)} 
          user={user}
          onLogout={handleLogout}
        />
        
        <NotificationToast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast({ message: "", type: "success" })} 
        />

        <main className="flex-grow-1">
          <Routes>
            <Route 
              path="/" 
              element={
                <>
                  <Carousel />
                  <GetProduct 
                    onAddToCart={handleAddToCart} 
                    onAddToWishlist={handleAddToWishlist}
                  />
                </>
              } 
            />
            <Route path="/addProduct" element={<AddProduct user={user} />} />
            <Route path="/signin" element={<SignIn onLoginSuccess={(u) => setUser(u)} />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/mpesa" element={<MpesaPayment showNotification={showNotification} />} />
            <Route 
              path="/wishlist" 
              element={
                <Wishlist 
                  wishlistItems={wishlistItems} 
                  onRemove={handleRemoveFromWishlist} 
                  onAddToCart={handleAddToCart}
                />
              } 
            />
          </Routes>
        </main>

        <CartModal
          show={showCart}
          handleClose={() => setShowCart(false)}
          cartItems={cartItems}
          onRemoveItem={handleRemoveFromCart}
        />

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;