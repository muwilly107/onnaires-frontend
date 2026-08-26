import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
            <Link className="navbar-brand fw-bold" to="/">
                Onnaires Food
            </Link>
            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav me-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">
                            Menu
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/addProduct">
                            Add Product
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/wishlist">
                            Wishlist
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/cart">
                            Cart
                        </Link>
                    </li>
                </ul>

                {/* Added Sign In & Sign Up links to the right side */}
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/signin">
                            Sign In
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="btn btn-outline-warning ms-2" to="/signup">
                            Sign Up
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;