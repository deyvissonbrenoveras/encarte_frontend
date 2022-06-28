import produce from 'immer';

const INITIAL_STATE = {
  loading: false,
  stores: [],
  cities: []
};
export default function city(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@city/LOAD_STORES_SUCCESS':
      return produce(state, (draft) => {
        draft.cities = action.payload;
        draft.loading = true;
      });
    case '@city/LIST_CITIES_REQUEST':
      return produce(state, (draft) => {
        draft.loading = false;
      });
    case '@city/FAILURE':
      return produce(state, (draft) => {
        draft.loading = false;
      });
    default:
      return state;
  }
}
