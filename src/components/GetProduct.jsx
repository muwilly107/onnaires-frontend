import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

const GetProduct = ({ onAddToCart, onAddToWishlist }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState("");
    const [error, setError] = useState("");

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const navigate = useNavigate();

    const image_url = "https://william123.alwaysdata.net/static/images/";

    const getproducts = async () => {
        setLoading("Hold on as we get your products...");
        try {
            const response = await axios.get(
                "https://william123.alwaysdata.net/api/getproducts"
            );
            setProducts(response.data);
            setLoading("");
        } catch (error) {
            setLoading("");
            setError("Something went wrong... please try again.");
        }
    };

    useEffect(() => {
        getproducts();
    }, []);

    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.product_name
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase());

        const dbCat = (product.product_category || "").toString().toLowerCase().trim();
        const selectedCat = selectedCategory.toLowerCase().trim();
        const matchesCategory = selectedCategory === "All" || dbCat === selectedCat;

        return matchesSearch && matchesCategory;
    });

    return (
        <div className="container my-5">
            <h1 className="text-warning display-4 text-center mb-4">
                Onnaires Restaurant Menu
            </h1>

            {/* Simple SearchBar Component */}
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

            {/* Category Filter Buttons */}
            <div className="d-flex justify-content-center gap-2 mb-4">
                {["All", "Food", "Drinks", "Desserts"].map((category) => (
                    <button
                        key={category}
                        className={`btn ${
                            selectedCategory === category
                                ? "btn-warning fw-bold text-dark"
                                : "btn-outline-warning"
                        }`}
                        onClick={() => setSelectedCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {error && <p className="text-danger text-center">{error}</p>}
            {loading && <p className="text-warning text-center">{loading}</p>}

            {/* Product Card Grid */}
            <div className="row">
                {filteredProducts.map((product) => (
                    <div
                        className="col-md-4 col-lg-3 mb-4"
                        key={product.product_id || product.product_name}
                    >
                        <div className="card h-100 bg-dark text-light border-secondary shadow">
                            <img
                                src={image_url + product.product_photo}
                                alt={product.product_name}
                                className="card-img-top"
                                style={{ height: "200px", objectFit: "cover" }}
                            />
                            <div className="card-body d-flex flex-column justify-content-between">
                                <div>
                                    <div className="d-flex justify-content-between align-items-start">
                                        <h5 className="card-title text-warning">{product.product_name}</h5>
                                        <button
                                            className="btn btn-sm btn-outline-warning border-0"
                                            title="Add to Wishlist"
                                            onClick={() => onAddToWishlist(product)}
                                        >
                                            ♥
                                        </button>
                                    </div>
                                    <p className="card-text text-secondary small">
                                        {product.product_description}
                                    </p>
                                </div>
                                
                                <div className="mt-3">
                                    <p className="text-success fw-bold fs-5 mb-2">
                                        Ksh {product.product_cost}
                                    </p>
                                    <div className="d-flex gap-2">
                                        <button
                                            className="btn btn-outline-warning btn-sm w-50"
                                            onClick={() => onAddToCart(product)}
                                        >
                                            Add to Cart
                                        </button>
                                        <button
                                            className="btn btn-warning btn-sm fw-bold text-dark w-50"
                                            onClick={() => navigate("/mpesa", { state: { product } })}
                                        >
                                            Buy Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GetProduct;