import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createExercise } from '../../services/exercise';

function ExerciseForm() {
    const initailValues = {
        name: "",
        type: "",
        caloriesBurnedPerUnit: "",
        description: ""
    };
    const validationSchema = {
        name: Yup.string().required('Name is required'),
        type: Yup.string().required('Type is requried'),
        caloriesBurnedPerUnit: Yup.number().required('Calories Burned Per Unit is required'),
        description: Yup.string()
    };
    const formik = useFormik({
        initailValues,
        validationSchema,
        onSubmit: async (values) => {
            await createExercise(values);
        }
    });
  return (
    <form onSubmit={formik.handleSubmit}>
        <label>Name</label>
        <input type='text' name='name' onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {Boolean(formik.touched.name && formik.errors.name) && (<p>{formik.errors.name}</p>)}
        <label>Type</label>
        <input type='text' name='type' onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        {Boolean(formik.touched.type && formik.errors.type) && (<p>{formik.errors.type}</p>)}
        <label>Calories Burned per Unit</label>
        <input type='text' name='caloriesBurnedPerUnit' onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        {Boolean(formik.touched.caloriesBurnedPerUnit && formik.errors.caloriesBurnedPerUnit) && (<p>{formik.errors.caloriesBurnedPerUnit}</p>)}
        <label>Description</label>
        <input type='text' name='description' onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {Boolean(formik.touched.description && formik.errors.description) && (<p>{formik.errors.description}</p>)}
        <button type='sumbit'>Submit</button>
    </form>
  )
}

export default ExerciseForm