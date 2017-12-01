import {
  CONTENT_VALIDATION_EMAIL_INVALID,
  CONTENT_VALIDATION_NUMBER_INVALID,
  CONTENT_VALIDATION_NAME_REQUIRED,
  CONTENT_VALIDATION_PASSWORD_REQUIRED,
} from '../content';

const EMAIL = 'email';
const NAME = 'name';
const PASSWORD = 'password';

export const getEmailError = (email) => {
  const regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const isValid = regEx.test(email);
  return (isValid)
    ? false
    : CONTENT_VALIDATION_EMAIL_INVALID;
};

// @TODO: add validation logic
export const getNameError = name => (
  (name)
    ? false
    : CONTENT_VALIDATION_NAME_REQUIRED
);

export const getNumberError = input => (
  (/^-?\d+(?:\.\d+)?$/.test(input))
    ? false
    : CONTENT_VALIDATION_NUMBER_INVALID
);

// @TODO: add validation logic
export const getPasswordError = password => (
  (password)
    ? false
    : CONTENT_VALIDATION_PASSWORD_REQUIRED
);

const validations = {
  [EMAIL]: getEmailError,
  [NAME]: getNameError,
  [PASSWORD]: getPasswordError,
};

const getFormErrorObject = (fields) => {
  let hasErrors = false;
  const formObject = Object.keys(fields).reduce((fieldKeys, field) => {
    const value = fields[field].value;
    const fieldKeyObject = { ...fieldKeys };

    fieldKeyObject[field] = {
      value,
    };

    if (validations[field]) {
      const error = validations[field](value);
      if (error) {
        hasErrors = true;
        fieldKeyObject[field].error = error;
      }
    }

    return fieldKeyObject;
  }, {});

  return {
    formObject,
    hasErrors,
  };
};

export const getFormValidationResult = (fields) => {
  const formObjectWithErrors = getFormErrorObject(fields);

  if (formObjectWithErrors.hasErrors) {
    return formObjectWithErrors;
  }

  const formObject = Object.keys(fields).reduce((fieldKeys, field) => {
    const fieldKeyObject = { ...fieldKeys };
    fieldKeyObject[field] = fields[field].value;
    return fieldKeyObject;
  }, {});

  return {
    formObject,
    hasErrors: false,
  };
};
