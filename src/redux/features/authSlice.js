import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    accessToken: (() => {
        try {
            const token = localStorage.getItem("accessToken");
            // Add token validation logic if required
            return token;
        } catch (error) {
            console.error("Error accessing localStorage:", error);
            return null;
        }
    })(),
    userDetails: (() => {
        try {
            return JSON.parse(localStorage.getItem("userDetails")) || null;
        } catch (error) {
            console.error("Error parsing userDetails from localStorage:", error);
            return null;
        }
    })(),
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state, action) {
            const { token, user } = action.payload;
            console.log(action.payload, "From slice");
            state.accessToken = token;
            state.userDetails = user;
            try {
                localStorage.setItem("accessToken", token);
                localStorage.setItem("userDetails", JSON.stringify(user));
            } catch (error) {
                console.error("Error saving to localStorage:", error);
            }
        },
        logout(state) {
            state.accessToken = null;
            state.userDetails = null;
            try {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("userDetails");
            } catch (error) {
                console.error("Error removing from localStorage:", error);
            }
        },
        updateProfile(state, action) {
            const updatedDetails = action.payload;
            state.userDetails = { ...state.userDetails, ...updatedDetails };
            try {
                localStorage.setItem(
                    "userDetails",
                    JSON.stringify(state.userDetails)
                );
            } catch (error) {
                console.error("Error updating localStorage:", error);
            }
        },
    },
});

export const { login, logout, updateProfile } = authSlice.actions;

export default authSlice.reducer;
