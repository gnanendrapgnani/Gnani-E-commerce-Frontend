import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import adminProducts from "./admin/product-slice/index";
import ShopProductSlice from "./shop/product-slice/index";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProducts,
    shopProducts: ShopProductSlice,
  },
});

export default store;
