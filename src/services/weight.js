import api from '../utils/api';

export const createWeight = async (data) =>{
    return api.post('/weight', data);
}

export const getWeight = async () => {
    return api.get('/weight');
}

export const updateWeight = async (id,data) => {
    return api.put(`/weight/${id}`, data);
}

export const deleteWeight = async (id) => {
    return api.delete(`/weight/${id}`);
}