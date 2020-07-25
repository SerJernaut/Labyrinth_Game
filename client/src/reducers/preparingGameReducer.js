import ACTION_TYPES from '../actions/actionTypes.js';

const initialState = {
    preparingGameData: new Map(),
    error: null,
    isFetching: false,
};

const loadDataToMap = preparingGameData => {
    const map = new Map();
    preparingGameData.forEach(data => {
        map.set(data._id, data);
    });
    return map;
}

function preparingGameReducer (state = initialState, action) {
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
                preparingGameData: loadDataToMap(action.preparingGameData),
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

export default preparingGameReducer;
