import produce from 'immer';

const INITIAL_STATE = {
  products: [],
};
export default function cart(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@cart/ADD_PRODUCT':
      return produce(state, (draft) => {
        const productIndex = draft.products.findIndex(
          (p) => p.id === action.payload.id
        );
        if (productIndex >= 0) {
          draft.products[productIndex].amount += 1;
        } else {
          draft.products.push({
            ...action.payload,
            amount: 1,
          });
        }
      });
    default:
      return state;
  }
}
