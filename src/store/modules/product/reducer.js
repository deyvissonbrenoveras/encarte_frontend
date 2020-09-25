import produce from 'immer';

const INITIAL_STATE = {
  loading: false,
};
export default function store(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@product/ADD_REQUEST':
      return produce(state, (draft) => {
        draft.loading = true;
      });
    case '@product/FAILURE':
      return produce(state, (draft) => {
        draft.loading = false;
      });
    default:
      return state;
  }
}
