import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-dark text-light border-top border-warning py-5 mt-auto">
            <div className="container">
                <div className="row">
                    {/* Brand Info */}
                    <div className="col-md-4 mb-4">
                        <h3 className="text-warning fw-bold">Onnaires Food</h3>
                        <p className="text-secondary small">
                            Delicious hot meals, refreshing beverages, and mouth-watering
                            desserts delivered straight to your door.
                        </p>
                        <p className="text-secondary small">
                            © 2026 Onnaires Food. All rights reserved.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="col-md-4 mb-4">
                        <h5 className="text-warning fw-bold mb-3">Quick Links</h5>
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <Link to="/" className="text-secondary text-decoration-none">
                                    Menu
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/addproduct" className="text-secondary text-decoration-none">
                                    Add Item
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/signin" className="text-secondary text-decoration-none">
                                    Sign In
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/signup" className="text-secondary text-decoration-none">
                                    Sign Up
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact & Social Links */}
                    <div className="col-md-4 mb-4">
                        <h5 className="text-warning fw-bold mb-3">Contact Us</h5>
                        <p className="text-secondary mb-1">📍 Nairobi, Kenya</p>
                        <p className="text-secondary mb-1">
                            📞 <a href="tel:0116374210" className="text-secondary text-decoration-none">0116374210</a>
                        </p>
                        <p className="text-secondary mb-1">
                            💬 <a 
                                href="https://wa.me/254116374210?text=Hello%20Onnaires%20Food,%20I%20would%20like%20to%20make%20an%20inquiry." 
                                target="_blank" 
                                rel="noreferrer" 
                                className="text-warning text-decoration-none"
                            >
                                Chat on WhatsApp
                            </a>
                        </p>
                        <p className="text-secondary mb-1">
                            📸 <a 
                                href="https://instagram.com" 
                                target="_blank" 
                                rel="noreferrer" 
                                className="text-warning text-decoration-none"
                            >
                                Follow on Instagram
                            </a>
                        </p>
                        <p className="text-secondary mb-1">⏰ Mon - Sun: 8:00 AM - 10:00 PM</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;