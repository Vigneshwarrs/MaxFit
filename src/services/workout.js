import api from '../utils/api.js';

export const create = async (data) => {
    return api.post('/workout', data);
};

export const gets = async (startDate, endDate, type) => {
    return api.get(`/workout?startData=${startDate}&&endData=${endDate}&&type=${type}`);
}

export const getById = async (id) => {
    return api.get(`/workout/${id}`);
}

export const getStats = async () => {
    return api.get('/workout/stats');
}

export const update = async (id, data) => {
    return api.put(`/workout/${id}`, data);
}

export const deletE = async (id) => {
    return api.delete(`/workout/${id}`);
}