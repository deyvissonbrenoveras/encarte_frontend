import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default (reducers) => {
  const persistedReducer = persistReducer(
    {
      key: 'e-ncarte',
      storage,
      whitelist: ['auth', 'profile', 'cart'],
    },
    reducers
  );
  return persistedReducer;
};
