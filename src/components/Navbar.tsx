import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout, updateUser } from "../features/auth/authSlice";
import { useEffect } from "react";

function Navbar() {
  const { userDetails } = useSelector((state:any) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(userDetails);

  useEffect(() => {
    const userInfo = JSON.parse(window.localStorage.getItem("userInfo")!);
    console.log("userinfo", userInfo);
    if (userInfo?.token) {
      dispatch(updateUser(userInfo));
    }
  }, []);

  function handleLogoutFn() {
    dispatch(logout());
    navigate("/login")
  }

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{
        background: "linear-gradient(to right, #141e30, #243b55)",
      }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          MarketPlace
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            {!userDetails?.token && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}

            {userDetails?.token &&
              userDetails?.role?.toLowerCase() == "vendor" && (
                <>
                  {/* <li className="nav-item">
                  <Link className="nav-link active" to="/createStore">
                    Create Store
                  </Link>
                </li> */}
                  <li className="nav-item">
                    <Link className="nav-link active" to="vendordashboard">
                      VendorDashBoard
                    </Link>
                  </li>
                  {/* <Link className="nav-link active" to="/addProduct">
                  add product
                </Link> */}
                </>
              )}

            {userDetails?.token &&
              userDetails?.role?.toLowerCase() == "buyer" && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link active" to="/buyerProducts">
                      BuyerProducts
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active" to="/cart">
                      CartItems
                    </Link>
                  </li>
                </>
              )}
            {userDetails?.token && (
              <li>
                <button
                  className="btn btn-success"
                  onClick={() => {
                    handleLogoutFn();
                    // navigate("/");
                  }}
                >
                  {userDetails.name} Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
