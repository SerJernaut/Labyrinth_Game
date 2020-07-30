import axiosInstance from "../index";

export const createGameRoom = data => axiosInstance.post('/create_game_room', data);
export const getGameRooms = data => axiosInstance.post('/get_game_rooms', data);
export const joinGameRoom = data => axiosInstance.post('/join_game_room', data);
export const checkIsUserInTheRoom = data => axiosInstance.get('/check_is_user_in_some_room', data);
export const leaveGameRoomById = data => axiosInstance.post('/leave_game_room_by_id', data);
export const removeGameRoomById = data => axiosInstance.post('/remove_game_room_by_id', data)