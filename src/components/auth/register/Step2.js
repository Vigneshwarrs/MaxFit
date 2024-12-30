import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Grid, MenuItem, Select, TextField, Typography } from "@mui/material";

const Step2 = ({data, onNext, onBack }) => {
  const formik = useFormik({
    initialValues: {
      heightValue: data.height?.value || "",
      heightUnit: data.height?.unit || "",
      weightValue: data.weight?.value || "",
      weightUnit: data.weight?.unit || "",
      activityLevel: data.activityLevel || "",
    },
    validationSchema: Yup.object({
      heightValue: Yup.number().required("Height is required"),
      heightUnit: Yup.string().required("Unit is required"),
      weightValue: Yup.number().required("Weight is required"),
      weightUnit: Yup.string().required("Unit is required"),
      activityLevel: Yup.string().required("Activity level is required"),
    }),
    onSubmit: (values) => {
      const formattedData = {
        height: { value: values.heightValue, unit: values.heightUnit },
        weight: { value: values.weightValue, unit: values.weightUnit },
        activityLevel: values.activityLevel,
      };
      onNext(formattedData);
    },
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Height"
            name="heightValue"
            type="number"
            fullWidth
            value={formik.values.heightValue}
            onChange={formik.handleChange}
            error={Boolean(formik.touched.heightValue && formik.errors.heightValue)}
            helperText={formik.touched.heightValue && formik.errors.heightValue}
          />
        </Grid>
        <Grid item xs={12}>
          <Select
            name="heightUnit"
            fullWidth
            value={formik.values.heightUnit}
            onChange={formik.handleChange}
            displayEmpty
            error={Boolean(formik.touched.heightUnit && formik.errors.heightUnit)}
          >
            <MenuItem value="" disabled>
              Select Unit
            </MenuItem>
            <MenuItem value="cm">cm</MenuItem>
            <MenuItem value="ft">ft</MenuItem>
          </Select>
          {Boolean(formik.touched.heightUnit && formik.errors.heightUnit) && (
            <Typography color="error" variant="caption">
              {formik.errors.heightUnit}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Weight"
            name="weightValue"
            type="number"
            fullWidth
            value={formik.values.weightValue}
            onChange={formik.handleChange}
            error={Boolean(formik.touched.weightValue && formik.errors.weightValue)}
            helperText={formik.touched.weightValue && formik.errors.weightValue}
          />
        </Grid>
        <Grid item xs={12}>
          <Select
            name="weightUnit"
            fullWidth
            value={formik.values.weightUnit}
            onChange={formik.handleChange}
            displayEmpty
            error={Boolean(formik.touched.weightUnit && formik.errors.weightUnit)}
          >
            <MenuItem value="" disabled>
              Select Unit
            </MenuItem>
            <MenuItem value="kg">kg</MenuItem>
            <MenuItem value="lbs">lbs</MenuItem>
          </Select>
          {Boolean(formik.touched.weightUnit && formik.errors.weightUnit) && (
            <Typography color="error" variant="caption">
              {formik.errors.weightUnit}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          <Select
            name="activityLevel"
            fullWidth
            value={formik.values.activityLevel}
            onChange={formik.handleChange}
            displayEmpty
            error={Boolean(formik.touched.activityLevel && formik.errors.activityLevel)}
          >
            <MenuItem value="" disabled>
              Select Activity Level
            </MenuItem>
            <MenuItem value="sedentary">Sedentary</MenuItem>
            <MenuItem value="lightlyActive">Lightly Active</MenuItem>
            <MenuItem value="moderatelyActive">Moderately Active</MenuItem>
            <MenuItem value="veryActive">Very Active</MenuItem>
            <MenuItem value="extraActive">Extra Active</MenuItem>
          </Select>
          {Boolean(formik.touched.activityLevel && formik.errors.activityLevel)  && (
            <Typography color="error" variant="caption">
              {formik.errors.activityLevel}
            </Typography>
          )}
        </Grid>
      </Grid>
      <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
        <Button variant="outlined" onClick={onBack}>
          Back
        </Button>
        <Button type="submit" variant="contained">
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default Step2;
