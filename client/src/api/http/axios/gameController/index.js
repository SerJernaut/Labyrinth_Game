import axiosInstance from "../index";

export const createGameRoom = data => axiosInstance.post('/create_game_room', data);
export const getGameRooms = data => axiosInstance.post('/get_game_rooms', data);