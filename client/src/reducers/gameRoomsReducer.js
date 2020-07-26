import ACTION_TYPES from '../actions/actionTypes.js';
import _ from 'lodash';

const initialState = {
    gameRoomsData: new Map(),
    error: null,
    isFetching: false,
};


function gameRoomsReducer (state = initialState, action) {
    const gameRoomsDataClone = _.clone(state.gameRoomsData);
    switch (action.type) {
        case ACTION_TYPES.CREATE_GAME_ROOM_REQUEST:
        case ACTION_TYPES.GET_ALL_GAME_ROOMS_REQUEST:
            return {
                ...state,
                isFetching: true,
            };
        case ACTION_TYPES.CREATE_GAME_ROOM_SUCCESS:


            gameRoomsDataClone.set(action.gameRoomData._id, action.gameRoomData)

            return {
                ...state,
                isFetching: false,
                gameRoomsData: gameRoomsDataClone,
            };

        case ACTION_TYPES.GET_ALL_GAME_ROOMS_SUCCESS:

            action.gameRoomsData.forEach(data=>
                gameRoomsDataClone.set(data._id, data)
            );

            return {
                ...state,
                isFetching: false,
                gameRoomsData: gameRoomsDataClone,
            }

        case ACTION_TYPES.CREATE_GAME_ROOM_ERROR:
        case ACTION_TYPES.GET_ALL_GAME_ROOMS_ERROR:
            return {
                ...state,
                isFetching: false,
                error: action.error,
            };
        default:
            return state;
    }
}

export default gameRoomsReducer;
