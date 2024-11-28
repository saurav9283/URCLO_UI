import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  total: 0,
};

const cartSlice = createSlice({
  initialState: initialState,
  name: "cartSlice",
  reducers: {
    addToCart: (state, action) => {
      if (state.cartItems.find((cart) => cart?.id === action.payload?.id)) {
        return;
      } else {
        state.cartItems = [...state.cartItems, action.payload];
        state.total = state.cartItems.reduce(
          (acc, cart) => acc + Number(cart.price),
          0
        );
      }
      return state;
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (cart) => cart?.id !== action.payload
      );
      state.total = state.cartItems.reduce((acc, cart) => acc + Number(cart.price), 0);
      return state;
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice;
