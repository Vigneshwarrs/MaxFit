import api from "../utils/api";

export const createSleep = (data) => {
    return api.post('/sleep', data);
}

export const getSleepStatistics = () => {
    return api.get('/sleep');
}

export const getMoodInsights = () => {
    return api.get('/sleep/mood');
}

export const getSleepById = (id) => {
    return api.get(`/sleep/${id}`);
}

export const getSleepByDate = (date) => {
    return api.get(`/sleep/${date}`);
}

export const updateSleep = (id, data) => {
    return api.put(`/sleep/${id}`, data);
}

export const deleteSleep = (id) => {
    return api.delete(`/sleep/${id}`);
}