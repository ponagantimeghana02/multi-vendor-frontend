import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, addToCart, decreaseQuantity } from "./cartSlice";
import { useNavigate } from "react-router";
import { useState } from "react";
import { toast } from "react-toastify";
import { useCreateOrderMutation } from "../../services/order";

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [createOrderFn] = useCreateOrderMutation();
  const { cartItems } = useSelector((state: any) => state.cart);
  const { userDetails } = useSelector((state: any) => state.auth);

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    pincode: "",
  });

  const subtotal = cartItems.reduce(
    (acc: any, item: any) => acc + item.price * item.quantity,
    0,
  );

  const deliveryCharge = subtotal > 0 ? 50 : 0;
  const total = subtotal + deliveryCharge;

  async function handlePlaceOrder(address: any) {
    try {
      await createOrderFn({
        userId: userDetails.id,
        address: address,
      });

      toast.success("Order placed successfully");

    } catch (error) {
      toast.error("Failed to place order");
    }
  }

  return (
    <div className="container mt-4">
      <h3 className="mb-4 fw-bold">Shopping Cart</h3>

      {cartItems.length === 0 ? (
        <div className="text-center mt-5">
          <h5>Your cart is empty 🛒</h5>
          <button
            className="btn btn-dark mt-3"
            onClick={() => navigate("/buyerProducts")}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="row">
          {/* LEFT SIDE - CART ITEMS */}
          <div className="col-lg-8">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="card mb-3 shadow-sm border-0"
                style={{ borderRadius: "12px" }}
              >
                <div className="card-body d-flex align-items-center">
                  {/* Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    width="100"
                    height="100"
                    style={{ objectFit: "cover", borderRadius: "10px" }}
                  />

                  {/* Info */}
                  <div className="ms-4 flex-grow-1">
                    <h6 className="fw-bold">{item.name}</h6>
                    <p className="text-muted mb-1">₹ {item.price}</p>

                    {/* Quantity Controls */}
                    <div className="d-flex align-items-center mt-2">
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => dispatch(decreaseQuantity(item._id))}
                      >
                        -
                      </button>

                      <span className="mx-3">{item.quantity}</span>

                      <button
                        className="btn btn-sm btn-outline-dark"
                        onClick={() => dispatch(addToCart(item))}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Subtotal + Remove */}
                  <div className="text-end">
                    <h6 className="fw-bold">₹ {item.price * item.quantity}</h6>

                    <button
                      className="btn btn-sm btn-link text-danger"
                      onClick={() => dispatch(removeFromCart(item._id))}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT SIDE - ORDER SUMMARY */}
          <div className="col-lg-4">
            <div
              className="card shadow-sm border-0"
              style={{ borderRadius: "12px" }}
            >
              <div className="card-body">
                <h5 className="fw-bold mb-3">Order Summary</h5>

                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal</span>
                  <span>₹ {subtotal}</span>
                </div>

                <div className="d-flex justify-content-between mb-2">
                  <span>Delivery</span>
                  <span>₹ {deliveryCharge}</span>
                </div>

                <hr />

                <div className="d-flex justify-content-between mb-3">
                  <strong>Total</strong>
                  <strong>₹ {total}</strong>
                </div>

                {/* <button
                  className="btn btn-dark w-100"
                  style={{ borderRadius: "8px" }}
                  onClick={() => alert("Proceeding to payment...")}
                >
                  Proceed to Checkout
                </button> */}
                {!address && (
                  <button
                    onClick={() => {
                      setAddress(true);
                    }}
                  >
                    proceed to checkout
                  </button>
                )}
                {address && (
                  <div style={{ marginTop: "20px" }}>
                    <h3>Enter Delivery Address</h3>

                    <input
                      type="text"
                      placeholder="Full Name"
                      value={address.fullName}
                      onChange={(e) =>
                        setAddress({ ...address, fullName: e.target.value })
                      }
                    />
                    <br />

                    <input
                      type="text"
                      placeholder="Mobile Number"
                      value={address.phone}
                      onChange={(e) =>
                        setAddress({ ...address, phone: e.target.value })
                      }
                    />
                    <br />

                    <input
                      type="text"
                      placeholder="Address Line"
                      value={address.street}
                      onChange={(e) =>
                        setAddress({ ...address, street: e.target.value })
                      }
                    />
                    <br />

                    <input
                      type="text"
                      placeholder="City"
                      value={address.city}
                      onChange={(e) =>
                        setAddress({ ...address, city: e.target.value })
                      }
                    />
                    <br />

                    <input
                      type="text"
                      placeholder="Pincode"
                      value={address.pincode}
                      onChange={(e) =>
                        setAddress({ ...address, pincode: e.target.value })
                      }
                    />
                    <br />

                    <button
                      style={{ marginTop: "10px" }}
                      onClick={handlePlaceOrder}
                    >
                      Place Order
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
