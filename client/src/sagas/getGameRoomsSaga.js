import {put} from "redux-saga/effects";
import {
    createGetRoomsSuccessAction,
    createGetRoomsErrorAction,
} from "../actions/actionCreators";
import {getGameRooms} from "../api/http/axios/gameController";

export function * getGameRoomsSaga (action) {
    try {
        const {data: {gameRoomsData, hasMore}} = yield getGameRooms(action.filterObj);
        if (Array.isArray(gameRoomsData) && typeof hasMore === "boolean") {
            yield put(createGetRoomsSuccessAction(gameRoomsData, hasMore));
        }
    } catch (e) {
        yield put(createGetRoomsErrorAction(e.response));
    }
}