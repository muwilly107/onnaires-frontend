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
        setLoading("Uploading product details...");
        setError("");
        setSuccess("");

        try {
            const data = new FormData();
            data.append("product_name", productName);
            data.append("product_description", productDescription);
            data.append("product_cost", productCost);
            data.append("product_category", productCategory);
            data.append("product_photo", productPhoto);

            const response = await axios.post(
                "https://william123.alwaysdata.net/api/addproduct",
                data
            );

            setLoading("");
            setSuccess(
                response.data.message || "Menu item added successfully!"
            );
            setProductName("");
            setProductDescription("");
            setProductCost("");
            setProductCategory("Food");
            setProductPhoto(null);
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
                        <input
                            type="text"
                            placeholder="Item Name (e.g. Chicken Wings)"
                            className="form-control"
                            required
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <textarea
                            placeholder="Description (e.g. Spicy grilled wings with dipping sauce)"
                            className="form-control"
                            required
                            value={productDescription}
                            onChange={(e) => setProductDescription(e.target.value)}
                        ></textarea>
                    </div>

                    <div className="mb-3">
                        <input
                            type="number"
                            placeholder="Price (KES)"
                            className="form-control"
                            required
                            value={productCost}
                            onChange={(e) => setProductCost(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <select
                            className="form-select"
                            value={productCategory}
                            onChange={(e) => setProductCategory(e.target.value)}
                        >
                            <option value="Food">Food</option>
                            <option value="Drinks">Drinks</option>
                            <option value="Dessert">Dessert</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <input
                            type="file"
                            className="form-control"
                            required
                            onChange={(e) => setProductPhoto(e.target.files[0])}
                        />
                    </div>

                    <button type="submit" className="btn btn-add-product">
                        Add to Menu
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;