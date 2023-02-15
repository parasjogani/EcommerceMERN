import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import couponService from "./couponService"

export const getCoupon = createAsyncThunk(
    'coupon/get-ccoupon',
    async (thunkAPI) => {
        try {
            return await couponService.getCoupon()
        } catch (error) {
            console.log(error);
            // return thunkAPI.rejectWithValue(error)
        }
    }
)

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
    },
})

export default couponSlice.reducer
