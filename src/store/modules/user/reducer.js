import produce from 'immer';

const INITIAL_STATE = {
  profile: null,
  users: [],
  loading: false,
};
export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@auth/SIGN_IN_SUCCESS':
      return produce(state, (draft) => {
        draft.profile = action.payload.user;
      });
    case '@auth/SIGN_OUT':
      return produce(state, (draft) => {
        draft.profile = null;
      });
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
