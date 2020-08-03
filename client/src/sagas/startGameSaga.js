import {put} from "redux-saga/effects";
import {
    createStartGameErrorAction
} from "../actions/actionCreators";
import {startGame} from "../api/http/axios/gameController";

export function * startGameSaga (action) {
    try {
        const {gameRoomId, boardCells, history} = action;
        yield startGame({gameRoomId, boardCells});
        history.replace(`/game_room/${gameRoomId}`);
    } catch (e) {
        yield put(createStartGameErrorAction(e.response));
    }
}