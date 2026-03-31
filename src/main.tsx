import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import Login from "./features/auth/Login.tsx";
import Register from "./features/auth/Register.tsx";
import CreateStore from "./features/vendor/CreateStore.tsx"
import { Provider } from 'react-redux';
import store from './app/store.ts'
import Home from "./components/Home.tsx";
import AddProduct from "./features/vendor/AddProduct.tsx";
import VendorProducts from "./features/vendor/VendorProducts.tsx";
import BuyerProducts from "./features/buyer/BuyerProducts.tsx";
import Cart from "./features/cart/Cart.tsx";
import VendorDashboard from "./features/vendor/VendorDashboard.tsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children:[
      {
        path:"/",
        element:<Home></Home>
      },
      {
        path:"/login",
        element:<Login></Login>
      },
      {
        path:"/register",
        element:<Register></Register>
      },
       {
        path:"/createStore",
        element:<CreateStore></CreateStore>
      },
       {
        path:"/addProduct",
        element:<AddProduct></AddProduct>
      },
      {
        path:"/vendorProducts/:id",
        element:<VendorProducts></VendorProducts>
      },
      {
        path: "/vendordashboard",
        element: <VendorDashboard />
      },
     {
        path:"/editProducts/:productId",
        element:<AddProduct/>
      },
      {
        path:"/buyerProducts",
        element:<BuyerProducts></BuyerProducts>
            }
            ,
            {
              path:"/cart",
              element:<Cart></Cart>
            }
      
    ]
  },
]);
createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
)
