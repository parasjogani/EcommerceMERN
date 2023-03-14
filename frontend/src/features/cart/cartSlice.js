import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import cartService from "./cartService"

export const getCartProducts = createAsyncThunk(
    'cart/get-cart-products',
    async (thunkAPI) => {
        try {
            return await cartService.getCartProduct()
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

const initialState = {
    cart: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ","
}

export const resetState = createAction("ResetState")

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCartProducts.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getCartProducts.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.cart = action.payload
            })
            .addCase(getCartProducts.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.error
            })
            .addCase(resetState, () => initialState)
    }
})

export default cartSlice.reducer