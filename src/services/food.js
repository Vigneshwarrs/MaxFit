import api from "../utils/api";

export const createFood = async (data) => {
    return await api.post('/food', data);
};

export const getFoods = async () => {
    return await api.get('/food');
};
