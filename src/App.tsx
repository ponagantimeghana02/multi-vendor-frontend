import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar"
import { ToastContainer, Bounce } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
function App() {

  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              transition={Bounce}/>
      
    </div>
  )
}

export default App;
