export function loadStoresRequest() {
  return {
    type: '@store/LOAD_STORES_REQUEST',
  };
}
export function loadStoresSuccess(stores) {
  return {
    type: '@store/LOAD_STORES_SUCCESS',
    payload: stores,
  };
}
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
