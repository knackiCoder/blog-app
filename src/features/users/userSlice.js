import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

const USERS_URL = 'https://jsonplaceholder.typicode.com/users'

const initialState = []

export const fetchUser = createAsyncThunk('users/fetchUser', async () => {
    try {
        const response = await axios.get(USERS_URL)
        return [ ...response.data ]
    } catch (err) {
        return err.message
    }
})

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            return action.payload;
        })
    }
})

export const selectAllUser = (state) => state.users;
export const selectUserById = (state, userId) =>
    state.users.find(user => user.id === userId)

export default userSlice.reducer;