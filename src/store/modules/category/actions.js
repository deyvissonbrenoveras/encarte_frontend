export function addCategoryRequest(category) {
  return {
    type: '@category/ADD_REQUEST',
    payload: category,
  };
}
export function categoryFailure() {
  return {
    type: '@category/FAILURE',
  };
}
