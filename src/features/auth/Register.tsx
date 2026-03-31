import { useFormik } from "formik";
import { useRegisterMutation } from "../../services/auth";
import { toast } from "react-toastify";

function Register() {
  const [registerFn] = useRegisterMutation();
  const userForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      role: "",
    },
    onSubmit: (values) => {
      registerFn(values)
        .then((res) => {
          console.log(res);
          toast.success("Registered Successfully 🎉");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ width: "400px" }}>
        <h1 className="text-center mb-4">Register</h1>
        <form onSubmit={userForm.handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              {...userForm.getFieldProps("name")}
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              {...userForm.getFieldProps("email")}
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              {...userForm.getFieldProps("password")}
              placeholder="Enter your password"
            />
          </div>
          <div className="mb-3">
            <label className="form-label me-3">Role:</label>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                {...userForm.getFieldProps("role")}
                value="buyer"
              />
              <label className="form-check-label">Buyer</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                {...userForm.getFieldProps("role")}
                value="vendor"
              />
              <label className="form-check-label">Vendor</label>
            </div>
          </div>
          <button type="submit" className="btn btn-success w-100">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;