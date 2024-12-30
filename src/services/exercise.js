import api from "../utils/api";

export const createExercise = async (data) => {
    return api.post('/exercise',data);
};

export const getExercise = async () => {
    return api.get('/exercise');
};

export const updateExercise = async (id, data) => {
    return api.put(`/exercise/${id}`, data);
}

export const deleteExercise = async (id) => {
    return api.delete(`/exercise/${id}`);
}