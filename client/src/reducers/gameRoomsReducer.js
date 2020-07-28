import ACTION_TYPES from '../actions/actionTypes.js';
import _ from 'lodash';

const initialState = {
    gameRoomsData: new Map(),
    error: null,
    isFetching: false,
    hasMore: null,
    currentGameRoom: null
};


function gameRoomsReducer (state = initialState, action) {
    const gameRoomsDataClone = _.clone(state.gameRoomsData);
    switch (action.type) {
        case ACTION_TYPES.CREATE_GAME_ROOM_REQUEST:
        case ACTION_TYPES.GET_GAME_ROOMS_REQUEST:
        case ACTION_TYPES.JOIN_GAME_ROOM_REQUEST:
        case ACTION_TYPES.CHECK_IS_USER_IN_SOME_ROOM_REQUEST:
            return {
                ...state,
                isFetching: true,
            };
        case ACTION_TYPES.CREATE_GAME_ROOM_SUCCESS:
        case ACTION_TYPES.JOIN_GAME_ROOM_SUCCESS:
            gameRoomsDataClone.set(action.gameRoomData._id, action.gameRoomData)

            return {
                ...state,
                isFetching: false,
                gameRoomsData: gameRoomsDataClone,
            };
        case ACTION_TYPES.GET_GAME_ROOMS_SUCCESS:

            action.gameRoomsData.forEach(data=>
                gameRoomsDataClone.set(data._id, data)
            );

            return {
                ...state,
                isFetching: false,
                gameRoomsData: gameRoomsDataClone,
                hasMore: action.hasMore
            }
        case ACTION_TYPES.CHECK_IS_USER_IN_SOME_ROOM_SUCCESS:
            return {
                ...state,
                isFetching: false,
                currentGameRoom: action.currentGameRoom
            }
        case ACTION_TYPES.CREATE_GAME_ROOM_ERROR:
        case ACTION_TYPES.GET_GAME_ROOMS_ERROR:
        case ACTION_TYPES.JOIN_GAME_ROOM_ERROR:
        case ACTION_TYPES.CHECK_IS_USER_IN_SOME_ROOM_ERROR:
            return {
                ...state,
                isFetching: false,
                error: action.error,
            };
        case ACTION_TYPES.CLEAR_GAME_STORE:
            return initialState;

        default:
            return state;
    }
}

export default gameRoomsReducer;
