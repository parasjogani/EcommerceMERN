import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit"
import categoryService from "./categoryService"

export const getCategory = createAsyncThunk(
    'category/get-category',
    async (thunkAPI) => {
        try {
            return await categoryService.getCategory()
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)
export const getACategory = createAsyncThunk(
    'category/get-a-category',
    async (id, thunkAPI) => {
        try {
            return await categoryService.getOneCategory(id)
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)
export const createCategories = createAsyncThunk(
    'category/create-category',
    async (categoryData, thunkAPI) => {
        try {
            return await categoryService.createCategory(categoryData)
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)
export const updateCategories = createAsyncThunk(
    'category/update-category',
    async (categoryData, thunkAPI) => {
        try {
            return await categoryService.updateCategory(categoryData)
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const resetState = createAction("Reset_all")

const initialState = {
    category: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ","
}

export const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCategory.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getCategory.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.category = action.payload
            })
            .addCase(getCategory.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.error
            })
            .addCase(createCategories.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createCategories.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.createdCategory = action.payload
            })
            .addCase(createCategories.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.error
            })
            .addCase(getACategory.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getACategory.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.categoryName = action.payload.name
            })
            .addCase(getACategory.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.error
            })
            .addCase(updateCategories.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateCategories.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.updatedCategory = action.payload
            })
            .addCase(updateCategories.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.error
            })
            .addCase(resetState, () => initialState)
    },
})

export default categorySlice.reducer
