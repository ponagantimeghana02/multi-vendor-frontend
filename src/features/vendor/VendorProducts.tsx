import { useNavigate, useParams } from "react-router";
import {
  useDeleteProductMutation,
  useGetvendorProductsQuery,
  useLazyGetvendorProductsQuery,
} from "../../services/vendor";
import {  useSelector } from "react-redux";
import { useEffect } from "react";

export default function VendorProducts() {
  const { userDetails } = useSelector((state: any) => state.auth);
  // const {cartItems}=useSelector(state=>state.cart)
  // const { id } = useParams();
  const navigate = useNavigate();
  // const dispatch=useDispatch()
  const { isLoading, data } = useGetvendorProductsQuery(userDetails?.id);
  const [deletemutationFn] = useDeleteProductMutation();
  const [getProductFn] = useLazyGetvendorProductsQuery();
  // const [addtoCartFn]=useAddToCartMutation()
  console.log(data);

  async function deleteFn(id: any) {
    try {
      await deletemutationFn({ productId: id, token: userDetails.token });
    } catch (err) {
      console.log("error ocuured", err);
    }
  }

//   useEffect(()=>{
// addtoCartFn({cartItems,token:userDetails.token,userId:userDetails.userId}).then(res=>console.log(res))

//   },[cartItems])

  useEffect(() => {
    getProductFn(userDetails.id);
  }, []);

  return (
    <div>
      <h4>Vendor products</h4>
      {isLoading && <h3>loading....</h3>}
      {!isLoading && (
        <div className="d-flex">
          <button
            onClick={() => {
              navigate("/AddProduct");
            }}
            style={{ width: "18rem", height: "auto" }}
          >
            +
          </button>
          {data?.map((product) => {
            return (
              // <div>
              //   <div className="card-body">
              //     <h3>

              //     </h3>
              //   </div>
              <div className="card m-3" style={{ width: "18rem" }}>
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.description}</p>
                  <h4>vendor:{product.vendor.name}</h4>
                  <img src={product.image} className="w-100 m-2" alt="image" />
                  &nbsp;&nbsp;
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      deleteFn(product._id).then(() =>
                        getProductFn(product.vendor._id),
                      );
                    }}
                  >
                    delete
                  </button>
                  &nbsp;&nbsp;
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      navigate(`/editProducts/${product?._id}`);
                    }}
                  >
                    edit
                  </button>

                  {/* <button onClick={()=>{dispatch(addToCart({...product}))}}>
                    add to cart
                  </button> */}
                </div>
              </div>
              // </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
