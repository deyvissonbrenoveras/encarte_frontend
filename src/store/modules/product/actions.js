export function addProductRequest(product) {
  return {
    type: '@product/ADD_REQUEST',
    payload: product,
  };
}

export function productFailure() {
  return {
    type: '@product/FAILURE',
  };
}

export function updateProductRequest(id, product, removeStores, addStores) {
  return {
    type: '@product/UPDATE_REQUEST',
    payload: { id, product, removeStores, addStores },
  };
}

export function loadRequest(id) {
  return {
    type: '@product/LOAD_PRODUCT_REQUEST',
    payload: { id },
  };
}
export function loadSuccess(product) {
  return {
    type: '@product/LOAD_PRODUCT_SUCCESS',
    payload: { product },
  };
}
