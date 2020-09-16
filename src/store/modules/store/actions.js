export function addStoreRequest(store) {
  return {
    type: '@store/ADD_REQUEST',
    payload: store,
  };
}
export function addStoreSuccess(store) {
  return {
    type: '@store/ADD_SUCCESS',
    payload: store,
  };
}

export function storeFailure() {
  return {
    type: '@store/FAILURE',
  };
}
