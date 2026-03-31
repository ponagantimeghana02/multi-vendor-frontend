import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartItems.find((x) => x.id === item._id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ ...item, quantity: 1 });
      }
       localStorage.setItem(
        "cartItems",
        JSON.stringify(state.cartItems)
      ); 
    },

    decreaseQuantity: (state, action) => {
      const item = state.cartItems.find((i) => i._id === action.payload);
      if (item.quantity >= 1) {
        item.quantity -= 1;
      }
       localStorage.setItem(
        "cartItems",
        JSON.stringify(state.cartItems)
      );
    },

    increaseQuantity: (state, action) => {
      const item = state.cartItems.find((i) => i._id == action.payload);
      if (item) {
        item.quantity += 1;
      }
       localStorage.setItem(
        "cartItems",
        JSON.stringify(state.cartItems)
      ); 
    },
    
    
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
       localStorage.removeItem("cartItems")
    },
    
  },
  
}
);
export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
