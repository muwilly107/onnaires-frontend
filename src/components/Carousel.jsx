import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const GetProduct = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios
            .get("http://127.0.0.1:5000/api/getproducts")
            .then((res) => setProducts(res.data))
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className="container my-4">
            <h3 className="mb-4 text-center">Featured Products</h3>
            <div className="row">
                {products.map((product) => (
                    <div className="col-md-4 mb-4" key={product.product_id}>
                        <div className="card h-100 shadow-sm">
                            <img
                                src={`http://127.0.0.1:5000/static/images/${product.product_photo}`}
                                className="card-img-top"
                                alt={product.product_name}
                                style={{ height: "200px", objectFit: "cover" }}
                            />
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{product.product_name}</h5>
                                <p className="card-text text-muted">{product.product_description}</p>
                                <h6 className="mt-auto text-primary">KES {product.product_cost}</h6>
                                <div className="d-flex gap-2 mt-2">
                                    <button className="btn btn-sm btn-outline-secondary w-50">♥ Wishlist</button>
                                    <Link to="/mpesa" className="btn btn-sm btn-success w-50">Buy Now</Link>
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