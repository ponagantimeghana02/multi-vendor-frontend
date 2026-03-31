// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://multi-vendor-backend-373h.onrender.com/api/",
  }),
  endpoints: (builder) => ({
    updateCart: builder.mutation({
      query: ({ cartItems, token, userId }) => ({
        url: "/orders/addToCart",
        method: "POST",
        headers: {
          "x-auth-token": token,
        },
        body: { userId, cartItems },
      }),
    }),

    createOrder: builder.mutation({
      query: ({ userId, address }) => ({
        url: `/orders/`,
        method: "POST",
        headers: {
          "x-auth-token": JSON.parse(localStorage.getItem("userInfo")!).token,
        },
        body: { userId, address },
      }),
    }),

    getVendorOrders: builder.mutation({
      query: (token) => ({
        url: `/orders/getVendorOrders`,
        method: "POST",
        headers: {
          "x-auth-token": token,
        },
      }),
    }),
  }),
});

export const { useUpdateCartMutation, useCreateOrderMutation,useGetVendorOrdersMutation } = orderApi;
