import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const MpesaPayment = ({ showNotification }) => {
    const location = useLocation();
    const navigate = useNavigate();

    // Single item passed from Buy Now
    const singleProduct = location.state?.product;
    // Multiple items passed from CartModal
    const cartItems = location.state?.cartItems || [];
    const passedTotal = location.state?.totalCost;
    const defaultLocation = location.state?.locationNotes || "";

    // Calculate final bill amount
    const payableAmount = singleProduct 
        ? Number(singleProduct.product_cost || 0) 
        : passedTotal || cartItems.reduce((sum, item) => sum + Number(item.product_cost || 0), 0);

    const [phone, setPhone] = useState("");
    const [deliveryLocation, setDeliveryLocation] = useState(defaultLocation);
    const [loading, setLoading] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const submit = async (e) => {
        e.preventDefault();
        setLoading("Initiating STK Push on your phone...");
        setError("");
        setSuccess("");

        try {
            const data = new FormData();
            data.append("phone", phone);
            data.append("amount", payableAmount);
            data.append("location", deliveryLocation);

            const response = await axios.post(
                "https://william123.alwaysdata.net/api/mpesa_payment",
                data
            );

            setLoading("");
            const msg = response.data.message || "STK Push sent! Enter M-Pesa PIN on your phone.";
            setSuccess(msg);
            if (showNotification) showNotification(msg, "success");
        } catch (err) {
            setLoading("");
            const errMsg = "Payment request failed. Please try again.";
            setError(errMsg);
            if (showNotification) showNotification(errMsg, "danger");
        }
    };

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-md-6 card bg-dark text-light border-warning shadow p-4">
                    {loading && <div className="alert alert-warning text-dark">{loading}</div>}
                    {success && <div className="alert alert-success">{success}</div>}
                    {error && <div className="alert alert-danger">{error}</div>}

                    <h3 className="mb-3 text-center text-warning fw-bold">Lipa na M-Pesa</h3>

                    {/* Order Summary */}
                    <div className="mb-4 border-bottom border-secondary pb-3">
                        <h5 className="text-warning">Order Summary</h5>
                        {singleProduct ? (
                            <div className="d-flex justify-content-between align-items-center my-2">
                                <span>{singleProduct.product_name}</span>
                                <span className="text-success fw-bold">Ksh {singleProduct.product_cost}</span>
                            </div>
                        ) : cartItems.length > 0 ? (
                            <ul className="list-group list-group-flush mb-2">
                                {cartItems.map((item, idx) => (
                                    <li key={idx} className="list-group-item bg-dark text-light border-secondary d-flex justify-content-between px-0">
                                        <span>{item.product_name}</span>
                                        <span className="text-success fw-bold">Ksh {item.product_cost}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-secondary small">No items selected.</p>
                        )}

                        <div className="d-flex justify-content-between align-items-center mt-3 fs-5 fw-bold">
                            <span>Total Payable:</span>
                            <span className="text-warning">Ksh {payableAmount}</span>
                        </div>
                    </div>

                    <form onSubmit={submit}>
                        <div className="mb-3">
                            <label className="form-label text-warning">M-Pesa Phone Number</label>
                            <input
                                type="text"
                                className="form-control bg-dark text-light border-warning"
                                placeholder="2547XXXXXXXX or 07XXXXXXXX"
                                required
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label text-warning">Delivery Address / Landmark</label>
                            <input
                                type="text"
                                className="form-control bg-dark text-light border-warning"
                                placeholder="Apartment name, stage, building, room no."
                                required
                                value={deliveryLocation}
                                onChange={(e) => setDeliveryLocation(e.target.value)}
                            />
                        </div>

                        <div className="d-flex gap-2">
                            <button 
                                type="button" 
                                className="btn btn-outline-secondary w-50"
                                onClick={() => navigate("/")}
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit" 
                                className="btn btn-warning fw-bold text-dark w-50"
                                disabled={payableAmount === 0}
                            >
                                Pay Ksh {payableAmount}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MpesaPayment;