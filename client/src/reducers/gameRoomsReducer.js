import ACTION_TYPES from '../actions/actionTypes.js';

const initialState = {
    gameRoomsData: new Map(),
    error: null,
    isFetching: false,
};


function gameRoomsReducer (state = initialState, action) {
    switch (action.type) {
        case ACTION_TYPES.CREATE_GAME_ROOM_REQUEST:
            return {
                ...state,
                isFetching: true,
            };
        case ACTION_TYPES.CREATE_GAME_ROOM_SUCCESS:

            const newState = new Map();
            newState.set(action.gameRoomData._id, action.gameRoomData)

            return {
                ...state,
                isFetching: false,
                gameRoomsData: newState,
            };
        case ACTION_TYPES.CREATE_GAME_ROOM_ERROR:
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
