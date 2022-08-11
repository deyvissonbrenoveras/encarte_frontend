export function addCityCategory(values) {
  return {
    type: '@storeCategory/ADD_CITY_CATEGORY',
    payload: values,
  };
}
export function addStateCategory(values) {
  return {
    type: '@storeCategory/ADD_STATE_CATEGORY',
    payload: values,
  };
}
export function loadCityCategory(values) {
  return {
    type: '@storeCategory/LOAD_CITY_CATEGORY',
    payload: values,
  };
}
export function loadStateCategory(values) {
  return {
    type: '@storeCategory/LOAD_STATE_CATEGORY',
    payload: values,
  };
}

export function storeCategoryFailure() {
  return {
    type: '@storeCategory/FAILURE',
  };
}
