import { createSlice } from "@reduxjs/toolkit";

const savedUser = JSON.parse(localStorage.getItem("currentUser") || "null");

const initialState = {
    user: savedUser,
    isAuthenticated: savedUser !== null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) =>
        {
            state.user = action.payload;
            state.isAuthenticated = true;

            localStorage.setItem("currentUser", JSON.stringify(action.payload));
        },

        logout: (state) =>
        {
            state.user = null;
            state.isAuthenticated = false;

            localStorage.removeItem("currentUser");
        }
    }
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;