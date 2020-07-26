import { combineReducers } from 'redux';
import authReducer from "./authReducer";
import gameRoomsReducer from "./gameRoomsReducer";


export default combineReducers({
    authStore: authReducer,
    gameRoomsStore: gameRoomsReducer
});