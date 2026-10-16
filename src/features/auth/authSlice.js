import { createSlice } from "@reduxjs/toolkit";

function loadUser()
{
    try
    {
        return JSON.parse(localStorage.getItem("currentUser") || "null");
    }
    catch
    {
        return null;
    }
}

const savedUser = loadUser();

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

        },

        logout: (state) =>
        {
            state.user = null;
            state.isAuthenticated = false;

        }
    }
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;