import { useNavigate } from "react-router";
import { useGetProductsQuery } from "../../services/vendor";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../cart/cartSlice";
import { useUpdateCartMutation } from "../../services/order";

export default function BuyerProducts() {
  const navigate = useNavigate();

  const {userDetails}=useSelector(state=>state.auth)
  const {cartItems}=useSelector(state=>state.cart)
  const dispatch = useDispatch();
  const { isLoading, data } = useGetProductsQuery();
 const [updateFn]= useUpdateCartMutation()

 

  function addToCartFn(product) {
  
    if(userDetails?.token){
      dispatch(addToCart(product));
      updateFn({cartItems,token:userDetails.token,userId:userDetails.id})
      localStorage.setItem("cartitems",product)
      toast.success("Added to cart");
  }
  else{
    navigate("/login")
  }}

  return (
    <div className="container mt-4">

      <h3 className="mb-4 fw-bold">Explore Products</h3>

      {isLoading && <h4>Loading products...</h4>}

      {!isLoading && (
        <div className="row g-4">
          {data?.map((product) => (
            <div className="col-md-4 col-lg-3" key={product._id}>
              <div
                className="card h-100 shadow-sm border-0"
                style={{
                  borderRadius: "14px",
                  transition: "0.3s",
                  cursor: "pointer"
                }}
              >
                {/* Product Image */}
                <div
                  style={{
                    height: "200px",
                    overflow: "hidden",
                    borderTopLeftRadius: "14px",
                    borderTopRightRadius: "14px",
                    backgroundColor: "#f8f9fa"
                  }}
                >
                  <img
                    src={product.image}
                    alt="product"
                    className="w-100 h-100"
                    style={{ objectFit: "cover" }}
                  />
                </div>

                {/* Product Info */}
                <div className="card-body d-flex flex-column">

                  <h6 className="fw-bold mb-2">
                    {product.name}
                  </h6>

                  <p
                    className="text-muted small flex-grow-1"
                    style={{ minHeight: "40px" }}
                  >
                    {product.description}
                  </p>

                  <div className="d-flex justify-content-between align-items-center mt-2">
                    <span className="fw-semibold text-dark">
                      ₹{product.price}
                    </span>

                    <span
                      className="badge bg-light text-dark"
                      style={{ fontSize: "0.7rem" }}
                    >
                      {product?.vendor?.name}
                    </span>
                  </div>

                  <button
                    className="btn btn-dark btn-sm mt-3 w-100"
                    style={{ borderRadius: "8px" }}
                    onClick={() => addToCartFn(product)}
                  >
                    Add to Cart
                  </button>

                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}