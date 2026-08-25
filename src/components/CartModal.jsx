import React from "react";

const CartModal = ({ show, handleClose, cartItems = [], onCheckout }) => {
    if (!show) return null;

    const totalCost = cartItems.reduce(
        (sum, item) => sum + Number(item.product_cost || 0),
        0
    );

    return (
        <div
            className="modal show d-block"
            tabIndex="-1"
            style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content bg-dark text-light border-secondary">
                    <div className="modal-header border-secondary">
                        <h5 className="modal-title">Your Cart</h5>
                        <button
                            type="button"
                            className="btn-close btn-close-white"
                            onClick={handleClose}
                        ></button>
                    </div>

                    <div className="modal-body">
                        {cartItems.length === 0 ? (
                            <p className="text-center text-secondary">Your cart is empty.</p>
                        ) : (
                            <ul className="list-group list-group-flush">
                                {cartItems.map((item, index) => (
                                    <li
                                        key={index}
                                        className="list-group-item bg-dark text-light border-secondary d-flex justify-content-between align-items-center"
                                    >
                                        <div>
                                            <strong>{item.product_name}</strong>
                                        </div>
                                        <span className="badge bg-success">
                                            KES {item.product_cost}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="modal-footer border-secondary justify-content-between">
                        <div className="fw-bold text-warning">
                            Total: KES {totalCost}
                        </div>
                        <div>
                            <button
                                className="btn btn-secondary me-2"
                                onClick={handleClose}
                            >
                                Close
                            </button>
                            <button
                                className="btn btn-success"
                                onClick={onCheckout}
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