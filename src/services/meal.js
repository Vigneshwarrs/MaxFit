import api from "../utils/api";

export const createMeal = async (data) => {
    return api.post('/meal', data);
};

export const getMealByDate = async (date) => {
    return api.get(`/meal/${date}`);
}

export const getMealById = async (id) => {
    return api.get(`/meal/${id}`);
}

export const getDailyNutrition = async (id) => {
    return api.get(`/meal/daily/${id}`);
}

export const getMeals = async () =>{
    return api.get('/meal');
}

export const updateMeal = async (id, data) => {
    return api.put(`/meal/${id}`, data);
}

export const deleteMeal = async (id) => {
    return api.delete(`/meal/${id}`);
}