import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../slice/cartSlice"
import serviceModal from "../slice/serviceModalSlice";
import authSlice from "../slice/authSlice";
import categorySlice from "../slice/categorySlice";
// import locationSlice from "./slices/locationSlice";
// import searchSlice from "./slices/searchSlice";

const store = configureStore({
  reducer: {
    cartSlice: cartSlice.reducer,
    serviceModal: serviceModal.reducer,
    authSlice: authSlice.reducer,
    categorySlice : categorySlice.reducer,
    // locationSlice: locationSlice.reducer,
    // searchSlice: searchSlice.reducer,
  },
});

export default store;
