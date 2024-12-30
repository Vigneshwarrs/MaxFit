import api from '../utils/api';

export const updateStreak = async (data) => {
    return api.post('/streak', data);
}

export const getStreakStat = async (data) => {
    return api.get(`/streak/${data}`);
}