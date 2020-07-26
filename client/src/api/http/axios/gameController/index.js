import axiosInstance from "../index";

export const createGameRoom = data => axiosInstance.post('/create_game_room', data);
export const getAllGameRooms = () => axiosInstance.get('/get_all_game_rooms');