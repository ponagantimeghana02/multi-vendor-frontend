import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Stores from "./Stores";
import { useSelector } from "react-redux";
import { useGetVendorOrdersMutation } from "../../services/order";

export default function VendorDashboard() {
  const [activeStatus, setActiveStatus] = useState(null);
 const navigate= useNavigate()

  const statuses = [
    "Pending",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled"
  ];
 const {userDetails}=useSelector(state=>state.auth)
 const [vendorOrderFn]=useGetVendorOrdersMutation(userDetails.token)
 console.log(userDetails);
 

  return (
    <div className="container-fluid mt-4 px-4">

      <h4 className="mb-4 fw-bold">Vendor Dashboard</h4>

      <div className="mb-4">
        <Link to="/createStore" className="btn btn-primary me-2" onClick={()=>navigate("/vendordashboard")}>
          Create Store
        </Link>
        <Link to="/addProduct" className="btn btn-secondary" onClick={()=>navigate("/vendordashboard")}>
          Add Product 
        </Link>
        <h4>productCount:{userDetails.products}</h4>
      </div>

      <div className="row g-4">

        {/* LEFT SIDE - STORE */}
        <div className="col-lg-4">
          <Stores />
        </div>

        {/* RIGHT SIDE - STATUS CARDS */}
        <div className="col-lg-8">
          <div className="row g-4">

            {statuses.map((status, index) => (
              <div className="col-md-4 col-sm-6" key={index}>
                <div
                  onClick={() => setActiveStatus(status)}
                  style={{
                    cursor: "pointer",
                    borderRadius: "12px",
                    padding: "25px",
                    textAlign: "center",
                    backgroundColor:
                      activeStatus === status ? "#e9ecef" : "#f8f9fa",
                    boxShadow:
                      activeStatus === status
                        ? "0 8px 20px rgba(0,0,0,0.18)"
                        : "0 4px 10px rgba(0,0,0,0.08)",
                    transform:
                      activeStatus === status ? "scale(1.03)" : "scale(1)",
                    transition: "all 0.3s ease",
                    borderLeft:
                      activeStatus === status
                        ? "4px solid #6c757d"
                        : "4px solid transparent",
                  }}
                >
                  <h6 style={{ color: "#6c757d" }}>{status}</h6>
                  <h2 style={{ fontWeight: "bold", marginTop: "10px" }}>
                    0
                  </h2>
                </div>
              </div>
            ))}

          </div>
        </div>

      </div>
    </div>
  );
}