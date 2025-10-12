import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
  productDetails: null
};

export const fetchAllFilterdProdut = createAsyncThunk(
  "/products/fetchAllProducts",
  async ({filterParams, sortParams}) => {
    console.log("API",filterParams, sortParams)
    const query = new URLSearchParams({
      ...filterParams,
      sortBy: sortParams
    })

    console.log(query)
    const res = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/shop/products/get?${query}`
    );


    // console.log("filtered  Product ",res?.data)
    return res?.data;
  }
);

export const fetchProdutDetails  = createAsyncThunk(
  "/products/fetchProdutDetails",
  async (id) => {

    const res = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/shop/products/get/${id}`
    );


    // console.log("filtered  Product ",res?.data)
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
      }).addCase(fetchProdutDetails.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchProdutDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDetails = action.payload.data;
      })
      .addCase(fetchProdutDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.productDetails = null;
      });
  },
});

export default shopProductSlice.reducer;
