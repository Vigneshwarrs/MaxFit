import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, TextField, Typography, Alert, CircularProgress } from "@mui/material";
import { forgotPassword } from "../../services/auth";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        await forgotPassword(values.email); // Replace with your API endpoint
        setMessage({ type: "success", text: "Password reset link sent to your email." });
      } catch (err) {
        setMessage({ type: "error", text: "Failed to send password reset link. Please try again." });
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: "0 auto",
        mt: 4,
        px: 2,
        textAlign: "center",
      }}
    >
      <Typography variant="h5" gutterBottom>
        Forgot Password
      </Typography>
      <Typography variant="body2" sx={{ mb: 3 }}>
        Enter your email address, and we will send you a link to reset your password.
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          label="Email Address"
          name="email"
          fullWidth
          value={formik.values.email}
          onChange={formik.handleChange}
          error={Boolean(formik.touched.email && formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          sx={{ mb: 2 }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
          sx={{ mb: 2 }}
        >
          {loading ? <CircularProgress size={24} /> : "Send Reset Link"}
        </Button>
      </form>
      {message && (
        <Alert severity={message.type} sx={{ mt: 2 }}>
          {message.text}
        </Alert>
      )}
    </Box>
  );
};

export default ForgotPassword;
