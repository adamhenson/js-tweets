import {
  MESSAGE_IS_ACTIVE,
  MESSAGE_UPDATE,
} from '../../actions/message';

const defaultState = {
  body: '',
  isActive: false,
  type: null,
};

const message = (
  state = { ...defaultState },
  action,
) => {
  switch (action.type) {
    case MESSAGE_IS_ACTIVE:
      return {
        ...state,
        isActive: action.payload,
      };
    case MESSAGE_UPDATE:
      return {
        ...state,
        body: action.payload.body || { ...state }.body,
        isActive: (typeof action.payload.isActive !== 'undefined')
          ? action.payload.isActive
          : { ...state }.isActive,
        type: action.payload.type || { ...state }.type,
      };
    default:
      return state;
  }
};

export default {
  message,
};
