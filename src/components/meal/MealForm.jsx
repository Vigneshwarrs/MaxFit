import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  IconButton,
  Grid,
  Divider,
  Autocomplete,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import axios from "axios";
import { getFoods } from "../../services/food";

const MealForm = () => {
  const [foodOptions, setFoodOptions] = useState([]);
  const [filteredFoodOptions, setFilteredFoodOptions] = useState([]);

  useEffect(() => {
    // Fetch existing food items from API
    getFoods()
      .then((response) => {
        setFoodOptions(response.data.foods);
      })
      .catch((error) => {
        console.error("Error fetching food items:", error);
      });
  }, []);

  const formik = useFormik({
    initialValues: {
      date: new Date().toISOString().substring(0, 10), // default today
      type: "breakfast",
      foodItems: [],
      customFoodItems: [],
    },
    validationSchema: Yup.object({
      date: Yup.date().required("Date is required"),
      type: Yup.string()
        .oneOf(["breakfast", "lunch", "dinner", "snack"])
        .required("Meal type is required"),
      foodItems: Yup.array().of(
        Yup.object().shape({
          foodId: Yup.string().required("Food ID is required"),
          quantity: Yup.number()
            .min(1, "Quantity must be at least 1")
            .required("Quantity is required"),
        })
      ),
      customFoodItems: Yup.array().of(
        Yup.object().shape({
          name: Yup.string().required("Custom food name is required"),
          calories: Yup.number()
            .min(1, "Calories must be at least 1")
            .required("Calories are required"),
          protein: Yup.number().min(0, "Protein cannot be negative"),
          carbs: Yup.number().min(0, "Carbs cannot be negative"),
          fats: Yup.number().min(0, "Fats cannot be negative"),
          quantity: Yup.number()
            .min(1, "Quantity must be at least 1")
            .required("Quantity is required"),
        })
      ),
    }),
    onSubmit: (values) => {
      axios
        .post("/api/v1/meals", values) // Replace with your actual endpoint
        .then((response) => {
          alert("Meal saved successfully!");
        })
        .catch((error) => {
          console.error("Error saving meal:", error);
          alert("Failed to save meal!");
        });
    },
  });

  useEffect(() => {
    if (formik.values.type) {
      const filtered = foodOptions.filter(
        (food) => !food.mealType || food.mealType === formik.values.type
      );
      setFilteredFoodOptions(filtered);
    } else {
      setFilteredFoodOptions(foodOptions);
    }
  }, [formik.values.type, foodOptions]);

  const addFoodItem = () => {
    formik.setFieldValue("foodItems", [
      ...formik.values.foodItems,
      { foodId: "", quantity: 1 },
    ]);
  };

  const removeFoodItem = (index) => {
    const updatedItems = [...formik.values.foodItems];
    updatedItems.splice(index, 1);
    formik.setFieldValue("foodItems", updatedItems);
  };

  const addCustomFoodItem = () => {
    formik.setFieldValue("customFoodItems", [
      ...formik.values.customFoodItems,
      { name: "", calories: 0, protein: 0, carbs: 0, fats: 0, quantity: 1 },
    ]);
  };

  const removeCustomFoodItem = (index) => {
    const updatedItems = [...formik.values.customFoodItems];
    updatedItems.splice(index, 1);
    formik.setFieldValue("customFoodItems", updatedItems);
  };

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{ maxWidth: 600, mx: "auto", mt: 4 }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Create or Update Meal
      </Typography>
      <TextField
        fullWidth
        margin="normal"
        label="Date"
        type="date"
        name="date"
        value={formik.values.date}
        onChange={formik.handleChange}
        error={formik.touched.date && Boolean(formik.errors.date)}
        helperText={formik.touched.date && formik.errors.date}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Meal Type"
        select
        name="type"
        value={formik.values.type}
        onChange={formik.handleChange}
        error={formik.touched.type && Boolean(formik.errors.type)}
        helperText={formik.touched.type && formik.errors.type}
      >
        {["breakfast", "lunch", "dinner", "snack"].map((option) => (
          <MenuItem key={option} value={option}>
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </MenuItem>
        ))}
      </TextField>
      <Divider sx={{ my: 2 }} />
      <Typography variant="h6">Food Items</Typography>
      {formik.values.foodItems.map((item, index) => (
        <Grid container spacing={2} key={index} alignItems="center" sx={{ mb: 2 }}>
          <Grid item xs={8}>
            <Autocomplete
              options={filteredFoodOptions}
              getOptionLabel={(option) => option.name || ""}
              onChange={(_, value) =>
                formik.setFieldValue(`foodItems[${index}].foodId`, value?._id || "")
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search Food"
                  error={Boolean(
                    formik.touched.foodItems?.[index]?.foodId &&
                      formik.errors.foodItems?.[index]?.foodId
                  )}
                  helperText={
                    formik.touched.foodItems?.[index]?.foodId &&
                    formik.errors.foodItems?.[index]?.foodId
                  }
                />
              )}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Quantity (gram)"
              type="number"
              name={`foodItems[${index}].quantity`}
              value={item.quantity}
              onChange={formik.handleChange}
              error={Boolean(
                formik.touched.foodItems?.[index]?.quantity &&
                  formik.errors.foodItems?.[index]?.quantity
              )}
              helperText={
                formik.touched.foodItems?.[index]?.quantity &&
                formik.errors.foodItems?.[index]?.quantity
              }
            />
          </Grid>
          <Grid item xs={1}>
            <IconButton onClick={() => removeFoodItem(index)}>
              <RemoveCircleOutlineIcon color="error" />
            </IconButton>
          </Grid>
        </Grid>
      ))}
      <Button
        variant="outlined"
        startIcon={<AddCircleOutlineIcon />}
        onClick={addFoodItem}
        sx={{ mb: 2 }}
      >
        Add Food Item
      </Button>
      <Divider sx={{ my: 2 }} />
      <Typography variant="h6">Custom Food Items</Typography>
      {formik.values.customFoodItems.map((item, index) => (
        <Grid container spacing={2} key={index} alignItems="center" sx={{ mb: 2 }}>
          <Grid item xs={4}>
            <TextField
              label="Name"
              name={`customFoodItems[${index}].name`}
              value={item.name}
              onChange={formik.handleChange}
              error={Boolean(
                formik.touched.customFoodItems?.[index]?.name &&
                  formik.errors.customFoodItems?.[index]?.name
              )}
              helperText={
                formik.touched.customFoodItems?.[index]?.name &&
                formik.errors.customFoodItems?.[index]?.name
              }
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              label="Calories (kcal)"
              type="number"
              name={`customFoodItems[${index}].calories`}
              value={item.calories}
              onChange={formik.handleChange}
              error={Boolean(
                formik.touched.customFoodItems?.[index]?.calories &&
                  formik.errors.customFoodItems?.[index]?.calories
              )}
              helperText={
                formik.touched.customFoodItems?.[index]?.calories &&
                formik.errors.customFoodItems?.[index]?.calories
              }
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              label="Protein (gram)"
              type="number"
              name={`customFoodItems[${index}].protein`}
              value={item.protein}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              label="Carbs (gram)"
              type="number"
              name={`customFoodItems[${index}].carbs`}
              value={item.carbs}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              label="Fats (gram)"
              type="number"
              name={`customFoodItems[${index}].fats`}
              value={item.fats}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={1}>
            <IconButton onClick={() => removeCustomFoodItem(index)}>
              <RemoveCircleOutlineIcon color="error" />
            </IconButton>
          </Grid>
        </Grid>
      ))}
      <Button
        variant="outlined"
        startIcon={<AddCircleOutlineIcon />}
        onClick={addCustomFoodItem}
        sx={{ mb: 2 }}
      >
        Add Custom Food Item
      </Button>
      <Divider sx={{ my: 2 }} />
      <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>
        Save Meal
      </Button>
    </Box>
  );
};

export default MealForm;
