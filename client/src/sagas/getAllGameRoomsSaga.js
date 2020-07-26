import {put} from "redux-saga/effects";
import {
    createGetAllRoomsSuccessAction,
    createGetAllRoomsErrorAction,
} from "../actions/actionCreators";
import {getAllGameRooms} from "../api/http/axios/gameController";

export function * getAllGameRoomsSaga () {
    try {
        const {data} = yield getAllGameRooms();
        if (Array.isArray(data))  {yield put(createGetAllRoomsSuccessAction(data));
        }
    } catch (e) {
        yield put(createGetAllRoomsErrorAction(e.response));
    }
}