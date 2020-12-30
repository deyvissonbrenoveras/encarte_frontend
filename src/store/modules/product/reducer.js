import produce from 'immer';

const INITIAL_STATE = {
  loading: false,
  product: null,
};
export default function product(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@product/ADD_REQUEST':
      return produce(state, (draft) => {
        draft.loading = true;
      });
    case '@product/FAILURE':
      return produce(state, (draft) => {
        draft.loading = false;
      });
    case '@product/UPDATE_REQUEST':
      return produce(state, (draft) => {
        draft.loading = true;
      });
    case '@product/UPDATE_SUCCESS':
      return produce(state, (draft) => {
        draft.loading = false;
      });
    case '@product/LOAD_PRODUCT_REQUEST':
      return produce(state, (draft) => {
        draft.loading = true;
      });
    case '@product/LOAD_PRODUCT_SUCCESS':
      return produce(state, (draft) => {
        draft.product = action.payload.product;
        draft.loading = false;
      });
    case '@product/DISASSOCIATE_PRODUCTS_REQUEST':
      return produce(state, (draft) => {
        draft.loading = true;
      });
    default:
      return state;
  }
}
