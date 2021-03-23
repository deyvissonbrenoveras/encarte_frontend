import produce from 'immer';
import { formatPrice } from '../../../util/format';

const INITIAL_STATE = {
  cart: [],
};
export default function cart(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@cart/ADD_PRODUCT':
      return produce(state, (draft) => {
        const { storeId, product, amount } = action.payload;
        const store = draft.cart.filter((crt) => crt.storeId === storeId)[0];
        if (store) {
          const productExists = store.products.filter(
            (prod) => prod.id === product.id
          )[0];
          if (productExists) {
            productExists.amount += amount;
            productExists.total = formatPrice(
              productExists.price * productExists.amount
            );
          } else {
            store.products.push({
              ...product,
              amount,
              total: formatPrice(product.price * amount),
            });
          }
        } else {
          draft.cart.push({
            storeId,
            products: [
              {
                ...product,
                amount,
                total: formatPrice(product.price * amount),
              },
            ],
          });
        }
      });
    case '@cart/REMOVE_PRODUCT':
      return produce(state, (draft) => {
        const { storeId, productId } = action.payload;
        const store = draft.cart.filter((crt) => crt.storeId === storeId)[0];
        store.products = store.products.filter(
          (product) => product.id !== productId
        );
      });
    case '@cart/CHANGE_AMOUNT':
      return produce(state, (draft) => {
        const { storeId, productId, amount } = action.payload;
        const store = draft.cart.filter((crt) => crt.storeId === storeId)[0];
        if (store) {
          const productExists = store.products.filter(
            (prod) => prod.id === productId
          )[0];
          if (productExists) {
            if (amount >= 1 && amount <= 500) {
              productExists.amount = amount;
              productExists.total = formatPrice(productExists.price * amount);
            }
          }
        }
      });
    case '@cart/CLEAR':
      return produce(state, (draft) => {
        const { storeId } = action.payload;
        const store = draft.cart.filter((crt) => crt.storeId === storeId)[0];
        store.products = [];
      });
    default:
      return state;
  }
}
