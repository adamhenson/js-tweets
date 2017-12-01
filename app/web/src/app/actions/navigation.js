export const NAVIGATION_USER_MENU_IS_ACTIVE = 'NAVIGATION_USER_MENU_IS_ACTIVE';

// Synchronous Action Creators
// http://redux.js.org/docs/advanced/AsyncActions.html#synchronous-action-creators
export const userMenuIsActive = payload => ({
  type: NAVIGATION_USER_MENU_IS_ACTIVE,
  payload,
});
