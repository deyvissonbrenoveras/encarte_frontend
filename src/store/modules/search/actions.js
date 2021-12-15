export function updateSearch(search) {
  return {
    type: '@search/UPDATE',
    payload: { search },
  };
}
