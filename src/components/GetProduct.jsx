import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const GetProduct = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState("");
    const [error, setError] = useState("");

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const navigate = useNavigate();

    const image_url = "http://127.0.0.1:5000/static/images/";

    const getproducts = async () => {
        setLoading("hold on as we get your products...");
        try {
            const response = await axios.get(
                "http://127.0.0.1:5000/api/getproducts"
            );
            // update our hook with the data from the database (response)
            setProducts(response.data);
            setLoading("");
        } catch (error) {
            setLoading("");
            setError("something went wrong...please try again");
        }
    };

    // call the function
    useEffect(() => {
        getproducts();
    }, []);

    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.product_name
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase());
        const matchesCategory =
            selectedCategory === "All" ||
            product.product_category?.toLowerCase() === selectedCategory.toLowerCase();
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="row container-fluid">
            <h1 className="text-warning display-4 text-center my-3">
                Onnaires Restaurant Menu
            </h1>

            {/* Search Input */}
            <div className="row mb-4">
                <div className="col-md-6 mx-auto">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search food, drinks, or desserts..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Filter Buttons */}
            <div className="d-flex justify-content-center gap-2 mb-4">
                {["All", "Food", "Drinks", "Desserts"].map((category) => (
                    <button
                        key={category}
                        className={`btn ${selectedCategory === category
                                ? "btn-warning"
                                : "btn-outline-warning"
                            }`}
                        onClick={() => setSelectedCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {error} {loading}

            {filteredProducts.map((product) => (
                <div
                    className="col-md-3 justify-content-center mb-4"
                    key={product.product_id || product.product_name}
                >
                    <div className="card shadow card-margin">
                        <img
                            src={image_url + product.product_photo}
                            alt="Image"
                            className="product-img"
                        />
                        <div className="card-body">
                            <h5 className="mt-2">{product.product_name}</h5>
                            <p className="text-muted">{product.product_description}</p>
                            <p className="text-success fw-bold">
                                Ksh {product.product_cost}
                            </p>
                            <button
                                className="btn btn-warning mt-2 w-100"
                                onClick={() =>
                                    navigate("/mpesa", { state: { product } })
                                }
                            >
                                Purchase
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default GetProduct;