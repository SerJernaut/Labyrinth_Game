import axiosInstance from "../index";

export const createPreparingGameData = data => axiosInstance.post('/create_preparing_game_data', data);