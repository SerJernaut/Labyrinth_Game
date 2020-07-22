import ACTION_TYPES from './actionTypes.js';

export const createAuthRequestAction = values => ( {
  type: ACTION_TYPES.AUTH_REQUEST,
  data: values,
  registration: true
} );

export const createAuthSuccessAction = user => ( {
  type: ACTION_TYPES.AUTH_SUCCESS,
  user,
} );

export const createAuthErrorAction = error => ( {
  type: ACTION_TYPES.AUTH_ERROR,
  error,
} );