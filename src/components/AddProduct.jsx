import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const AddProduct = ({ user }) => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [cost, setCost] = useState("");
    const [category, setCategory] = useState("Food");
    const [description, setDescription] = useState("");
    const [photo, setPhoto] = useState(null);
    const [message, setMessage] = useState("");

    // Lock page if user is not signed in
    if (!user) {
        return (
            <div className="container my-5 text-center" style={{ minHeight: "50vh" }}>
                <div className="card bg-dark text-light border-warning p-5 mx-auto" style={{ maxWidth: "500px" }}>
                    <h3 className="text-warning mb-3">Access Restricted</h3>
                    <p className="text-secondary mb-4">You must be signed in to add new products to the menu.</p>
                    <div className="d-flex justify-content-center gap-3">
                        <Link to="/signin" className="btn btn-warning fw-bold text-dark">
                            Sign In Now
                        </Link>
                        <Link to="/" className="btn btn-outline-secondary">
                            Back to Menu
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("Uploading product...");

        const formData = new FormData();
        formData.append("product_name", name);
        formData.append("product_cost", cost);
        formData.append("product_category", category);
        formData.append("product_description", description);
        formData.append("product_photo", photo);

        try {
            const response = await axios.post(
                "https://william123.alwaysdata.net/api/addproduct",
                formData
            );
            setMessage(response.data.message || "Product added successfully!");
            setTimeout(() => navigate("/"), 1500);
        } catch (error) {
            setMessage("Failed to add product. Please check input values.");
        }
    };

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-md-6 card bg-dark text-light border-warning shadow p-4">
                    <h2 className="text-center text-warning fw-bold mb-4">Add Menu Item</h2>

                    {message && <div className="alert alert-warning text-dark">{message}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label text-warning">Product Name</label>
                            <input
                                type="text"
                                className="form-control bg-dark text-light border-warning"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label text-warning">Cost (Ksh)</label>
                            <input
                                type="number"
                                className="form-control bg-dark text-light border-warning"
                                required
                                value={cost}
                                onChange={(e) => setCost(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label text-warning">Category</label>
                            <select
                                className="form-select bg-dark text-light border-warning"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="Food">Food</option>
                                <option value="Drinks">Drinks</option>
                                <option value="Desserts">Desserts</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label className="form-label text-warning">Description</label>
                            <textarea
                                className="form-control bg-dark text-light border-warning"
                                rows="3"
                                required
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </div>

                        <div className="mb-3">
                            <label className="form-label text-warning">Product Photo</label>
                            <input
                                type="file"
                                className="form-control bg-dark text-light border-warning"
                                accept="image/*"
                                required
                                onChange={(e) => setPhoto(e.target.files[0])}
                            />
                        </div>

                        <button type="submit" className="btn btn-warning fw-bold text-dark w-100 mt-3">
                            Upload Product
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;