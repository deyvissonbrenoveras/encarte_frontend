export function addCategoryRequest(category) {
  return {
    type: '@category/ADD_REQUEST',
    payload: category,
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
