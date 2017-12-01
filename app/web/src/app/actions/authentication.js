import fetch from 'isomorphic-fetch';
import {
  dialogLoginShow,
  dialogRegisterShow,
  resetLogin,
  resetPasswordReset,
  resetRegister,
  updateLogin,
  updatePasswordReset,
  updateRegister,
} from './form';
import { updateMessageAndClose } from './message';
import { getFormValidationResult, getHTTPResponse } from '../utils';
import {
  CONTENT_LOGIN_SUCCESS,
  CONTENT_LOGIN_FAIL,
  CONTENT_LOGOUT_SUCCESS,
  CONTENT_PASSWORD_RESET_FAIL,
  CONTENT_PASSWORD_RESET_SUCCESS,
  CONTENT_PASSWORD_RESET_EMAIL_SUCCESS,
  CONTENT_PASSWORD_RESET_EMAIL_FAIL,
  CONTENT_REGISTER_SUCCESS,
  CONTENT_REGISTER_FAIL,
} from '../content';

export const AUTHENTICATION_IS_FETCHING = 'AUTHENTICATION_IS_FETCHING';
export const AUTHENTICATION_LOGOUT = 'AUTHENTICATION_LOGOUT';
export const AUTHENTICATION_REQUEST_USER_DATA = 'AUTHENTICATION_REQUEST_USER_DATA';
export const AUTHENTICATION_RECEIVE_USER_DATA = 'AUTHENTICATION_RECEIVE_USER_DATA';
export const AUTHENTICATION_RECEIVE_USER_TOKEN = 'AUTHENTICATION_RECEIVE_USER_TOKEN';

const API_PATH = '/api/appUsers';
const API_PATH_LOGIN = `${API_PATH}/login`;
const API_PATH_PASSWORD_RESET = `${API_PATH}/reset-password`;
const API_PATH_PASSWORD_RESET_EMAIL = `${API_PATH}/reset`;

// Synchronous Action Creators
// http://redux.js.org/docs/advanced/AsyncActions.html#synchronous-action-creators
export const isFetching = payload => ({
  type: AUTHENTICATION_IS_FETCHING,
  payload,
});

const requestUserData = () => ({
  type: AUTHENTICATION_REQUEST_USER_DATA,
});

const receiveUserData = payload => ({
  type: AUTHENTICATION_RECEIVE_USER_DATA,
  payload,
  receivedAt: Date.now(),
});

const receiveUserToken = payload => ({
  type: AUTHENTICATION_RECEIVE_USER_TOKEN,
  payload,
});

const logoutUser = () => ({
  type: AUTHENTICATION_LOGOUT,
});

// Async Action Creators
// http://redux.js.org/docs/advanced/AsyncActions.html#async-action-creators
const authenticationSubmit = (url, formObject) => fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(formObject),
});

const getFutureDate = (seconds) => {
  const date = new Date();
  date.setSeconds(date.getSeconds() + seconds);
  return date;
};

const userFetch = async (token) => {
  const user = await fetch(`${API_PATH}/me?access_token=${token}`);
  return user.json();
};

const loginSubmit = async (formObject) => {
  const loginResponse = await authenticationSubmit(API_PATH_LOGIN, formObject);
  const { error, ...rest } = await getHTTPResponse(loginResponse);
  if (error) {
    return { error };
  }
  const { id: token, ttl } = rest.body;
  const user = await userFetch(token);
  const expiration = getFutureDate(ttl);
  return {
    expiration,
    user,
    token,
  };
};

export const getUser = () => (async (dispatch, getState) => {
  const { authentication } = getState();
  dispatch(requestUserData());
  try {
    const user = await userFetch(authentication.token);
    return dispatch(receiveUserData(user));
  } catch (error) {
    return dispatch(updateMessageAndClose({
      body: error.message,
      type: 'error',
    }));
  }
});

export const logout = () => (async (dispatch, getState) => {
  const { authentication } = getState();
  try {
    await fetch(`${API_PATH}/logout?access_token=${authentication.token}`, { method: 'POST' });
    dispatch(logoutUser());
    dispatch(updateMessageAndClose({
      body: CONTENT_LOGOUT_SUCCESS,
      type: 'success',
    }));
  } catch (error) {
    // @TODO: handle error better.
    dispatch(updateMessageAndClose({
      body: error.message,
      isActive: true,
      type: 'error',
    }));
  }
});

export const login = () => (async (dispatch, getState) => {
  const { loginForm } = getState();
  dispatch(isFetching(true));
  try {
    const { formObject, hasErrors } = getFormValidationResult(loginForm);
    if (hasErrors) {
      // update form element with errors.
      dispatch(updateLogin(formObject));
      throw new Error(CONTENT_LOGIN_FAIL);
    }
    const { error: fetchError, user, token, expiration } = await loginSubmit(formObject);
    if (fetchError) {
      throw new Error(fetchError);
    }
    dispatch(dialogLoginShow(false));
    dispatch(isFetching(false));
    dispatch(receiveUserData({ ...user, expiration }));
    dispatch(receiveUserToken(token));
    if (user.id) {
      dispatch(resetLogin());
    }
    dispatch(updateMessageAndClose({
      body: CONTENT_LOGIN_SUCCESS,
      isActive: true,
      type: 'success',
    }));
  } catch (error) {
    dispatch(isFetching(false));
    dispatch(updateMessageAndClose({
      body: error.message,
      isActive: true,
      type: 'error',
    }));
  }
});

export const register = () => (async (dispatch, getState) => {
  const { registerForm } = getState();
  dispatch(isFetching(true));
  try {
    const { formObject, hasErrors } = getFormValidationResult(registerForm);
    if (hasErrors) {
      // update form element with errors.
      dispatch(updateRegister(formObject));
      throw new Error(CONTENT_REGISTER_FAIL);
    }
    const registerResponse = await authenticationSubmit(API_PATH, formObject);
    const { error } = await getHTTPResponse(registerResponse);
    if (error) {
      throw new Error(error);
    }
    const { name, ...formObjectLogin } = formObject;
    const { error: fetchError, user, token, expiration } = await loginSubmit(formObjectLogin);
    if (fetchError) {
      throw new Error(fetchError);
    }
    dispatch(dialogRegisterShow(false));
    dispatch(isFetching(false));
    dispatch(receiveUserData({ ...user, expiration }));
    dispatch(receiveUserToken(token));
    if (user.id) {
      dispatch(resetRegister());
    }
    dispatch(updateMessageAndClose({
      body: CONTENT_REGISTER_SUCCESS,
      type: 'success',
    }));
  } catch (error) {
    dispatch(isFetching(false));
    dispatch(updateMessageAndClose({
      body: error.message,
      type: 'error',
    }));
  }
});

export const sendPasswordResetEmail = () => (async (dispatch, getState) => {
  const { passwordResetForm } = getState();
  const { email } = passwordResetForm;
  dispatch(isFetching(true));
  try {
    const { formObject, hasErrors } = getFormValidationResult({ email });
    if (hasErrors) {
      dispatch(updatePasswordReset(formObject));
      throw new Error(CONTENT_PASSWORD_RESET_EMAIL_FAIL);
    }
    const sendPasswordResponse =
      await authenticationSubmit(API_PATH_PASSWORD_RESET_EMAIL, formObject);
    const { error } = await getHTTPResponse(sendPasswordResponse);
    if (error) {
      throw new Error(error);
    }
    dispatch(resetPasswordReset());
    dispatch(isFetching(false));
    dispatch(updateMessageAndClose({
      body: CONTENT_PASSWORD_RESET_EMAIL_SUCCESS,
      type: 'success',
    }));
  } catch (error) {
    dispatch(isFetching(false));
    dispatch(updateMessageAndClose({
      body: error.message,
      type: 'error',
    }));
  }
});

export const updatePassword = accessToken => (async (dispatch, getState) => {
  const { passwordResetForm } = getState();
  const { password } = passwordResetForm;
  dispatch(isFetching(true));
  try {
    const { formObject, hasErrors } = getFormValidationResult({ password });
    if (hasErrors) {
      dispatch(updatePasswordReset(formObject));
      throw new Error(CONTENT_PASSWORD_RESET_FAIL);
    }
    const url = `${API_PATH_PASSWORD_RESET}?access_token=${accessToken}`;
    const updatePasswordResponse = await authenticationSubmit(url, {
      newPassword: password.value,
    });
    const { error } = await getHTTPResponse(updatePasswordResponse);
    if (error) {
      throw new Error(error);
    }
    dispatch(resetPasswordReset());
    dispatch(isFetching(false));
    dispatch(dialogLoginShow(true));
    dispatch(updateMessageAndClose({
      body: CONTENT_PASSWORD_RESET_SUCCESS,
      type: 'success',
    }));
  } catch (error) {
    dispatch(isFetching(false));
    dispatch(updateMessageAndClose({
      body: error.message,
      type: 'error',
    }));
  }
});
