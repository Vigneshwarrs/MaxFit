import React from "react";
import {
  Box,
  Button,
  Typography,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

// Constants
const UNITS = ["ml", "l", "oz"];
const SOURCES = ["Water", "Tea", "Coffee", "Juice"];

// Validation Schema
const validationSchema = Yup.object({
  drinkedAmount: Yup.number()
    .required("Drinked amount is required")
    .min(1, "Amount must be greater than 0"),
  drinkedUnit: Yup.string().required("Unit is required"),
  source: Yup.string().required("Source is required"),
  goalAmount: Yup.number()
    .required("Goal amount is required")
    .min(1, "Goal must be greater than 0"),
  goalUnit: Yup.string().required("Goal unit is required"),
});

// Reusable FormField Component
const FormField = ({ name, label, formik, ...props }) => (
  <TextField
    fullWidth
    label={label}
    name={name}
    value={formik.values[name]}
    onChange={formik.handleChange}
    error={formik.touched[name] && Boolean(formik.errors[name])}
    helperText={formik.touched[name] && formik.errors[name]}
    {...props}
  />
);

// Reusable SelectField Component
const SelectField = ({ name, label, formik, options }) => (
  <FormControl fullWidth>
    <InputLabel>{label}</InputLabel>
    <Select
      name={name}
      value={formik.values[name]}
      onChange={formik.handleChange}
      error={formik.touched[name] && Boolean(formik.errors[name])}
    >
      {options.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

function WaterForm() {
  const formik = useFormik({
    initialValues: {
      drinkedAmount: "",
      drinkedUnit: "ml",
      source: "Water",
      goalAmount: "",
      goalUnit: "ml",
    },
    validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{
        maxWidth: 600,
        mx: "auto",
        mt: 4,
        p: 3,
        borderRadius: 2,
        boxShadow: 3,
        bgcolor: "background.paper",
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Water Intake Form
      </Typography>
      <Grid container spacing={3}>
        {/* Drinked Amount */}
        <Grid item xs={12} sm={6}>
          <FormField
            name="drinkedAmount"
            label="Drinked Amount"
            type="number"
            formik={formik}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SelectField
            name="drinkedUnit"
            label="Unit"
            formik={formik}
            options={UNITS}
          />
        </Grid>

        {/* Source */}
        <Grid item xs={12}>
          <SelectField
            name="source"
            label="Source"
            formik={formik}
            options={SOURCES}
          />
        </Grid>

        {/* Goal Amount */}
        <Grid item xs={12} sm={6}>
          <FormField
            name="goalAmount"
            label="Goal Amount"
            type="number"
            formik={formik}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SelectField
            name="goalUnit"
            label="Goal Unit"
            formik={formik}
            options={UNITS}
          />
        </Grid>

        {/* Submit Button */}
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default WaterForm;
