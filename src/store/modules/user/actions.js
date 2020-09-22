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
export function userFailure() {
  return {
    type: '@user/FAILURE',
  };
}
