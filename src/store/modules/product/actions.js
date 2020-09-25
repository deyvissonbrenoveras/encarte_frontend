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
