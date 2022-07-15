export function loadCitiesRequest() {
  return {
    type: '@city/LIST_CITIES_REQUEST',
  };
}
export function loadCitiesActiveRequest() {
  return {
    type: '@city/LIST_CITIES_ACTIVE_REQUEST',
  };
}
export function loadCitiesActiveSuccess(cities) {
  return {
    type: '@city/LOAD_CITIES_ACTIVE_SUCCESS',
    payload: cities,
  };
}
export function loadCitiesSuccess(cities) {
  return {
    type: '@city/LOAD_CITIES_SUCCESS',
    payload: cities,
  };
}
export function cityFailure() {
  return {
    type: '@city/FAILURE',
  };
}
