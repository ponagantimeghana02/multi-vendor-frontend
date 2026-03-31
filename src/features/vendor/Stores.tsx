import { Link } from "react-router-dom";
import { useGetStoresQuery } from "../../services/vendor";
import { useSelector } from "react-redux";

export default function Stores() {
  const { userDetails } = useSelector((state) => state.auth);
  let { isLoading, data } = useGetStoresQuery(userDetails.id);
  // let{isLoading,data}=useGetStoreByIdQuery()
  console.log("ud", userDetails);
  console.log("store", data);
  return (
    <div>
      <h4>Stores</h4>
      {isLoading && <h3>loading....</h3>}
      {!isLoading && (
        <div className="d-flex">
          {data
            ?.filter((store) => {
              if (userDetails.role == "vendor") {
                return store.vendor._id == userDetails.id;
              } else {
                return true;
              }
            })
            .map((items) => {
              return (
                <div
                  className="card m-3"
                  key={items._id}
                  style={{ width: "18rem" }}
                >
                  <div className="card-body">
                    <h5 className="card-title">{items.name}</h5>
                    <p className="card-text">{items.description}</p>
                    <h4>vendor:{items.vendor.name}</h4>
                    {
                      <Link
                        to={`/vendorProducts/${items.vendor._id}`}
                        className="btn btn-primary"
                      >
                        Vendor products
                      </Link>
                    }
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}
