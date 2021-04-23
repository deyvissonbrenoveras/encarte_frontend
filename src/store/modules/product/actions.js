export function addProductRequest(product, successCb) {
  return {
    type: '@product/ADD_REQUEST',
    payload: product,
    successCb,
  };
}

export function productFailure() {
  return {
    type: '@product/FAILURE',
  };
}

export function updateProductRequest(
  id,
  product,
  removeStores,
  addStores,
  removePartners,
  addPartners
) {
  return {
    type: '@product/UPDATE_REQUEST',
    payload: {
      id,
      product,
      removeStores,
      addStores,
      removePartners,
      addPartners,
    },
  };
}

export function disassociateProductsFromStore(storeId, products, successCb) {
  return {
    type: '@product/DISASSOCIATE_PRODUCTS_REQUEST',
    payload: { storeId, products, successCb },
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
