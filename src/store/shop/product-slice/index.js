import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
};

export const fetchAllFilterdProdut = createAsyncThunk(
  "/products/fetchAllProducts",
  async ({filterParams, sortParams}) => {
    console.log("API",filterParams, sortParams)
    const query = new URLSearchParams({
      ...filterParams,
      sortBy: sortParams
    })
    const res = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/admin/products/get?${query}`
    );

    return res?.data;
  }
);

const shopProductSlice = createSlice({
  name: "ShoppingProducts",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFilterdProdut.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchAllFilterdProdut.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(fetchAllFilterdProdut.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
      });
  },
});

export default shopProductSlice.reducer;
