import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  addressList: [],
};

// add address
export const addNewAddress = createAsyncThunk(
  "/address/addAddress",
  async (formData) => {
    const res = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/shop/address/add`,
      formData
    );

    return res.data;
  }
);

export const fetchAllAddress = createAsyncThunk(
  "/address/fetchAllAddress",
  async (userId) => {
    const res = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/shop/address/get/${userId}`
    );

    return res.data;
  }
);

export const editAddress = createAsyncThunk(
  "/address/editAddress",
  async ({userId, addressId, formData}) => {
    console.log("edit API", userId, addressId, formData)
    const res = await axios.put(
      `${
        import.meta.env.VITE_BASE_URL
      }/shop/address/update/${userId}/${addressId}`,
      formData
    );

    return res.data;
  }
);

export const deleteAddress = createAsyncThunk(
  "/address/deleteAddress",
  async ({userId, addressId}) => {
    console.log("API", userId, addressId)
    const res = await axios.delete(
           `${
        import.meta.env.VITE_BASE_URL
      }/shop/address/delete/${userId}/${addressId}`
    );

    return res.data;
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addNewAddress.pending, (state, action)=>{
        state.isLoading = true;
    }).addCase(addNewAddress.fulfilled, (state, action)=>{
        state.isLoading = false;
    }).addCase(addNewAddress.rejected, (state, action)=>{
        state.isLoading = false;
    }).addCase(fetchAllAddress.pending, (state, action)=>{
        state.isLoading = true;
    }).addCase(fetchAllAddress.fulfilled, (state, action)=>{
        state.isLoading = false;
        state.addressList = action.payload.data
    }).addCase(fetchAllAddress.rejected, (state, action)=>{
        state.isLoading = false;
        state.addressList = [];
    }).addCase(deleteAddress.pending, (state, action)=>{
        state.isLoading = true;
    }).addCase(deleteAddress.fulfilled, (state, action)=>{
        state.isLoading = false;
    }).addCase(deleteAddress.rejected, (state, action)=>{
        state.isLoading = false;
    });
  },
});

export default addressSlice.reducer;
