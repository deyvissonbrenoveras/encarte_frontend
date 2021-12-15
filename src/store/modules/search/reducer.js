import produce from 'immer';

const INITIAL_STATE = {
  search: '',
};
export default function search(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@search/UPDATE':
      return produce(state, (draft) => {
        draft.search = action.payload.search;
      });
    default:
      return state;
  }
}
