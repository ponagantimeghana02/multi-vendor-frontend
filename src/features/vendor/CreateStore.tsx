import { useFormik } from "formik";
import { useAddStoreMutation } from "../../services/vendor";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function CreateStore() {
  const { userDetails } = useSelector((state) => state.auth);
 const [addStoreFn] =useAddStoreMutation()
  const storeForm = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    onSubmit: (values) => {
      addStoreFn({"store":values,"token":userDetails.token}).then(res=>console.log(res)
      )
      toast.success("store created succesfully")
      .catch(err=>console.log("error is",err)
      )
    },
  });

  return (
    <div className="Px-5">
      <h3>Create store</h3>
      <form onSubmit={storeForm.handleSubmit}>
        <input
          type="text"
          {...storeForm.getFieldProps("name")}
          placeholder="enter store name"
        />
        <input
          type="text"
          {...storeForm.getFieldProps("description")}
          placeholder="enter description"
        />
        <br />
        <button>Add Store</button>
      </form>
    </div>
  );
}
