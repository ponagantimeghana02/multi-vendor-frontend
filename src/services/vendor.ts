import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type Store = {
  _id: string;
  name: string;
  description?: string;
  vendor: Vendor;
};

type Vendor = {
  _id: string;
  name: string;
};

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  vendor: Vendor;
};

export const vendorApi = createApi({
  reducerPath: "vendorApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://multi-vendor-backend-373h.onrender.com/api",
  }),

  endpoints: (builder) => ({
    // ✅ ADD STORE
    addStore: builder.mutation<Store, { store: Partial<Store>; token: string }>(
      {
        query: ({ store, token }) => ({
          url: `/stores`,
          method: "POST",
          headers: {
            "x-auth-token": token,
          },
          body: store,
        }),
      },
    ),

    // ✅ GET STORES
    getStores: builder.query<Store[], void>({
      query: () => "/stores",
    }),

    // ✅ GET STORE BY ID
    getStoreById: builder.query<Store, string>({
      query: (id) => `/stores/${id}`,
    }),

    // ✅ GET PRODUCT BY ID
    getProductById: builder.query<Product, string>({
      query: (id) => `/products/${id}`,
    }),

    // ✅ GET ALL PRODUCTS
    getProducts: builder.query<Product[], void>({
      query: () => "/products",
    }),

    // ✅ GET VENDOR PRODUCTS
    getvendorProducts: builder.query<Product[], string>({
      query: (vendorId) => `/products/vendorProducts/${vendorId}`,
    }),

    // ✅ ADD PRODUCT
    addProduct: builder.mutation<
      Product,
      { product: Partial<Product>; token: string }
    >({
      query: ({ product, token }) => ({
        url: `/products`,
        method: "POST",
        headers: {
          "x-auth-token": token,
        },
        body: product,
      }),
    }),

    // ✅ DELETE PRODUCT
    deleteProduct: builder.mutation<
      { success: boolean },
      { token: string; productId: string }
    >({
      query: ({ token, productId }) => ({
        url: `/products/${productId}`,
        method: "DELETE",
        headers: {
          "x-auth-token": token,
        },
      }),
    }),

    // ✅ UPDATE PRODUCT
    updateProduct: builder.mutation<
      Product,
      { product: Partial<Product>; token: string; productId: string }
    >({
      query: ({ product, token, productId }) => ({
        url: `/products/${productId}`,
        method: "PUT",
        headers: {
          "x-auth-token": token,
        },
        body: product,
      }),
    }),
  }),
});

export const {
  useAddStoreMutation,
  useAddProductMutation,
  useGetStoresQuery,
  useLazyGetStoreByIdQuery,
  useLazyGetStoresQuery,
  useGetvendorProductsQuery,
  useDeleteProductMutation,
  useLazyGetvendorProductsQuery,
  useGetStoreByIdQuery,
  useGetProductsQuery,
  useUpdateProductMutation,
  useGetProductByIdQuery,
} = vendorApi;
