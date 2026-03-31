import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Stores from "./Stores";
import { useSelector } from "react-redux";
// import { useGetVendorOrdersMutation } from "../../services/order";

// ✅ TYPES
type UserDetails = {
  id: string;
  token: string;
  role: string;
  products?: number;
};

type RootState = {
  auth: {
    userDetails: UserDetails;
  };
};

export default function VendorDashboard() {
  const [activeStatus, setActiveStatus] = useState<string | null>(null);

  const navigate = useNavigate();

  const statuses = [
    "Pending",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];

  const { userDetails } = useSelector((state: RootState) => state.auth);

  // ✅ FIX: no argument here
  // const [vendorOrderFn] = useGetVendorOrdersMutation();

  return (
    <div className="container-fluid mt-4 px-4">
      <h4 className="mb-4 fw-bold">Vendor Dashboard</h4>

      <div className="mb-4">
        <Link
          to="/createStore"
          className="btn btn-primary me-2"
          onClick={() => navigate("/vendordashboard")}
        >
          Create Store
        </Link>

        <Link
          to="/addProduct"
          className="btn btn-secondary"
          onClick={() => navigate("/vendordashboard")}
        >
          Add Product
        </Link>

        <h4>Product Count: {userDetails.products ?? 0}</h4>
      </div>

      <div className="row g-4">
        {/* LEFT SIDE */}
        <div className="col-lg-4">
          <Stores />
        </div>

        {/* RIGHT SIDE */}
        <div className="col-lg-8">
          <div className="row g-4">
            {statuses.map((status) => (
              <div className="col-md-4 col-sm-6" key={status}>
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