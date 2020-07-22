import { takeLatest } from 'redux-saga/effects';
import ACTION_TYPES from "../actions/actionTypes";
import {authSaga} from "./authSaga";

export default function * () {
    yield takeLatest(ACTION_TYPES.AUTH_REQUEST, authSaga);
}