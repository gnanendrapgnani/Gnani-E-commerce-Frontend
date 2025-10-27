import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import adminProducts from "./admin/product-slice/index";
import shopProductSlice from "./shop/product-slice/index";
import shopCartSlice from "./shop/cart/index"
import shopAddressSlice from "./shop/address-slice/index"

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProducts,
    shopProducts: shopProductSlice,
    shopCart : shopCartSlice,
    shopAddress: shopAddressSlice
  },
});

export default store;
