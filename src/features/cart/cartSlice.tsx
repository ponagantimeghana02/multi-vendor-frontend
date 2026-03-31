import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// ✅ TYPES
export type CartItem = {
  _id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type CartState = {
  cartItems: CartItem[];
};

// ✅ SAFE localStorage parser
const loadCartItems = (): CartItem[] => {
  try {
    const data = localStorage.getItem("cartItems");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const initialState: CartState = {
  cartItems: loadCartItems(),
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // ✅ ADD TO CART
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const item = action.payload;

      const existingItem = state.cartItems.find(
        (x) => x._id === item._id, // ✅ FIXED
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ ...item, quantity: 1 });
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    // ✅ DECREASE QUANTITY
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.cartItems.find((i) => i._id === action.payload);

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    // ✅ INCREASE QUANTITY
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.cartItems.find((i) => i._id === action.payload);

      if (item) {
        item.quantity += 1;
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    // ✅ REMOVE FROM CART
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
});

// ✅ EXPORTS
export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
