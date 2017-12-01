export const MESSAGE_IS_ACTIVE = 'MESSAGE_IS_ACTIVE';
export const MESSAGE_UPDATE = 'MESSAGE_UPDATE';
const MESSAGE_ACTIVE_TIME = 4000;

// Synchronous Action Creators
// http://redux.js.org/docs/advanced/AsyncActions.html#synchronous-action-creators
export const messageIsActive = payload => ({
  type: MESSAGE_IS_ACTIVE,
  payload,
});

export const updateMessage = payload => ({
  type: MESSAGE_UPDATE,
  payload,
});

// Async Action Creators
// http://redux.js.org/docs/advanced/AsyncActions.html#async-action-creators
export const updateMessageAndClose = payload => ((dispatch) => {
  dispatch(updateMessage({
    ...payload,
    isActive: true,
  }));
  if (setTimeout) {
    setTimeout(() => dispatch(messageIsActive(false)), MESSAGE_ACTIVE_TIME);
  }
});
