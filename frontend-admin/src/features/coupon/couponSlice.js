import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit"
import couponService from "./couponService"

export const getCoupon = createAsyncThunk(
    'coupon/get-ccoupon',
    async (thunkAPI) => {
        try {
            return await couponService.getCoupon()
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const createCoupons = createAsyncThunk(
    'category/create-category',
    async (categoryData, thunkAPI) => {
        try {
            return await couponService.createCoupon(categoryData)
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const resetState = createAction("ResetState")

const initialState = {
    coupon: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ","
}

export const couponSlice = createSlice({
    name: "coupon",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCoupon.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getCoupon.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.coupon = action.payload
            })
            .addCase(getCoupon.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.error
            })
            .addCase(createCoupons.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createCoupons.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.createdCoupon = action.payload
            })
            .addCase(createCoupons.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.error
            })
            .addCase(resetState, () => initialState)
    },
})

export default couponSlice.reducer
