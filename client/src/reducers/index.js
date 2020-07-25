import { combineReducers } from 'redux';
import authReducer from "./authReducer";
import gameRoomReducer from "./gameRoomReducer";


export default combineReducers({
    authStore: authReducer,
    gameRoomStore: gameRoomReducer
});