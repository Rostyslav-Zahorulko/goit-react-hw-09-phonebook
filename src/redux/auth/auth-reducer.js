import { createReducer } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { authActions } from '../auth';

const {
  registerRequest,
  registerSuccess,
  registerError,
  loginRequest,
  loginSuccess,
  loginError,
  logoutRequest,
  logoutSuccess,
  logoutError,
  getCurrentUserRequest,
  getCurrentUserSuccess,
  getCurrentUserError,
} = authActions;

const initialUserState = { name: null, email: null };

const userReducer = createReducer(initialUserState, {
  [registerSuccess]: (_, { payload }) => payload.user,
  [loginSuccess]: (_, { payload }) => payload.user,
  [logoutSuccess]: () => initialUserState,
  [getCurrentUserSuccess]: (_, { payload }) => payload,
});

const isLoggedInReducer = createReducer(false, {
  [registerSuccess]: () => true,
  [registerError]: () => false,
  [loginSuccess]: () => true,
  [loginError]: () => false,
  [logoutSuccess]: () => false,
  [logoutError]: () => true,
  [getCurrentUserSuccess]: () => true,
  [getCurrentUserError]: () => false,
});

const tokenReducer = createReducer(null, {
  [registerSuccess]: (_, { payload }) => payload.token,
  [loginSuccess]: (_, { payload }) => payload.token,
  [logoutSuccess]: () => null,
});

const errorReducer = createReducer(null, {
  [registerRequest]: () => null,
  [registerError]: (_, { payload }) => payload,
  [loginRequest]: () => null,
  [loginError]: (_, { payload }) => payload,
  [logoutRequest]: () => null,
  [logoutError]: (_, { payload }) => payload,
  [getCurrentUserRequest]: () => null,
  [getCurrentUserError]: (_, { payload }) => payload,
});

const isRefreshedReducer = createReducer(false, {
  [getCurrentUserRequest]: () => false,
  [getCurrentUserSuccess]: () => true,
  [getCurrentUserError]: () => true,
  [registerSuccess]: () => true,
  [loginSuccess]: () => true,
});

const authReducer = combineReducers({
  user: userReducer,
  isLoggedIn: isLoggedInReducer,
  token: tokenReducer,
  error: errorReducer,
  isRefreshed: isRefreshedReducer,
});

export default authReducer;
