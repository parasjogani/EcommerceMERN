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
export const togglewishlists = createAsyncThunk(
    'products/add-wishlist',
    async (productId, thunkAPI) => {
        try {
            return await storeService.togglewishlist(productId)
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

export const resetState = createAction("ResetState")

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
            .addCase(togglewishlists.pending, (state) => {
                state.isLoading = true
            })
            .addCase(togglewishlists.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.wishlistproducts = action.payload
            })
            .addCase(togglewishlists.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.error
            })
            .addCase(resetState, () => initialState)
    }
})

export default storeSlice.reducer