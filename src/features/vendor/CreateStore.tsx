import { useFormik } from "formik";
import { useAddStoreMutation } from "../../services/vendor";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

// ✅ TYPES
type StoreFormValues = {
  name: string;
  description: string;
};

type UserDetails = {
  token: string;
};

type RootState = {
  auth: {
    userDetails: UserDetails;
  };
};

export default function CreateStore() {
  const { userDetails } = useSelector((state: RootState) => state.auth);

  const [addStoreFn] = useAddStoreMutation();

  const storeForm = useFormik<StoreFormValues>({
    initialValues: {
      name: "",
      description: "",
    },

    onSubmit: async (values) => {
      try {
        await addStoreFn({
          store: values,
          token: userDetails.token,
        }).unwrap(); // ✅ proper error handling

        toast.success("Store created successfully");
      } catch (err) {
        console.log("error is", err);
        toast.error("Failed to create store");
      }
    },
  });

  return (
    <div className="px-5">
      <h3>Create Store</h3>

      <form onSubmit={storeForm.handleSubmit}>
        <input
          type="text"
          {...storeForm.getFieldProps("name")}
          placeholder="Enter store name"
        />

        <input
          type="text"
          {...storeForm.getFieldProps("description")}
          placeholder="Enter description"
        />

        <br />

        <button type="submit">Add Store</button>
      </form>
    </div>
  );
}