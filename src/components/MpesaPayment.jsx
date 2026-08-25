import React, { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const MpesaPayment = () => {
    const location = useLocation();
    const product = location.state?.product || {};
    const image_url = "https://william123.alwaysdata.net/static/images/";

    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const submit = async (e) => {
        e.preventDefault();
        setLoading("Please wait...");
        setError("");
        setSuccess("");

        try {
            const data = new FormData();
            data.append("phone", phone);
            data.append("amount", product.product_cost || "0");

            const response = await axios.post(
                "https://william123.alwaysdata.net/api/mpesa_payment",
                data
            );

            setLoading("");
            setSuccess(response.data.message || "STK Push sent successfully!");
        } catch (err) {
            setLoading("");
            setError("Payment request failed.");
        }
    };

    return (
        <div className="row justify-content-center mt-4 me-0 ms-0">
            <div className="col-md-6 card shadow p-4 mpesa-card">
                {loading && <div className="alert alert-info">{loading}</div>}
                {success && <div className="alert alert-success">{success}</div>}
                {error && <div className="alert alert-danger">{error}</div>}

                <h3 className="mb-3 text-center text-light">Lipa na M-Pesa</h3>

                {product.product_name && (
                    <div className="mb-3 text-center">
                        <img
                            src={image_url + product.product_photo}
                            alt={product.product_name}
                            className="product-img img-fluid rounded mb-3"
                            style={{ maxHeight: "180px", objectFit: "contain" }}
                        />
                        <h4 className="text-light">{product.product_name}</h4>
                        <p className="text-warning fw-bold">KES {product.product_cost}</p>
                    </div>
                )}

                <form onSubmit={submit}>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter phone (2547XXXXXXXX)"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="btn btn-success w-100">
                        Pay Now
                    </button>
                </form>
            </div>
        </div>
    );
};

export default MpesaPayment;