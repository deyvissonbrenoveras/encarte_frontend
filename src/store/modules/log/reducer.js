import produce from 'immer';

const INITIAL_STATE = {
  loading: false,
  logs: [],
};

export default function store(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@log/LOAG_LOGS_REQUEST':
      return produce(state, (draft) => {
        draft.loading = true;
      });
    case '@log/LOAD_LOGS_SUCCESS':
      return produce(state, (draft) => {
        draft.logs = action.payload;
        draft.loading = false;
      });
    case '@log/FAILURE':
      return produce(state, (draft) => {
        draft.loading = false;
      });
    default:
      return state;
  }
}
