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
export function updateProductSuccess() {
  return {
    type: '@product/UPDATE_SUCCESS',
  };
}
