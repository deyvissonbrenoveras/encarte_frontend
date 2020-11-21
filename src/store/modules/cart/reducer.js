import produce from 'immer';
import { formatPrice } from '../../../util/format';

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
            total: formatPrice(action.payload.price),
          });
        }
      });
    case '@cart/REMOVE_PRODUCT':
      return produce(state, (draft) => {
        draft.products = draft.products.filter(
          (product) => product.id !== action.payload
        );
      });
    case '@cart/CHANGE_AMOUNT':
      return produce(state, (draft) => {
        const product = draft.products.filter(
          (prod) => prod.id === action.payload.id
        )[0];
        if (product) {
          const { amount } = action.payload;
          if (amount >= 1 && amount <= 500) {
            product.amount = amount;
            product.total = formatPrice(product.price * amount);
          }
        }
      });
    default:
      return state;
  }
}
