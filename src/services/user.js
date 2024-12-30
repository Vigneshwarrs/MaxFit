import api from '../utils/api';

export const getProfile = () => {
    return api.get('/user');
}

export const updateProfile = (data) => {
    return api.get('/user', data);
}