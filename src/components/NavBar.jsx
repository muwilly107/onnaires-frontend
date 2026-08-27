import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NavBar = ({ cartCount = 0, wishlistCount = 0, onOpenCart, user, onLogout }) => {
    const navigate = useNavigate();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-warning sticky-top">
            <div className="container">
                <Link className="navbar-brand text-warning fw-bold fs-3" to="/">
                    Onnaires Food
                </Link>

                <button
                    className="navbar-toggler border-warning"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link text-light" to="/">Menu</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-light" to="/addproduct">Add Product</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-light" to="/wishlist">
                                Wishlist <span className="badge bg-warning text-dark">{wishlistCount}</span>
                            </Link>
                        </li>
                    </ul>

                    <div className="d-flex align-items-center gap-3">
                        {/* Cart Trigger */}
                        <button className="btn btn-outline-warning position-relative me-2" onClick={onOpenCart}>
                            🛒 Cart
                            {cartCount > 0 && (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        {/* User Dynamic Status */}
                        {user ? (
                            <div className="d-flex align-items-center gap-2">
                                <span className="text-warning fw-bold small">
                                    Signed in as <span className="text-light">{user.username || user.name || "User"}</span>
                                </span>
                                <button 
                                    className="btn btn-sm btn-outline-danger ms-2"
                                    onClick={() => {
                                        onLogout();
                                        navigate('/signin');
                                    }}
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="d-flex gap-2">
                                <Link to="/signin" className="btn btn-outline-warning btn-sm">
                                    Sign In
                                </Link>
                                <Link to="/signup" className="btn btn-warning btn-sm fw-bold text-dark">
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;