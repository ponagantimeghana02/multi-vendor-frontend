import React from "react";
import { useNavigate } from "react-router";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const categories = [
    "Electronics",
    "Fashion",
    "Home & Kitchen",
    "Beauty",
    "Sports",
    "Toys"
  ];

  
  return (
    <div className="container-fluid p-0">

      <div
        className="text-white text-center d-flex align-items-center justify-content-center"
        style={{
          height: "60vh",
          background:
            "linear-gradient(to right, #1e3c72, #2a5298)",
        }}
      >
        <div>
          <h1 className="display-4 fw-bold">
            Discover Amazing Products
          </h1>
          <p className="lead">
            Shop from multiple vendors at the best prices
          </p>
          <button
            className="btn btn-light btn-lg mt-3"
            onClick={() => navigate("/buyerProducts")}
          >
            Shop Now
          </button>
        </div>
      </div>

      {/* 🛍 CATEGORIES SECTION */}
      <div className="container mt-5">
        <h3 className="mb-4 fw-bold">Shop by Category</h3>
        <div className="row g-4">
          {categories.map((cat, index) => (
            <div className="col-md-4 col-sm-6" key={index}>
              <div
                className="card shadow-sm h-100 text-center"
                style={{
                  cursor: "pointer",
                  borderRadius: "12px",
                  transition: "0.3s"
                }}
                onClick={() => navigate("/buyerProducts")}
              >
                <div className="card-body">
                  <h5 className="fw-semibold">{cat}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      

    </div>
  );
};

export default Home;