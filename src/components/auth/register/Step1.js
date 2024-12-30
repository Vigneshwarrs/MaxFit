import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Grid, MenuItem, TextField, Typography } from "@mui/material";
import api from "../../../utils/api";
import { baseURL } from "../../../services/auth";

const Step1 = ({ data, onNext }) => {
  const [profilePictures, setProfilePictures] = useState([]);

  useEffect(() => {
    const fetchPictures = async () => {
      const { data } = await api.get("/profile-pictures");
      setProfilePictures(data);
    };
    fetchPictures();
  }, []);

  const formik = useFormik({
    initialValues: data,
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      age: Yup.number().min(1, "Must be greater than 0").required("Age is required"),
      gender: Yup.string().required("Gender is required"),
      picture: Yup.string().required("Profile picture is required"),
    }),
    onSubmit: (values) => onNext(values),
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Name"
            name="name"
            fullWidth
            value={formik.values.name}
            onChange={formik.handleChange}
            error={Boolean(formik.touched.name && formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Age"
            name="age"
            type="number"
            fullWidth
            value={formik.values.age}
            onChange={formik.handleChange}
            error={Boolean(formik.touched.age && formik.errors.age)}
            helperText={formik.touched.age && formik.errors.age}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            select
            label="Gender"
            name="gender"
            fullWidth
            value={formik.values.gender}
            onChange={formik.handleChange}
            error={Boolean(formik.touched.gender && formik.errors.gender)}
            helperText={formik.touched.gender && formik.errors.gender}
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <Typography>Profile Picture</Typography>
          <Grid container spacing={2}>
            {profilePictures.map((pic) => (
              <Grid item key={pic}>
                <img
                  src={`${baseURL}${pic}`}
                  alt="Profile"
                  style={{
                    width: "100%",
                    height: 100,
                    border: formik.values.picture === pic ? "2px solid blue" : "none",
                    cursor: "pointer",
                  }}
                  onClick={() => formik.setFieldValue("picture", pic)}
                />
              </Grid>
            ))}
          </Grid>
          {Boolean(formik.touched.gender && formik.errors.gender) && (
            <Typography color="error" variant="caption">
              {formik.errors.picture}
            </Typography>
          )}
        </Grid>
      </Grid>
      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
        Next
      </Button>
    </Box>
  );
};

export default Step1;