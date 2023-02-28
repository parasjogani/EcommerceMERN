import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import storeService from "./storeService"

export const getProducts = createAsyncThunk(
    'products/get-products',
    async (thunkAPI) => {
        try {
            return await storeService.getProduct()
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)


const initialState = {
    products: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ","
}

export const storeSlice = createSlice({
    name: "ourstore",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.products = action.payload
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.error
            })
    }
})

export default storeSlice.reducer