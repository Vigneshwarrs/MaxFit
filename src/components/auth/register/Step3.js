import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

const Step3 = ({data, onSubmit, onBack }) => {
  const [open, setOpen] = useState(false);
  const [confirmationData, setConfirmationData] = useState(null);

  const formik = useFormik({
    initialValues: data,
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      setConfirmationData(values); // Save data for confirmation
      setOpen(true); // Open the confirmation modal
    },
  });

  const handleConfirm = () => {
    setOpen(false);
    onSubmit(confirmationData);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Box component="form" onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            value={formik.values.email}
            onChange={formik.handleChange}
            error={Boolean(formik.touched.email && formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            value={formik.values.password}
            onChange={formik.handleChange}
            error={Boolean(formik.touched.password && formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </Grid>
      </Grid>
      <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
        <Button variant="outlined" onClick={onBack}>
          Back
        </Button>
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Box>

      {/* Confirmation Modal */}
      <Dialog open={open} onClose={handleCancel}>
        <DialogTitle>Confirm Submission</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please confirm your details before submitting:
          </DialogContentText>
          <Typography>Email: {confirmationData?.email}</Typography>
          <Typography>Password: {confirmationData?.password}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Step3;
