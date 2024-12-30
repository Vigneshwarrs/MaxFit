import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    stepData: {
      0: { name: "", age: "", gender: "", picture: "" },
      1: { height: { value: 0, unit: "" }, weight: { value: 0, unit: "" }, activityLevel: "" },
      2: { email: "", password: "" },
    },
    currentStep: 0,
  };
  
const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    updateStepData(state, action) {
      const { step, data } = action.payload;
      state.stepData[step] = { ...state.stepData[step], ...data };
    },
    goToStep(state, action) {
      state.currentStep = action.payload;
    },
    resetRegistration(state) {
      state.stepData = initialState.stepData;
      state.currentStep = 0;
    },
  },
});

export const { updateStepData, goToStep, resetRegistration } = registerSlice.actions;
export default registerSlice.reducer;