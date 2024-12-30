import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { createFood } from '../../services/food';

function FoodForm() {
    const initialValues = {
        name: "",
        mealType: "",
        calories: "",
        protein: "",
        carbs: "",
        fats: "",
        sugar: "",
        fiber: ""
    };
    const validationSchema = {
        name: Yup.string().required("Name is required"),
        mealType: Yup.string().required("Meal Type is required"),
        calories: Yup.number().required("Calories is required"),
        protein: Yup.number().required("Protein is required"),
        carbs: Yup.number().required("Carbs is required"),
        fats: Yup.number().required("Fats is required"),
        sugar: Yup.number().required("Sugar is required"),
        fiber: Yup.number().required("Fiber is required")
    };
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values)=>{
            await createFood(values);
        }
    });
  return (
    <form onSubmit={formik.handleSubmit}>
        <label>Name</label>
        <input type='text' name='name' onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {Boolean(formik.errors.name && formik.touched.name) && <p>{formik.errors.name}</p>}
        <label>Meal Type</label>
        <input type='text' name='mealType' onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {Boolean(formik.errors.mealType && formik.touched.mealType) && <p>{formik.errors.mealType}</p>}
        <label>Calories</label>
        <input type='text' name='calories' onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {Boolean(formik.errors.calories && formik.touched.calories) && <p>{formik.errors.calories}</p>}
        <label>Protein</label>
        <input type='text' name='protein' onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {Boolean(formik.errors.protein && formik.touched.protein) && <p>{formik.errors.protein}</p>}
        <label>Carbs</label>
        <input type='text' name='carbs' onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {Boolean(formik.errors.carbs && formik.touched.carbs) && <p>{formik.errors.carbs}</p>}
        <label>fats</label>
        <input type='text' name='fats' onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {Boolean(formik.errors.fats && formik.touched.fats) && <p>{formik.errors.fats}</p>}
        <label>Sugar</label>
        <input type='text' name='sugar' onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {Boolean(formik.errors.sugar && formik.touched.sugar) && <p>{formik.errors.sugar}</p>}
        <label>fiber</label>
        <input type='text' name='fiber' onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {Boolean(formik.errors.fiber && formik.touched.fiber) && <p>{formik.errors.fiber}</p>}
        <button type='submit'>Add Food</button>
    </form>
  )
}

export default FoodForm