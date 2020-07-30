import ACTION_TYPES from '../actions/actionTypes.js';
import _ from 'lodash';

const initialState = {
    gameRoomsData: new Map(),
    error: null,
    isFetching: false,
    hasMore: null,
};


function gameRoomsReducer (state = initialState, action) {
    const gameRoomsDataClone = _.clone(state.gameRoomsData);
    switch (action.type) {
        case ACTION_TYPES.CREATE_GAME_ROOM_REQUEST:
        case ACTION_TYPES.GET_GAME_ROOMS_REQUEST:
        case ACTION_TYPES.JOIN_GAME_ROOM_REQUEST:
        case ACTION_TYPES.CHECK_IS_USER_IN_SOME_ROOM_REQUEST:
        case ACTION_TYPES.LEAVE_GAME_ROOM_REQUEST:
        case ACTION_TYPES.REMOVE_GAME_ROOM_REQUEST:{
            return {
                ...state,
                isFetching: true,
            };
        }
        case ACTION_TYPES.CREATE_GAME_ROOM_SUCCESS:
        case ACTION_TYPES.JOIN_GAME_ROOM_SUCCESS:
        case ACTION_TYPES.CHECK_IS_USER_IN_SOME_ROOM_SUCCESS:{
            const gameRoomsDataArr = [...gameRoomsDataClone.entries()];
            gameRoomsDataClone.clear();
            gameRoomsDataClone.set(action.gameRoomData._id, action.gameRoomData);
            gameRoomsDataArr.forEach(data=> data[0] !== action.gameRoomData._id && gameRoomsDataClone.set(data[0], data[1]));
            return {
                ...state,
                isFetching: false,
                gameRoomsData: gameRoomsDataClone,
            };
        }
        case ACTION_TYPES.GET_GAME_ROOMS_SUCCESS: {
            action.gameRoomsData.forEach(data=>
                gameRoomsDataClone.set(data._id, data)
            );

            return {
                ...state,
                isFetching: false,
                gameRoomsData: gameRoomsDataClone,
                hasMore: action.hasMore
            }
        }
        case ACTION_TYPES.LEAVE_GAME_ROOM_SUCCESS: {
            const {gameRoomId, updatedRoomPlayers} = action;
            const gameRoomsDataObj = gameRoomsDataClone.get(gameRoomId);
            gameRoomsDataObj.players = updatedRoomPlayers;
            gameRoomsDataClone.set(gameRoomId, gameRoomsDataObj);
            return {
                ...state,
                isFetching: false,
                gameRoomsData: gameRoomsDataClone
            }
        }
        case ACTION_TYPES.REMOVE_GAME_ROOM_SUCCESS:{
            gameRoomsDataClone.delete(action.gameRoomId);
            return {
                ...state,
                isFetching: false,
                gameRoomsData: gameRoomsDataClone
            }
        }
        case ACTION_TYPES.CREATE_GAME_ROOM_ERROR:
        case ACTION_TYPES.GET_GAME_ROOMS_ERROR:
        case ACTION_TYPES.JOIN_GAME_ROOM_ERROR:
        case ACTION_TYPES.CHECK_IS_USER_IN_SOME_ROOM_ERROR:
        case ACTION_TYPES.LEAVE_GAME_ROOM_ERROR:
        case ACTION_TYPES.REMOVE_GAME_ROOM_ERROR:{
            return {
                ...state,
                isFetching: false,
                error: action.error,
            };
        }
        case ACTION_TYPES.CLEAR_GAME_STORE:
            return initialState;

        default:
            return state;
    }
}

export default gameRoomsReducer;
