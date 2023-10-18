import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const initialState = {
    loging: {},
    loading: false,
    error: false
}

export const loginslice = createSlice({
    name: 'user',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchlogin.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchlogin.fulfilled, (state, action) => {
            state.loading = false
            state.loging = action.payload
            localStorage.setItem('token', action.payload.token)
            localStorage.setItem("role", action.payload.role)           

        })
        builder.addCase(fetchlogin.rejected, (state) => {
            state.loading = false
            state.error = true
        })
    }

})

const login_url = 'http://localhost:2500/reg/log'
export const fetchlogin = createAsyncThunk('fetchlogin', async (input) => {
    const response = await axios.post(login_url, input)
    return response.data
})

export default loginslice.reducer