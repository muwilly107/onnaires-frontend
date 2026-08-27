import React from "react";
import { useNavigate } from "react-router-dom";

const Wishlist = ({ wishlistItems = [], onRemove, onAddToCart }) => {
    const navigate = useNavigate();
    const image_url = "https://william123.alwaysdata.net/static/images/";

    return (
        <div className="container my-5" style={{ minHeight: "60vh" }}>
            <h2 className="text-warning mb-4 text-center fw-bold">Your Saved Wishlist</h2>

            {wishlistItems.length === 0 ? (
                <div className="text-center my-5">
                    <p className="text-secondary fs-5">No items saved to your wishlist yet.</p>
                    <button className="btn btn-warning fw-bold" onClick={() => navigate("/")}>
                        Explore Menu
                    </button>
                </div>
            ) : (
                <div className="row">
                    {wishlistItems.map((product) => (
                        <div 
                            className="col-md-4 col-lg-3 mb-4" 
                            key={product.product_id || product.id}
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
                                        <h5 className="card-title text-warning">{product.product_name}</h5>
                                        <p className="text-success fw-bold">Ksh {product.product_cost}</p>
                                    </div>
                                    <div className="d-flex flex-column gap-2 mt-3">
                                        <button
                                            className="btn btn-warning btn-sm fw-bold text-dark w-100"
                                            onClick={() => onAddToCart(product)}
                                        >
                                            Add to Cart
                                        </button>
                                        <button
                                            className="btn btn-outline-danger btn-sm w-100"
                                            onClick={() => onRemove(product.product_id || product.id)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Wishlist;