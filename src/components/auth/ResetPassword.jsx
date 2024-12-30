import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, TextField, Typography, Alert, CircularProgress } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../../services/auth";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        await resetPassword(token, values.password);
        setMessage({ type: "success", text: "Password reset successfully! Redirecting to login..." });
        setTimeout(() => navigate("/auth/login"), 3000);
      } catch (err) {
        const errorMessage = err?.response?.data?.msg || "Failed to reset password. Please try again.";
        setMessage({ type: "error", text: errorMessage });
      } finally {
        setLoading(false);
      }
    }    
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
        Reset Password
      </Typography>
      <Typography variant="body2" sx={{ mb: 3 }}>
        Enter a new password for your account.
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          label="New Password"
          name="password"
          type="password"
          fullWidth
          value={formik.values.password}
          onChange={formik.handleChange}
          error={Boolean(formik.touched.password && formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          fullWidth
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          error={Boolean(formik.touched.confirmPassword && formik.errors.confirmPassword)}
          helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
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
          {loading ? <CircularProgress size={24} /> : "Reset Password"}
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

export default ResetPassword;
