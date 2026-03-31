import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, addToCart, decreaseQuantity } from "./cartSlice";
import { useNavigate } from "react-router";
import { useState } from "react";
import { toast } from "react-toastify";
import { useCreateOrderMutation } from "../../services/order";

// ✅ TYPES
type CartItem = {
  _id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type UserDetails = {
  id: string;
  token: string;
};

type RootState = {
  cart: {
    cartItems: CartItem[];
  };
  auth: {
    userDetails: UserDetails;
  };
};

type Address = {
  fullName: string;
  phone: string;
  street: string;
  city: string;
  pincode: string;
};

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [createOrderFn] = useCreateOrderMutation();

  const { cartItems } = useSelector((state: RootState) => state.cart);
  const { userDetails } = useSelector((state: RootState) => state.auth);

  // ✅ FIX: separate state for form visibility
  const [showAddressForm, setShowAddressForm] = useState<boolean>(false);

  const [address, setAddress] = useState<Address>({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    pincode: "",
  });

  // ✅ FIX: proper typing
  const subtotal = cartItems.reduce(
    (acc: number, item: CartItem) => acc + item.price * item.quantity,
    0
  );

  const deliveryCharge = subtotal > 0 ? 50 : 0;
  const total = subtotal + deliveryCharge;

  async function handlePlaceOrder() {
    try {
      await createOrderFn({
        userId: userDetails.id,
        address: address,
      }).unwrap(); // ✅ better error handling

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
          {/* LEFT SIDE */}
          <div className="col-lg-8">
            {cartItems.map((item: CartItem) => (
              <div
                key={item._id}
                className="card mb-3 shadow-sm border-0"
                style={{ borderRadius: "12px" }}
              >
                <div className="card-body d-flex align-items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    width="100"
                    height="100"
                    style={{ objectFit: "cover", borderRadius: "10px" }}
                  />

                  <div className="ms-4 flex-grow-1">
                    <h6 className="fw-bold">{item.name}</h6>
                    <p className="text-muted mb-1">₹ {item.price}</p>

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

                  <div className="text-end">
                    <h6 className="fw-bold">
                      ₹ {item.price * item.quantity}
                    </h6>

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

          {/* RIGHT SIDE */}
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

                {/* ✅ FIXED LOGIC */}
                {!showAddressForm && (
                  <button
                    className="btn btn-dark w-100"
                    onClick={() => setShowAddressForm(true)}
                  >
                    Proceed to Checkout
                  </button>
                )}

                {showAddressForm && (
                  <div style={{ marginTop: "20px" }}>
                    <h5>Enter Delivery Address</h5>

                    <input
                      type="text"
                      placeholder="Full Name"
                      value={address.fullName}
                      onChange={(e) =>
                        setAddress({ ...address, fullName: e.target.value })
                      }
                    />

                    <input
                      type="text"
                      placeholder="Mobile Number"
                      value={address.phone}
                      onChange={(e) =>
                        setAddress({ ...address, phone: e.target.value })
                      }
                    />

                    <input
                      type="text"
                      placeholder="Address Line"
                      value={address.street}
                      onChange={(e) =>
                        setAddress({ ...address, street: e.target.value })
                      }
                    />

                    <input
                      type="text"
                      placeholder="City"
                      value={address.city}
                      onChange={(e) =>
                        setAddress({ ...address, city: e.target.value })
                      }
                    />

                    <input
                      type="text"
                      placeholder="Pincode"
                      value={address.pincode}
                      onChange={(e) =>
                        setAddress({ ...address, pincode: e.target.value })
                      }
                    />

                    <button
                      className="btn btn-success mt-3 w-100"
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