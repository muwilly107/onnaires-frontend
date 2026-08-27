import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const MpesaPayment = ({ showNotification }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const singleProduct = location.state?.product;
    const cartItems = location.state?.cartItems || [];
    const passedTotal = location.state?.totalCost;
    const defaultLocation = location.state?.locationNotes || "";

    const payableAmount = singleProduct 
        ? Number(singleProduct.product_cost || 0) 
        : passedTotal || cartItems.reduce((sum, item) => sum + Number(item.product_cost || 0), 0);

    const [phone, setPhone] = useState("");
    const [deliveryLocation, setDeliveryLocation] = useState(defaultLocation);
    const [loading, setLoading] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const image_url = "https://william123.alwaysdata.net/static/images/";

    // Formats 07XXXXXXXX, 01XXXXXXXX, or +254... into 2547XXXXXXXX / 2541XXXXXXXX
    const formatPhoneNumber = (input) => {
        let cleaned = input.replace(/\D/g, "");

        if (cleaned.startsWith("0")) {
            cleaned = "254" + cleaned.slice(1);
        } else if (cleaned.startsWith("7") || cleaned.startsWith("1")) {
            cleaned = "254" + cleaned;
        }

        return cleaned;
    };

    const submit = async (e) => {
        e.preventDefault();
        
        const formattedPhone = formatPhoneNumber(phone);

        if (formattedPhone.length !== 12) {
            const invalidMsg = "Please enter a valid Kenyan phone number (e.g. 0xxxxxxxx, 254xxxxxxxx, or +254xxxxxxx).";
            setError(invalidMsg);
            if (showNotification) showNotification(invalidMsg, "danger");
            return;
        }

        setLoading("Initiating STK Push on your phone...");
        setError("");
        setSuccess("");

        try {
            const data = new FormData();
            data.append("phone", formattedPhone);
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
            {/* Scoped CSS rule forces placeholder visibility across browsers */}
            <style>
                {`
                    .custom-mpesa-input::placeholder {
                        color: #a0a0a0 !important;
                        opacity: 1 !important;
                        -webkit-text-fill-color: #a0a0a0 !important;
                    }
                `}
            </style>

            <div className="row justify-content-center">
                <div className="col-md-7 card bg-dark text-light border-warning shadow p-4">
                    {loading && <div className="alert alert-warning text-dark">{loading}</div>}
                    {success && <div className="alert alert-success">{success}</div>}
                    {error && <div className="alert alert-danger">{error}</div>}

                    <h3 className="mb-3 text-center text-warning fw-bold">Lipa na M-Pesa</h3>

                    {/* Order Visual Summary */}
                    <div className="mb-4 border-bottom border-secondary pb-3">
                        <h5 className="text-warning mb-3">Items Being Purchased</h5>

                        {singleProduct ? (
                            <div className="d-flex align-items-center gap-3 bg-dark border border-secondary rounded p-2">
                                <img
                                    src={image_url + singleProduct.product_photo}
                                    alt={singleProduct.product_name}
                                    className="rounded border border-secondary"
                                    style={{ width: "70px", height: "70px", objectFit: "cover" }}
                                />
                                <div>
                                    <h6 className="text-light mb-1">{singleProduct.product_name}</h6>
                                    <span className="text-success fw-bold">Ksh {singleProduct.product_cost}</span>
                                </div>
                            </div>
                        ) : cartItems.length > 0 ? (
                            <div className="d-flex flex-column gap-2" style={{ maxHeight: "200px", overflowY: "auto" }}>
                                {cartItems.map((item, idx) => (
                                    <div 
                                        key={idx} 
                                        className="d-flex align-items-center justify-content-between bg-dark border border-secondary rounded p-2 me-1"
                                    >
                                        <div className="d-flex align-items-center gap-3">
                                            <img
                                                src={image_url + item.product_photo}
                                                alt={item.product_name}
                                                className="rounded border border-secondary"
                                                style={{ width: "50px", height: "50px", objectFit: "cover" }}
                                            />
                                            <span className="text-light fw-bold">{item.product_name}</span>
                                        </div>
                                        <span className="text-success fw-bold">Ksh {item.product_cost}</span>
                                    </div>
                                ))}
                            </div>
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
                                className="form-control form-control-lg bg-dark border-warning shadow-sm custom-mpesa-input"
                                style={{
                                    color: "#ffffff",
                                    backgroundColor: "#121212",
                                    borderColor: "#ffc107"
                                }}
                                placeholder="e.g. 254xxxxxxxx, +254xxxxxxx, or 0xxxxxxxx"
                                required
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label text-warning">Delivery Address / Landmark</label>
                            <input
                                type="text"
                                className="form-control form-control-lg bg-dark border-warning shadow-sm custom-mpesa-input"
                                style={{
                                    color: "#ffffff",
                                    backgroundColor: "#121212",
                                    borderColor: "#ffc107"
                                }}
                                placeholder="e.g. Viraj gardens, kileleshwa, or near wanguge market"
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