import ACTION_TYPES from '../actions/actionTypes.js';
import _ from 'lodash';
import CONSTANTS from "../constants";

const {GAME_ROOM_STATUS} = CONSTANTS;

const initialState = {
    gameRoomsData: new Map(),
    error: null,
    isFetching: false,
    hasMore: null,
};


function gameRoomsReducer (state = initialState, action) {
    const gameRoomsDataClone = _.cloneDeep(state.gameRoomsData);
    switch (action.type) {
        case ACTION_TYPES.CREATE_GAME_ROOM_REQUEST:
        case ACTION_TYPES.GET_GAME_ROOMS_REQUEST:
        case ACTION_TYPES.JOIN_GAME_ROOM_REQUEST:
        case ACTION_TYPES.CHECK_IS_USER_IN_SOME_ROOM_REQUEST:
        case ACTION_TYPES.LEAVE_GAME_ROOM_REQUEST:
        case ACTION_TYPES.REMOVE_GAME_ROOM_REQUEST:
        case ACTION_TYPES.CHANGE_READY_STATUS_REQUEST:
        case ACTION_TYPES.START_GAME_REQUEST:
        case ACTION_TYPES.SET_BOARD_CELLS_REQUEST:
        case ACTION_TYPES.SET_WINNER_REQUEST: {
            return {
                ...state,
                isFetching: true,
            };
        }
        case ACTION_TYPES.CREATE_GAME_ROOM_SUCCESS: {
            const {gameRoomData, isSocket} = action;
            const gameRoomsDataArr = [...gameRoomsDataClone.entries()];
            if (isSocket) {
                gameRoomsDataClone.set(gameRoomData._id, gameRoomData);
            }
            else {
                gameRoomsDataClone.clear();
                gameRoomsDataClone.set(gameRoomData._id, gameRoomData);
                gameRoomsDataArr.forEach(data=> data[0] !== gameRoomData._id && gameRoomsDataClone.set(data[0], data[1]));
            }
            return {
                ...state,
                isFetching: false,
                gameRoomsData: gameRoomsDataClone,
            };
        }
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
        case ACTION_TYPES.JOIN_GAME_ROOM_SUCCESS: {
            const {gameRoomData} = action;
            const gameRoomsDataArr = [...gameRoomsDataClone.entries()];
            let isOwner;
            if (gameRoomsDataClone.get(gameRoomData._id)) {
                isOwner = gameRoomsDataClone.get(gameRoomData._id).isOwner;
            }
            gameRoomsDataClone.clear();
            gameRoomsDataClone.set(gameRoomData._id, {...gameRoomData, isOwner});
            gameRoomsDataArr.forEach(data=> data[0] !== gameRoomData._id && gameRoomsDataClone.set(data[0], data[1]));
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
        case ACTION_TYPES.CHANGE_READY_STATUS_SUCCESS:{
            const {changedIsReadyStatus, gameRoomId, playerId} = action;
            const gameRoomData = gameRoomsDataClone.get(gameRoomId);
            gameRoomData.isReady = changedIsReadyStatus;
            const user = gameRoomData.players.find(player=> player._id == playerId);
            user.isReady = changedIsReadyStatus;
            gameRoomData.players = gameRoomData.players.map(player=> user._id == player._id ? user : player);
            gameRoomsDataClone.set(gameRoomId, gameRoomData);
            return {
                ...state,
                isFetching: false,
                gameRoomsData: gameRoomsDataClone
            }
        }
        case ACTION_TYPES.START_GAME_SUCCESS: {
            const {gameRoomId, boardCells} = action;
            const gameRoomData = gameRoomsDataClone.get(gameRoomId);
            gameRoomData.boardCells = boardCells;
            gameRoomData.gameStatus = GAME_ROOM_STATUS.PLAYING;
            gameRoomData.players =  gameRoomData.players.map(({isReady, ...rest})=> rest);
            gameRoomData.whoseMove = gameRoomData.players[0];
            gameRoomsDataClone.set(gameRoomId, gameRoomData);
            return {
                ...state,
                isFetching: false,
                gameRoomsData: gameRoomsDataClone
            }
        }
        case ACTION_TYPES.SET_BOARD_CELLS_SUCCESS: {
            const {gameRoomId, boardCells, whoseMove} = action;
            const gameRoomData = gameRoomsDataClone.get(gameRoomId);
            gameRoomData.boardCells = boardCells;
            gameRoomData.whoseMove = whoseMove;
            gameRoomsDataClone.set(gameRoomId, gameRoomData);
            return {
                ...state,
                isFetching: false,
                gameRoomsData: gameRoomsDataClone
            }
        }
        case ACTION_TYPES.SET_WINNER_SUCCESS: {
            const {gameRoomId, winner} = action;
            const gameRoomData = gameRoomsDataClone.get(gameRoomId);
            gameRoomData.winner = winner;
            gameRoomData.gameStatus = GAME_ROOM_STATUS.ENDED;
            gameRoomData.isCurrentRoom = false;
            gameRoomsDataClone.set(gameRoomId, gameRoomData);
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
        case ACTION_TYPES.REMOVE_GAME_ROOM_ERROR:
        case ACTION_TYPES.CHANGE_READY_STATUS_ERROR:
        case ACTION_TYPES.START_GAME_ERROR:
        case ACTION_TYPES.SET_BOARD_CELLS_ERROR:
        case ACTION_TYPES.SET_WINNER_ERROR: {
            return {
                ...state,
                isFetching: false,
                error: action.error,
            };
        }
        case ACTION_TYPES.CLEAR_GAME_STORE:
            return initialState;

        case ACTION_TYPES.CLEAR_ERROR: {
            return {
                ...state,
                error: null
            }
        }

        default:
            return state;
    }
}

export default gameRoomsReducer;
