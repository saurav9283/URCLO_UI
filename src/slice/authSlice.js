import { createSlice } from "@reduxjs/toolkit";

// Initial state for authentication
const initialState = {
    auth: false,
    user: null,
};

// Auth slice with login and logout reducers
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.auth = true;
            state.user = action.payload.user;
        },
        logout: (state) => {
            state.auth = false;
            state.user = null;
        },
    },
});

// Export actions and reducer
export const { login, logout } = authSlice.actions;
export default authSlice;
