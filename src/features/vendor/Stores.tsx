import { Link } from "react-router-dom";
import { useGetStoresQuery } from "../../services/vendor";
import { useSelector } from "react-redux";

// ✅ TYPES (only for Redux state)
type UserDetails = {
  id: string;
  role: string;
};

type RootState = {
  auth: {
    userDetails: UserDetails;
  };
};

export default function Stores() {
  const { userDetails } = useSelector((state: RootState) => state.auth);

  // ✅ RTK Query (no args)
  const { isLoading, data } = useGetStoresQuery();

  return (
    <div>
      <h4>Stores</h4>

      {isLoading && <h3>Loading...</h3>}

      {!isLoading && (
        <div className="d-flex">
          {data
            ?.filter((store) => {
              // ✅ role-based filtering
              if (userDetails.role === "vendor") {
                return store.vendor._id === userDetails.id;
              }
              return true;
            })
            .map((items) => (
              <div
                className="card m-3"
                key={items._id}
                style={{ width: "18rem" }}
              >
                <div className="card-body">
                  <h5 className="card-title">{items.name}</h5>

                  <p className="card-text">{items.description}</p>

                  <h6>Vendor: {items.vendor.name}</h6>

                  <Link
                    to={`/vendorProducts/${items.vendor._id}`}
                    className="btn btn-primary"
                  >
                    Vendor Products
                  </Link>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}