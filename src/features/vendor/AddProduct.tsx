import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { useAddProductMutation, useGetProductByIdQuery, useUpdateProductMutation } from "../../services/vendor";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";

export default function AddProduct() {
  const navigate = useNavigate();
  const [addProductFn] = useAddProductMutation();
  const { productId } = useParams();
  const { isLoading, data } = useGetProductByIdQuery(productId);
  const [updateFn] = useUpdateProductMutation(productId);
  const { userDetails } = useSelector((state) => state.auth);

  const productForm = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: "",
      stock: "",
      image: "",
    },
    onSubmit: (values) => {
      console.log(values);
      const Fn = productId ? updateFn : addProductFn;
      Fn({ product: values, token: userDetails.token, productId: productId })
        .then((res) => {
          console.log(res);
          navigate(`/vendorProducts/${userDetails.id}`);
        })
        .catch((err) => console.log("error is", err));
    },
  });

  useEffect(() => {
    if (data) {
      productForm.setValues({ ...data });
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
              placeholder="Enter description of the product"
              rows="3"
            />
          </div>
          <div className="mb-3">
            <input
              type="number"
              className="form-control"
              {...productForm.getFieldProps("price")}
              placeholder="Enter price of product"
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