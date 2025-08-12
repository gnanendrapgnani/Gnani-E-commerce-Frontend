import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import adminProducts from "./admin/product-slice/index";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProducts,
  },
});

export default store;
