import axiosInstance from "../index";

export const createGameRoom = data => axiosInstance.post('/create_game_room', data);