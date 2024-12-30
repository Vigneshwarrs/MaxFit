import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "./features/registerSlice";
import authReducer from './features/authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    register: registerReducer,
  },
});

export default store;