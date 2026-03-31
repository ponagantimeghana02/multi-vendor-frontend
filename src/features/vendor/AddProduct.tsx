import { useFormik } from "formik";
import { useSelector } from "react-redux";
import {
  useAddProductMutation,
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "../../services/vendor";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";

// ✅ FORM TYPE (Frontend)
type ProductFormValues = {
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
};

// ✅ API TYPE (Backend response)
// 👉 Add/remove fields based on your backend
type ProductApi = {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  stock?: number; // optional (in case backend doesn't send it)
};

type UserDetails = {
  id: string;
  token: string;
};

type RootState = {
  auth: {
    userDetails: UserDetails;
  };
};

export default function AddProduct() {
  const navigate = useNavigate();

  // ✅ typed params
  const { productId } = useParams<{ productId: string }>();

  const [addProductFn] = useAddProductMutation();
  const [updateFn] = useUpdateProductMutation();

  // ✅ fetch only when editing
  const { data } = useGetProductByIdQuery(productId!, {
    skip: !productId,
  });

  const { userDetails } = useSelector((state: RootState) => state.auth);

  const productForm = useFormik<ProductFormValues>({
    initialValues: {
      name: "",
      description: "",
      price: 0,
      stock: 0,
      image: "",
    },

    onSubmit: async (values) => {
      try {
        if (productId) {
          await updateFn({
            product: values,
            token: userDetails.token,
            productId,
          }).unwrap();
        } else {
          await addProductFn({
            product: values,
            token: userDetails.token,
          }).unwrap();
        }

        navigate(`/vendorProducts/${userDetails.id}`);
      } catch (err) {
        console.log("error is", err);
      }
    },
  });

  // ✅ safely map API → form
  useEffect(() => {
    if (data) {
      const product = data as ProductApi;

      productForm.setValues({
        name: product.name || "",
        description: product.description || "",
        price: product.price || 0,
        stock: product.stock || 0, // ✅ safe
        image: product.image || "",
      });
    }
  }, [data]);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ width: "500px" }}>
        <h3 className="text-center mb-4">
          {productId ? "Edit Product" : "Add Product"}
        </h3>

        <form onSubmit={productForm.handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              {...productForm.getFieldProps("name")}
              placeholder="Enter product name"
            />
          </div>

          <div className="mb-3">
            <textarea
              className="form-control"
              {...productForm.getFieldProps("description")}
              placeholder="Enter description"
              rows={3}
            />
          </div>

          <div className="mb-3">
            <input
              type="number"
              className="form-control"
              {...productForm.getFieldProps("price")}
              placeholder="Enter price"
            />
          </div>

          <div className="mb-3">
            <input
              type="number"
              className="form-control"
              {...productForm.getFieldProps("stock")}
              placeholder="Enter stock"
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              {...productForm.getFieldProps("image")}
              placeholder="Enter image URL"
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            {productId ? "Update Product" : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
}