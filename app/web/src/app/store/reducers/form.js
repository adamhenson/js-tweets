import {
  FORM_LOGIN_DIALOG_SHOW,
  FORM_LOGIN_EMAIL_UPDATE,
  FORM_LOGIN_PASSWORD_UPDATE,
  FORM_LOGIN_RESET,
  FORM_LOGIN_UPDATE,
  FORM_PASSWORD_RESET_UPDATE,
  FORM_PASSWORD_RESET_EMAIL_UPDATE,
  FORM_PASSWORD_RESET_PASSWORD_UPDATE,
  FORM_PASSWORD_RESET_RESET,
  FORM_REGISTER_DIALOG_SHOW,
  FORM_REGISTER_EMAIL_UPDATE,
  FORM_REGISTER_NAME_UPDATE,
  FORM_REGISTER_PASSWORD_UPDATE,
  FORM_REGISTER_RESET,
  FORM_REGISTER_UPDATE,
} from '../../actions/form';

const defaultState = {
  email: {
    error: null,
    value: '',
  },
  password: {
    error: null,
    value: '',
  },
};

const defaultEmailState = {
  ...defaultState,
  isLoginDialogShown: false,
};

const loginForm = (
  state = { ...defaultEmailState },
  action,
) => {
  switch (action.type) {
    case FORM_LOGIN_DIALOG_SHOW:
      return {
        ...state,
        isLoginDialogShown: action.payload,
      };
    case FORM_LOGIN_UPDATE:
      return {
        ...state,
        ...action.payload,
      };
    case FORM_LOGIN_EMAIL_UPDATE:
      return {
        ...state,
        email: action.payload,
      };
    case FORM_LOGIN_PASSWORD_UPDATE:
      return {
        ...state,
        password: action.payload,
      };
    case FORM_LOGIN_RESET:
      return {
        ...defaultEmailState,
      };
    default:
      return state;
  }
};

const passwordResetForm = (
  state = { ...defaultState },
  action,
) => {
  switch (action.type) {
    case FORM_PASSWORD_RESET_UPDATE:
      return {
        ...state,
        ...action.payload,
      };
    case FORM_PASSWORD_RESET_EMAIL_UPDATE:
      return {
        ...state,
        email: action.payload,
      };
    case FORM_PASSWORD_RESET_PASSWORD_UPDATE:
      return {
        ...state,
        password: action.payload,
      };
    case FORM_PASSWORD_RESET_RESET:
      return {
        ...defaultState,
      };
    default:
      return state;
  }
};

const defaultRegisterState = {
  ...defaultState,
  isRegisterDialogShown: false,
  name: {
    error: null,
    value: '',
  },
};

const registerForm = (
  state = { ...defaultRegisterState },
  action,
) => {
  switch (action.type) {
    case FORM_REGISTER_DIALOG_SHOW:
      return {
        ...state,
        isRegisterDialogShown: action.payload,
      };
    case FORM_REGISTER_EMAIL_UPDATE:
      return {
        ...state,
        email: action.payload,
      };
    case FORM_REGISTER_NAME_UPDATE:
      return {
        ...state,
        name: action.payload,
      };
    case FORM_REGISTER_PASSWORD_UPDATE:
      return {
        ...state,
        password: action.payload,
      };
    case FORM_REGISTER_RESET:
      return {
        ...defaultRegisterState,
      };
    case FORM_REGISTER_UPDATE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default {
  loginForm,
  passwordResetForm,
  registerForm,
};
