export function loadUsersRequest() {
  return {
    type: '@user/LOAD_USERS_REQUEST',
  };
}
export function loadUsersSuccess(users) {
  return {
    type: '@user/LOAD_USERS_SUCCESS',
    payload: users,
  };
}
export function updateRequest(id, user, removeStores, addStores) {
  return {
    type: '@user/UPDATE_REQUEST',
    payload: { id, user, removeStores, addStores },
  };
}
export function userFailure() {
  return {
    type: '@user/FAILURE',
  };
}
