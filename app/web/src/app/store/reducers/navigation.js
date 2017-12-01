import {
  NAVIGATION_USER_MENU_IS_ACTIVE,
} from '../../actions/navigation';

const defaultState = {
  isUserMenuActive: false,
};

const navigation = (
  state = { ...defaultState },
  action,
) => {
  switch (action.type) {
    case NAVIGATION_USER_MENU_IS_ACTIVE:
      return {
        ...state,
        isUserMenuActive: action.payload,
      };
    default:
      return state;
  }
};

export default {
  navigation,
};
