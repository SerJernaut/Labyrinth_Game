import {put} from "redux-saga/effects";
import {
    createGetRoomsSuccessAction,
    createGetRoomsErrorAction,
} from "../actions/actionCreators";
import {getGameRooms} from "../api/http/axios/gameController";

export function * getGameRoomsSaga (action) {
    try {
        const {data: {filteredData, hasMore}} = yield getGameRooms(action.filterObj);
        if (Array.isArray(filteredData) && typeof hasMore === "boolean") {
            yield put(createGetRoomsSuccessAction(filteredData, hasMore));
        }
    } catch (e) {
        yield put(createGetRoomsErrorAction(e.response));
    }
}