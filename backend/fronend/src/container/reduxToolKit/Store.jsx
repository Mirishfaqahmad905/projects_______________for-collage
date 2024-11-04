import { configureStore } from "@reduxjs/toolkit"; // Import the configureStore function from Redux Toolkit
import userReducer from "./userSlice"; // Import the user slice reducer

// Configure the Redux store
const store = configureStore({
    reducer: {
        user: userReducer // Set the user slice reducer in the store
    }
});

export default store; // Export the configured store
