import api from "../utils/api";

export const createWater = (data) => {
    return api.post('/water', data);
}

export const getWater = () => {
    return api.get('/water');
}

export const getWaterByDate = (date) => {
    return api.get(`/water/${date}`);
}

export const deleteWater = (id) => {
    return api.delete(`/water/${id}`);
}