import { put } from 'redux-saga/effects';
import { createAuthErrorAction, createAuthSuccessAction } from '../actions/actionCreators';
import {signInUser, signInUserByRefreshToken, signUpUser} from '../api/http/axios/authController/index';
import {appController} from "../api/ws/initSocket";

export function * authSaga (action ) {
  try {

      const {data: {user}} = action.data ? action.isRegistration ? yield signUpUser(action.data)
                                                      : yield signInUser(action.data)
                                        : yield signInUserByRefreshToken()
    if (typeof user === 'object') {
      yield put(createAuthSuccessAction(user));
      appController.subscribe(user._id);
    }

  } catch (e) {
    yield put(createAuthErrorAction(e.response));
  }
}