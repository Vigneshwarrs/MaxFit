import api from '../utils/api';

export const createGoal = async (data) => {
    return api.post('/goal', data);
}

export const getGoals = async () => {
    return api.get('/goal');
}

export const getGoalById = async (id) => {
    return api.get(`/goal/${id}`);
}

export const updateGoal = async (id, data) => {
    return api.put(`/goal/${id}`, data);
}

export const deleteGoal = async (id) => {
    return api.delete(`/goal/${id}`);
}