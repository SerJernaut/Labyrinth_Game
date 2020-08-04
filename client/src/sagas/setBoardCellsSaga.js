import {put} from "redux-saga/effects";
import {
    createSetBoardCellsErrorAction,
} from "../actions/actionCreators";
import {setBoardCells} from "../api/http/axios/gameController";

export function * setBoardCellsSaga (action) {
    try {
        const {gameRoomId, boardCells, whoseMove} = action;
        yield setBoardCells({gameRoomId, boardCells, whoseMove});
    } catch (e) {
        yield put(createSetBoardCellsErrorAction(e.response));
    }
}