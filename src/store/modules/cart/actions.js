export function addProduct(product) {
  return {
    type: '@cart/ADD_PRODUCT',
    payload: product,
  };
}

export function removeProduct(id) {
  return {
    type: '@cart/REMOVE_PRODUCT',
    payload: id,
  };
}

export function changeAmount(id, amount) {
  return {
    type: '@cart/CHANGE_AMOUNT',
    payload: { id, amount },
  };
}
