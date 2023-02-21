import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit"
import productService from "./productService"

export const getProducts = createAsyncThunk(
    'products/get-products',
    async (thunkAPI) => {
        try {
            return await productService.getProducts()
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const createProducts = createAsyncThunk(
    'products/create-products',
    async (productData, thunkAPI) => {
        try {
            return await productService.createProduct(productData)
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const deleteProducts = createAsyncThunk(
    'products/delete-products',
    async (id, thunkAPI) => {
        try {
            return await productService.deleteProduct(id)
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)
export const resetState = createAction("ResetState")

const initialState = {
    products: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ","
}

export const productSlice = createSlice({
    name: "products",
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

            .addCase(createProducts.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createProducts.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.createdProducts = action.payload
            })
            .addCase(createProducts.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.error
            })

            .addCase(deleteProducts.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteProducts.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.deletedProducts = action.payload
            })
            .addCase(deleteProducts.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.error
            })
            .addCase(resetState, () => initialState)
    },
})

export default productSlice.reducer
