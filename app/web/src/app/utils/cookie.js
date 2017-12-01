const getDecodedColonString = string => string.replace('%3A', ':');
const getStringAfterColon = (string) => {
  const [, stringAfterColon] = string.split(':');
  return stringAfterColon;
};

/** used to handle store from 'redux-persist'.
 * @param {Object} cookies - cookie object from HTTP request.
 * @example
 * {
 *   reduxPersistIndex: '["reduxPersist:authentication"]',
 *   'reduxPersist%3Aauthentication': '{"isLoginDialogShown":true,"isRegisterDialogShown":false}'
 * }
 *
 * @returns {Object} cookieReduxState - a Redux state object.
 * @example
 * {
 *   authentication: {"isLoginDialogShown":true,"isRegisterDialogShown":false}
 * }
 *
 */
export const cookieReduxState = (cookies) => {
  try {
    const cookieReduxPersistIndexes = !cookies.reduxPersistIndex
      ? []
      : JSON.parse(cookies.reduxPersistIndex);

    return Object.assign(
      {},
      ...Object
        .keys(cookies)
        .filter((key) => {
          const formattedKey = getDecodedColonString(key);
          return cookieReduxPersistIndexes.indexOf(formattedKey) > -1
            && getStringAfterColon(formattedKey);
        })
        .map((key) => {
          const formattedKey = key.replace('%3A', ':');
          return {
            [getStringAfterColon(formattedKey)]: JSON.parse(cookies[key]),
          };
        }),
    );
  } catch (error) {
    // @todo: better logging.
    // eslint-disable-next-line no-console
    console.log(`cookieReduxState(): ${error}`);
    return {};
  }
};

export default {
  cookieReduxState,
};
