import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateStepData, goToStep } from "../../../redux/features/registerSlice";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import { register } from "../../../services/auth";
import { Box, Stepper, Step, StepLabel, Typography, Snackbar, Alert, CircularProgress } from "@mui/material";

const Register = () => {
  const dispatch = useDispatch();
  const { stepData, currentStep } = useSelector((state) => state.register);

  const [notification, setNotification] = React.useState({ type: null, message: "" });
  const [loading, setLoading] = React.useState(false);

  const steps = ["Personal Details", "Physical Information", "Account Setup"];

  const handleNext = (newData) => {
    dispatch(updateStepData({ step: currentStep, data: newData }));
    dispatch(goToStep(currentStep + 1));
  };

  const handleBack = () => {
    dispatch(goToStep(currentStep - 1));
  };

  const handleSubmit = async (newData) => {
    try {
      setLoading(true);
      dispatch(updateStepData({ step: currentStep, data: newData }));
      const allData = { ...stepData[0], ...stepData[1], ...stepData[2], ...newData };
      await register(allData);
      setNotification({ type: "success", message: "Registration successful!" });
    } catch (err) {
      setNotification({ type: "error", message: "Failed to register. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseNotification = () => {
    setNotification({ type: null, message: "" });
  };

  const stepComponents = [
    <Step1 data={stepData[0]} onNext={handleNext} />,
    <Step2 data={stepData[1]} onNext={handleNext} onBack={handleBack} />,
    <Step3 data={stepData[2]} onSubmit={handleSubmit} onBack={handleBack} />,
  ];

  return (
    <Box sx={{ width: "80%", margin: "0 auto", mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        User Registration
      </Typography>
      <Stepper activeStep={currentStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box sx={{ mt: 3, position: "relative" }}>
        {loading && (
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 10,
            }}
          >
            <CircularProgress />
          </Box>
        )}
        {!loading && stepComponents[currentStep]}
      </Box>
      <Snackbar
        open={Boolean(notification.message)}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.type || "info"}
          sx={{ width: "100%" }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Register;