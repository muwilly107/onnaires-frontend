import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CartModal = ({ show, handleClose, cartItems = [], onRemoveItem }) => {
    const navigate = useNavigate();
    const [locationNotes, setLocationNotes] = useState("");
    const image_url = "https://william123.alwaysdata.net/static/images/";

    if (!show) return null;

    const totalCost = cartItems.reduce(
        (sum, item) => sum + Number(item.product_cost || 0),
        0
    );

    const handleProceedToCheckout = () => {
        handleClose();
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
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content bg-dark text-light border border-warning">
                    <div className="modal-header border-bottom border-warning">
                        <h5 className="modal-title text-warning fw-bold">Your Order Cart</h5>
                        <button
                            type="button"
                            className="btn-close btn-close-white"
                            onClick={handleClose}
                        ></button>
                    </div>

                    <div className="modal-body" style={{ maxHeight: "420px", overflowY: "auto" }}>
                        {cartItems.length === 0 ? (
                            <p className="text-center text-secondary my-4">
                                Your cart is currently empty.
                            </p>
                        ) : (
                            <>
                                <div className="d-flex flex-column gap-2 mb-3">
                                    {cartItems.map((item, index) => (
                                        <div
                                            key={index}
                                            className="d-flex align-items-center justify-content-between bg-dark text-light border border-secondary rounded p-2"
                                        >
                                            {/* Product Image Thumbnail */}
                                            <div className="d-flex align-items-center gap-3">
                                                <img
                                                    src={image_url + item.product_photo}
                                                    alt={item.product_name}
                                                    className="rounded border border-secondary"
                                                    style={{ width: "60px", height: "60px", objectFit: "cover" }}
                                                />
                                                <div>
                                                    <h6 className="mb-0 text-warning">{item.product_name}</h6>
                                                    <small className="text-success fw-bold">
                                                        Ksh {item.product_cost}
                                                    </small>
                                                </div>
                                            </div>

                                            {onRemoveItem && (
                                                <button
                                                    className="btn btn-outline-danger btn-sm"
                                                    onClick={() => onRemoveItem(index)}
                                                >
                                                    Remove
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* Delivery Location Input */}
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