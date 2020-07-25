import ACTION_TYPES from '../actions/actionTypes.js';

const initialState = {
    gameRoomData: new Map(),
    error: null,
    isFetching: false,
};

const loadDataToMap = gameRoomData => {
    const map = new Map();
    gameRoomData.forEach(data => {
        map.set(data._id, data);
    });
    return map;
}

function gameRoomReducer (state = initialState, action) {
    switch (action.type) {
        case ACTION_TYPES.CREATE_GAME_ROOM_REQUEST:
            return {
                ...state,
                isFetching: true,
            };
        case ACTION_TYPES.CREATE_GAME_ROOM_SUCCESS:
            return {
                ...state,
                isFetching: false,
                gameRoomData: loadDataToMap(action.gameRoomData),
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

export default gameRoomReducer;
