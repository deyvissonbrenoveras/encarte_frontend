import produce from 'immer';

const INITIAL_STATE = {
  loading: false,
  partners: [],
};
export default function partner(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@partner/ADD_REQUEST':
      return produce(state, (draft) => {
        draft.loading = true;
      });
    case '@partner/UPDATE_REQUEST':
      return produce(state, (draft) => {
        draft.loading = true;
      });
    case '@partner/FAILURE':
      return produce(state, (draft) => {
        draft.loading = false;
      });
    case '@partner/DISASSOCIATE_PRODUCTS_REQUEST':
      return produce(state, (draft) => {
        draft.loading = true;
      });
    default:
      return state;
  }
}
