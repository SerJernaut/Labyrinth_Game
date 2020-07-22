import { put } from 'redux-saga/effects';
import { createAuthErrorAction, createAuthSuccessAction } from '../actions/actionCreators';
import {signInUser, signInUserByRefreshToken, signUpUser} from '../api/http/axios/authController/index';

export function * authSaga (action ) {
  try {

      const {data: {user}} = action.data ? action.isRegistration ? yield signUpUser(action.data)
                                                      : yield signInUser(action.data)
                                        : yield signInUserByRefreshToken()


    yield put(createAuthSuccessAction(user));
  } catch (e) {
    yield put(createAuthErrorAction(e.response));
  }
}