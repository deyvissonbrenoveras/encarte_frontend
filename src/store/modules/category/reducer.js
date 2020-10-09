import produce from 'immer';

const INITIAL_STATE = {
  loading: false,
  categories: [],
};
export default function category(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@category/ADD_REQUEST':
      return produce(state, (draft) => {
        draft.loading = true;
      });
    case '@category/UPDATE_REQUEST':
      return produce(state, (draft) => {
        draft.loading = true;
      });
    case '@category/FAILURE':
      return produce(state, (draft) => {
        draft.loading = false;
      });
    default:
      return state;
  }
}
