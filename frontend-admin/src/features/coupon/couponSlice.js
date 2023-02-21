import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit"
import couponService from "./couponService"

export const getAllCoupon = createAsyncThunk(
    'coupon/get-coupon',
    async (thunkAPI) => {
        try {
            return await couponService.getAllCoupon()
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)
export const getACoupon = createAsyncThunk(
    'coupon/get-a-coupon',
    async (id, thunkAPI) => {
        try {
            return await couponService.getOneCoupon(id)
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const createCoupons = createAsyncThunk(
    'coupon/create-coupon',
    async (couponData, thunkAPI) => {
        try {
            return await couponService.createCoupon(couponData)
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const deleteCoupons = createAsyncThunk(
    'coupon/delete-coupon',
    async (id, thunkAPI) => {
        try {
            return await couponService.deleteCoupon(id)
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)
export const toggledCoupon = createAsyncThunk(
    'coupon/toggle-coupon',
    async (id, thunkAPI) => {
        try {
            return await couponService.toggleCoupon(id)
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
            .addCase(getAllCoupon.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllCoupon.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.coupon = action.payload
            })
            .addCase(getAllCoupon.rejected, (state, action) => {
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
            .addCase(getACoupon.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getACoupon.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.getOneCoupon = action.payload
            })
            .addCase(getACoupon.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.error
            })
            .addCase(deleteCoupons.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteCoupons.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.deletedCoupon = action.payload
            })
            .addCase(deleteCoupons.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.error
            })
            .addCase(toggledCoupon.pending, (state) => {
                state.isLoading = true
            })
            .addCase(toggledCoupon.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.updatedCoupon = action.payload
            })
            .addCase(toggledCoupon.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.error
            })
            .addCase(resetState, () => initialState)
    },
})

export default couponSlice.reducer
