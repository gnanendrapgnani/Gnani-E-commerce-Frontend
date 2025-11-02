import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState={
    approvalURL : null,
    isLoading: false,
    orderId: null
}

export const createNewOrder = createAsyncThunk('/order/createNewOrder', async(orderData)=>{

    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/shop/order/create`, orderData)
    return res.data
})
const shoppingOrderSlice =  createSlice({
    name:"shoppingOderSlice",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(createNewOrder.pending,(state, action)=>{
            state.isLoading = true;
        })
        builder.addCase(createNewOrder.fulfilled,(state, action)=>{
            state.isLoading = false;
            state.approvalURL = action.payload.approvalURL;
            state.orderId = action.payload.orderId;
        })
        builder.addCase(createNewOrder.rejected,(state, action)=>{
            state.isLoading = true;
            state.approvalURL = null;
            state.orderId = null
        })
    }
})

export default shoppingOrderSlice.reducer