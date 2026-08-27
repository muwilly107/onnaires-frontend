import React from "react";

const Carousel = () => {
    return (
        <div 
            id="onnairesCarousel" 
            className="carousel slide container my-4" 
            data-bs-ride="carousel"
        >
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#onnairesCarousel" data-bs-slide-to="0" className="active"></button>
                <button type="button" data-bs-target="#onnairesCarousel" data-bs-slide-to="1"></button>
                <button type="button" data-bs-target="#onnairesCarousel" data-bs-slide-to="2"></button>
            </div>

            <div className="carousel-inner rounded border border-warning">
                <div className="carousel-item active" style={{ height: "380px", backgroundColor: "#1a0703" }}>
                    <img src="" className="d-block w-100 h-100" style={{ objectFit: "cover" }} alt="Slide 1" />
                    <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-75 rounded p-3">
                        <h3 className="text-warning fw-bold">Special Delicacies</h3>
                        <p>Freshly cooked restaurant meals delivered hot to your doorstep.</p>
                    </div>
                </div>

                <div className="carousel-item" style={{ height: "380px", backgroundColor: "#1a0703" }}>
                    <img src="" className="d-block w-100 h-100" style={{ objectFit: "cover" }} alt="Slide 2" />
                    <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-75 rounded p-3">
                        <h3 className="text-warning fw-bold">Refreshing Beverages</h3>
                        <p>Pair your order with your favorite cold drinks and juices.</p>
                    </div>
                </div>

                <div className="carousel-item" style={{ height: "380px", backgroundColor: "#1a0703" }}>
                    <img src="" className="d-block w-100 h-100" style={{ objectFit: "cover" }} alt="Slide 3" />
                    <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-75 rounded p-3">
                        <h3 className="text-warning fw-bold">Sweet Desserts</h3>
                        <p>Indulge in our selection of cakes, pastries, and sweet treats.</p>
                    </div>
                </div>
            </div>

            <button className="carousel-control-prev" type="button" data-bs-target="#onnairesCarousel" data-bs-slide="prev">
                <span className="carousel-control-prev-icon"></span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#onnairesCarousel" data-bs-slide="next">
                <span className="carousel-control-next-icon"></span>
            </button>
        </div>
    );
};

export default Carousel;