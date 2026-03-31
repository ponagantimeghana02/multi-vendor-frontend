
import { useLoginMutation } from '../../services/auth';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { updateUser } from './authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loginFn] = useLoginMutation()
    

    const loginForm = useFormik({
        initialValues: {
            email: "",
            password: "",
            role: ""
        },
        onSubmit: (values) => {
            loginFn(values).then(res => {
                console.log("res", res.data);
                dispatch(updateUser(res.data))
                localStorage.setItem("userInfo", JSON.stringify(res.data))
                toast.success("Login Successful 🎉")
                if (res.data.role === "buyer") {
                    navigate("/")
                } else {
                    navigate("/vendordashboard")
                }
            }).catch(err => { console.log(err) })
        }
    })

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow p-4" style={{ width: "350px" }}>
                <h1 className="text-center mb-4">Login</h1>
                <form onSubmit={loginForm.handleSubmit}>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            {...loginForm.getFieldProps("email")}
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control"
                            {...loginForm.getFieldProps("password")}
                            placeholder="Enter your password"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login