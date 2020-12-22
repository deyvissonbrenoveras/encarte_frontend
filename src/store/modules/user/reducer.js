import produce from 'immer';

const INITIAL_STATE = {
  users: [],
  loading: false,
};
export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@user/LOAD_USERS_REQUEST':
      return produce(state, (draft) => {
        draft.loading = true;
      });
    case '@user/LOAD_USERS_SUCCESS':
      return produce(state, (draft) => {
        draft.users = action.payload;
        draft.loading = false;
      });
    case '@user/FAILURE':
      return produce(state, (draft) => {
        draft.loading = false;
      });
    default:
      return state;
  }
}
