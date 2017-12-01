import {
  AUTHENTICATION_IS_FETCHING,
  AUTHENTICATION_LOGOUT,
  AUTHENTICATION_REQUEST_USER_DATA,
  AUTHENTICATION_RECEIVE_USER_DATA,
  AUTHENTICATION_RECEIVE_USER_TOKEN,
} from '../../actions/authentication';

const defaultState = {
  isFetching: false,
  token: '',
  user: null,
};

const authentication = (
  state = { ...defaultState },
  action,
) => {
  switch (action.type) {
    case AUTHENTICATION_IS_FETCHING:
      return {
        ...state,
        isFetching: action.payload,
      };
    case AUTHENTICATION_LOGOUT:
      return {
        ...defaultState,
      };
    case AUTHENTICATION_REQUEST_USER_DATA:
      return {
        ...state,
      };
    case AUTHENTICATION_RECEIVE_USER_DATA:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
        lastUpdated: action.receivedAt,
      };
    case AUTHENTICATION_RECEIVE_USER_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    default:
      return state;
  }
};

export default {
  authentication,
};
