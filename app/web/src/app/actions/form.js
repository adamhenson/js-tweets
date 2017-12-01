export const FORM_LOGIN_DIALOG_SHOW = 'FORM_LOGIN_DIALOG_SHOW';
export const FORM_LOGIN_EMAIL_UPDATE = 'FORM_LOGIN_EMAIL_UPDATE';
export const FORM_LOGIN_PASSWORD_UPDATE = 'FORM_LOGIN_PASSWORD_UPDATE';
export const FORM_LOGIN_RESET = 'FORM_LOGIN_RESET';
export const FORM_LOGIN_UPDATE = 'FORM_LOGIN_UPDATE';
export const FORM_PASSWORD_RESET_UPDATE = 'FORM_PASSWORD_RESET_UPDATE';
export const FORM_PASSWORD_RESET_EMAIL_UPDATE = 'FORM_PASSWORD_RESET_EMAIL_UPDATE';
export const FORM_PASSWORD_RESET_PASSWORD_UPDATE = 'FORM_PASSWORD_RESET_PASSWORD_UPDATE';
export const FORM_PASSWORD_RESET_RESET = 'FORM_PASSWORD_RESET_RESET';
export const FORM_REGISTER_DIALOG_SHOW = 'FORM_REGISTER_DIALOG_SHOW';
export const FORM_REGISTER_EMAIL_UPDATE = 'FORM_REGISTER_EMAIL_UPDATE';
export const FORM_REGISTER_NAME_UPDATE = 'FORM_REGISTER_NAME_UPDATE';
export const FORM_REGISTER_PASSWORD_UPDATE = 'FORM_REGISTER_PASSWORD_UPDATE';
export const FORM_REGISTER_RESET = 'FORM_REGISTER_RESET';
export const FORM_REGISTER_UPDATE = 'FORM_REGISTER_UPDATE';

// login
export const dialogLoginShow = payload => ({
  type: FORM_LOGIN_DIALOG_SHOW,
  payload,
});

export const updateLogin = payload => ({
  type: FORM_LOGIN_UPDATE,
  payload,
});

export const updateLoginEmail = payload => ({
  type: FORM_LOGIN_EMAIL_UPDATE,
  payload,
});

export const updateLoginPassword = payload => ({
  type: FORM_LOGIN_PASSWORD_UPDATE,
  payload,
});

export const resetLogin = () => ({
  type: FORM_LOGIN_RESET,
});

// password reset email
export const updatePasswordReset = payload => ({
  type: FORM_PASSWORD_RESET_UPDATE,
  payload,
});

export const updatePasswordResetEmail = payload => ({
  type: FORM_PASSWORD_RESET_EMAIL_UPDATE,
  payload,
});

export const updatePasswordResetPassword = payload => ({
  type: FORM_PASSWORD_RESET_PASSWORD_UPDATE,
  payload,
});

export const resetPasswordReset = () => ({
  type: FORM_PASSWORD_RESET_RESET,
});

// register
export const dialogRegisterShow = payload => ({
  type: FORM_REGISTER_DIALOG_SHOW,
  payload,
});

export const updateRegister = payload => ({
  type: FORM_REGISTER_UPDATE,
  payload,
});

export const updateRegisterEmail = payload => ({
  type: FORM_REGISTER_EMAIL_UPDATE,
  payload,
});

export const updateRegisterName = payload => ({
  type: FORM_REGISTER_NAME_UPDATE,
  payload,
});

export const updateRegisterPassword = payload => ({
  type: FORM_REGISTER_PASSWORD_UPDATE,
  payload,
});

export const resetRegister = () => ({
  type: FORM_REGISTER_RESET,
});
