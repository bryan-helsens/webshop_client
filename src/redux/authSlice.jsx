import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {user: null, roles: null},
    reducers: {
        setCredentials: (state, action) => {
            const { user, roles } = action.payload
            state.user = user
            state.roles = roles[0]
        },
        logOut: (state, action) => {
            state.user = null
            state.roles = null
        },
    },
})

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user
export const selectCurrentRoles = (state) => state.auth.roles