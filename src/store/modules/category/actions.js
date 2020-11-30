export function addCategoryRequest(category, successCb) {
  return {
    type: '@category/ADD_REQUEST',
    payload: category,
    successCb,
  };
}
export function updateCategoryRequest(id, category) {
  return {
    type: '@category/UPDATE_REQUEST',
    payload: { id, category },
  };
}
export function categoryFailure() {
  return {
    type: '@category/FAILURE',
  };
}
