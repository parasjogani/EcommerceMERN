import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const userDefaultState = {
    _id: null,
    name: null,
    email: null,
    token: null,
}

const initialState = {
    user: userDefaultState,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ","
}

export const authslice=createSlice({
    name:"auth",
    initialState,
    reducers: {},
})