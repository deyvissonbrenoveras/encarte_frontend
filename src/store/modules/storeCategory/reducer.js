import produce from 'immer';

const INITIAL_STATE = {
  loading: false,
  cityCategory: [],
  stateCategory: [],
};
export default function store(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@storeCategory/LOAD_CITY_CATEGORY':
      return produce(state, (draft) => {
        draft.cityCategory = action.payload;
        draft.loading = false;
      });
    case '@storeCategory/LOAD_STATE_CATEGORY':
      return produce(state, (draft) => {
        draft.stateCategory = action.payload;
        draft.loading = false;
      });
    case '@storeCategory/FAILURE':
      return produce(state, (draft) => {
        draft.loading = false;
      });
    default:
      return state;
  }
}
