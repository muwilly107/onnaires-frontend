import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="onnaires-footer">
            <div className="container">
                <div className="row">
                    {/* Brand Info */}
                    <div className="col-md-4 mb-4">
                        <h3 className="brand-title">Onnaires Food</h3>
                        <p className="footer-text">
                            Delicious hot meals, refreshing beverages, and mouth-watering
                            desserts delivered straight to your door.
                        </p>
                        <p className="copyright-text">
                            © 2026 Onnaires Food. All rights reserved.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="col-md-4 mb-4">
                        <h5 className="footer-section-title">Quick Links</h5>
                        <ul className="footer-links">
                            <li>
                                <Link to="/" className="footer-link">
                                    Menu
                                </Link>
                            </li>
                            <li>
                                <Link to="/addproduct" className="footer-link">
                                    Add Item
                                </Link>
                            </li>
                            <li>
                                <Link to="/signin" className="footer-link">
                                    Sign In
                                </Link>
                            </li>
                            <li>
                                <Link to="/signup" className="footer-link">
                                    Sign Up
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Details */}
                    <div className="col-md-4 mb-4">
                        <h5 className="footer-section-title">Contact Us</h5>
                        <p className="contact-info">📍 Nairobi, Kenya</p>
                        <p className="contact-info">📞 +254 700 000 000</p>
                        <p className="contact-info">✉️ support@onnairesfood.com</p>
                        <p className="contact-info">⏰ Mon - Sun: 8:00 AM - 10:00 PM</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;