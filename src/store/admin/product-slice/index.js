import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
};

export const addNewProduct = createAsyncThunk(
  "/products/addnewproduct",
  async (fromData) => {
    const res = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/admin/products/add`,
      fromData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return res?.data;
  }
);

export const fetchAllProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/admin/products/get`
    );

    return res?.data;
  }
);

export const editProduct = createAsyncThunk(
  "/products/editProduct",
  async ({ id, fromData }) => {
    const res = await axios.put(
      `${import.meta.env.VITE_BASE_URL}/admin/products/edit/${id}`,
      fromData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return res?.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "/products/deleteProduct",
  async (id) => {
    const res = await axios.delete(
      `${import.meta.env.VITE_BASE_URL}/admin/products/delete/${id}`
    );

    return res?.data;
  }
);

const AdminProductsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        
        state.isLoading = false;
        state.productList = action.payload.data;
      }).addCase.rejected,
      (fetchAllProducts.rejected,
      (state, action) => {
        state.isLoading = false; 
        state.productList = [];
      });
  },
});

export default AdminProductsSlice.reducer;
