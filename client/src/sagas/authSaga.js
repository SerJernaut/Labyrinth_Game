import { put } from 'redux-saga/effects';
import { createAuthErrorAction, createAuthSuccessAction } from '../actions/actionCreators';
import { signInUser, signUpUser } from '../api/http/axios/authController/index';

export function * authSaga (action ) {
  try {

      const {data: {user}} = action.data.registration ? yield signUpUser(action.data)
                                                      : yield signInUser(action.data)


    yield put(createAuthSuccessAction(user));
  } catch (e) {
    yield put(createAuthErrorAction(e.response));
  }
}