import React from "react";

const Wishlist = ({ wishlistItems = [], onRemove, onBuy }) => {
    const image_url = "https://william123.alwaysdata.net/static/images/";

    return (
        <div className="container mt-4">
            <h2 className="text-success mb-4">Your Saved Wishlist</h2>

            {wishlistItems.length === 0 ? (
                <p className="text-light">No items saved to your wishlist yet.</p>
            ) : (
                <div className="row">
                    {wishlistItems.map((product) => (
                        <div className="col-md-3 mb-4" key={product.id || product.product_id}>
                            <div className="card shadow card-margin">
                                <img
                                    src={image_url + product.product_photo}
                                    alt={product.product_name}
                                    className="product-img"
                                />
                                <div className="card-body">
                                    <h5 className="mt-2">{product.product_name}</h5>
                                    <p className="text-warning">KES {product.product_cost}</p>
                                    <div className="d-flex gap-2">
                                        <button
                                            className="btn btn-success btn-sm w-100"
                                            onClick={() => onBuy(product)}
                                        >
                                            Buy
                                        </button>
                                        <button
                                            className="btn btn-outline-danger btn-sm w-100"
                                            onClick={() => onRemove(product.id || product.product_id)}
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