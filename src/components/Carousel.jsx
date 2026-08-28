import React, { useEffect, useRef } from "react";
import { Carousel as BSCarousel } from "bootstrap";

const Carousel = () => {
    const carouselRef = useRef(null);

    useEffect(() => {
        if (carouselRef.current) {
            const carouselInstance = new BSCarousel(carouselRef.current, {
                interval: 3500,
                ride: "carousel",
                pause: "hover",
                wrap: true
            });

            return () => {
                carouselInstance.dispose();
            };
        }
    }, []);

    return (
        <div 
            ref={carouselRef}
            id="onnairesCarousel" 
            className="carousel slide carousel-fade container my-4" 
            data-bs-ride="carousel"
        >
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#onnairesCarousel" data-bs-slide-to="0" className="active"></button>
                <button type="button" data-bs-target="#onnairesCarousel" data-bs-slide-to="1"></button>
                <button type="button" data-bs-target="#onnairesCarousel" data-bs-slide-to="2"></button>
            </div>

            <div className="carousel-inner rounded border border-warning">
                {/* Slide 1: Restaurant / Visit Us */}
                <div className="carousel-item active" style={{ height: "380px", backgroundColor: "#1a0703" }}>
                    <img src="/images/restaurant.png" className="d-block w-100 h-100" style={{ objectFit: "cover" }} alt="Our Restaurant" />
                    <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-75 rounded p-3">
                        <h3 className="text-warning fw-bold">Visit Our Dining Hub</h3>
                        <p>Experience the vibe in person! Find us at Klabu Avenue 6 for rich flavors & great company.</p>
                    </div>
                </div>

                {/* Slide 2: Delivery */}
                <div className="carousel-item" style={{ height: "380px", backgroundColor: "#1a0703" }}>
                    <img src="/images/delivery.png" className="d-block w-100 h-100" style={{ objectFit: "cover" }} alt="Fast Delivery" />
                    <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-75 rounded p-3">
                        <h3 className="text-warning fw-bold">Lightning-Fast Deliveries</h3>
                        <p>Craving on the go? We dispatch piping hot meals to your doorstep in minutes!</p>
                    </div>
                </div>

                {/* Slide 3: Chefs / Bakery */}
                <div className="carousel-item" style={{ height: "380px", backgroundColor: "#1a0703" }}>
                    <img src="/images/chefs.png" className="d-block w-100 h-100" style={{ objectFit: "cover" }} alt="Crafted by Experts" />
                    <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-75 rounded p-3">
                        <h3 className="text-warning fw-bold">Artisanal Bakery & Brews</h3>
                        <p>Handcrafted pastries, fresh oven bakes, and rich espresso prepared by our master culinary team.</p>
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