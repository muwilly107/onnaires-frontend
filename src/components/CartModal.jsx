import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CartModal = ({ show, handleClose, cartItems = [], onRemoveItem }) => {
    const navigate = useNavigate();
    const [locationNotes, setLocationNotes] = useState("");

    if (!show) return null;

    const totalCost = cartItems.reduce(
        (sum, item) => sum + Number(item.product_cost || 0),
        0
    );

    const handleProceedToCheckout = () => {
        handleClose();
        // Pass the entire cart and delivery notes to M-Pesa page
        navigate("/mpesa", { 
            state: { 
                cartItems, 
                totalCost, 
                locationNotes 
            } 
        });
    };

    return (
        <div
            className="modal show d-block"
            tabIndex="-1"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.75)" }}
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content bg-dark text-light border border-warning">
                    <div className="modal-header border-bottom border-warning">
                        <h5 className="modal-title text-warning fw-bold">Your Cart</h5>
                        <button
                            type="button"
                            className="btn-close btn-close-white"
                            onClick={handleClose}
                        ></button>
                    </div>

                    <div className="modal-body" style={{ maxHeight: "400px", overflowY: "auto" }}>
                        {cartItems.length === 0 ? (
                            <p className="text-center text-secondary my-3">
                                Your cart is currently empty.
                            </p>
                        ) : (
                            <>
                                <ul className="list-group list-group-flush mb-3">
                                    {cartItems.map((item, index) => (
                                        <li
                                            key={index}
                                            className="list-group-item bg-dark text-light border-secondary d-flex justify-content-between align-items-center"
                                        >
                                            <div>
                                                <div className="fw-bold">{item.product_name}</div>
                                                <small className="text-success fw-bold">
                                                    Ksh {item.product_cost}
                                                </small>
                                            </div>
                                            {onRemoveItem && (
                                                <button
                                                    className="btn btn-outline-danger btn-sm"
                                                    onClick={() => onRemoveItem(index)}
                                                >
                                                    Remove
                                                </button>
                                            )}
                                        </li>
                                    ))}
                                </ul>

                                {/* Delivery Location Field */}
                                <div className="mb-2">
                                    <label className="form-label text-warning small fw-bold">
                                        Delivery Location / Landmark
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control bg-dark text-light border-secondary"
                                        placeholder="e.g. Stage, Apartment Name, House No."
                                        value={locationNotes}
                                        onChange={(e) => setLocationNotes(e.target.value)}
                                    />
                                </div>
                            </>
                        )}
                    </div>

                    <div className="modal-footer border-top border-warning justify-content-between">
                        <div className="fw-bold fs-5 text-warning">
                            Total: <span className="text-light">Ksh {totalCost}</span>
                        </div>
                        <div>
                            <button
                                className="btn btn-outline-secondary me-2"
                                onClick={handleClose}
                            >
                                Close
                            </button>
                            <button
                                className="btn btn-warning fw-bold text-dark"
                                onClick={handleProceedToCheckout}
                                disabled={cartItems.length === 0}
                            >
                                Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartModal;