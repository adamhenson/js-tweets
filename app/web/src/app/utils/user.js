export const isUserExpired = user => new Date(user.expiration) < new Date();
export const getUserFromStore = store =>
  ((!store.authentication || !store.authentication.user || isUserExpired(store.authentication.user))
    ? null
    : store.authentication.user);

export default {
  getUserFromStore,
  isUserExpired,
};
