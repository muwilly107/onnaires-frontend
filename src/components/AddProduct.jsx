import React, { useState } from "react";
import axios from "axios";
import "../App.css";

const AddProduct = () => {
    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productCost, setProductCost] = useState("");
    const [productCategory, setProductCategory] = useState("Food");
    const [productPhoto, setProductPhoto] = useState(null);

    const [loading, setLoading] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const submit = async (e) => {
        e.preventDefault();

        if (!productPhoto) {
            setError("Please upload an image.");
            return;
        }

        setLoading("Uploading product details...");
        setError("");
        setSuccess("");

        try {
            const data = new FormData();
            data.append("product_name", productName);
            data.append("product_description", productDescription);
            data.append("product_cost", productCost);
            // Explicitly pass category (defaults to 'Food' if state is somehow blank)
            data.append("product_category", productCategory || "Food"); 
            data.append("product_photo", productPhoto);

            const response = await axios.post(
                "https://william123.alwaysdata.net/api/addproduct",
                data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            setLoading("");
            setSuccess(response.data.message || "Menu item added successfully!");
            setProductName("");
            setProductDescription("");
            setProductCost("");
            setProductCategory("Food");
            setProductPhoto(null);
            e.target.reset(); // Reset file input UI
        } catch (err) {
            setLoading("");
            setError("Failed to add product. Please check server connection.");
        }
    };

    return (
        <div className="row justify-content-center mt-4 me-0 ms-0">
            <div className="col-md-6 card shadow p-4 add-product-card">
                {loading && <div className="alert alert-info">{loading}</div>}
                {success && <div className="alert alert-success">{success}</div>}
                {error && <div className="alert alert-danger">{error}</div>}

                <h2 className="mb-3 text-center add-product-title">
                    Add Restaurant Item
                </h2>

                <form onSubmit={submit}>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Item Name</label>
                        <input
                            type="text"
                            placeholder="Item Name"
                            className="form-control"
                            required
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-bold">Description</label>
                        <textarea
                            placeholder="Description"
                            className="form-control"
                            required
                            value={productDescription}
                            onChange={(e) => setProductDescription(e.target.value)}
                        ></textarea>
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-bold">Price (KES)</label>
                        <input
                            type="number"
                            placeholder="Price"
                            className="form-control"
                            required
                            value={productCost}
                            onChange={(e) => setProductCost(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-bold">Category</label>
                        <select
                            className="form-select"
                            value={productCategory}
                            onChange={(e) => setProductCategory(e.target.value)}
                        >
                            <option value="Food">Food</option>
                            <option value="Drinks">Drinks</option>
                            <option value="Desserts">Desserts</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-bold">Photo</label>
                        <input
                            type="file"
                            className="form-control"
                            required
                            onChange={(e) => setProductPhoto(e.target.files[0])}
                        />
                    </div>

                    <button type="submit" className="btn btn-warning w-100 fw-bold mt-2">
                        Add to Menu
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;