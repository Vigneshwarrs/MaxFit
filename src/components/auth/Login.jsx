import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Snackbar,
  Alert,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login as loginService } from "../../services/auth";
import { login as loginRedux } from "../../redux/features/authSlice";

function Login() {
  const [notification, setNotification] = useState({ type: null, message: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password should be above 6 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const {data} = await loginService(values.email, values.password);
        dispatch(loginRedux(data));
        setNotification({ type: "success", message: "Login successful!" });
        setTimeout(() => navigate("/meal"), 3000);
      } catch (error) {
        setNotification({ type: "error", message: "Failed to login. Please try again." });
        console.error(error);
      }
    },
  });

  const handleCloseNotification = () => {
    setNotification({ type: null, message: "" });
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 400,
        margin: "auto",
        mt: 8,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={Boolean(formik.touched.email && formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={Boolean(formik.touched.password && formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 3 }}
          disabled={formik.isSubmitting}
        >
          Submit
        </Button>
      </form>

      {/* Snackbar for Notifications */}
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
}

export default Login;
