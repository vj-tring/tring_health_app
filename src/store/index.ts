

import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {authReducer} from './features/auth';
import {assetsReducer} from './features/assets';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [''], // Only persist selectedCard state
};

const appReducer = combineReducers({
  auth: authReducer,
  assets: assetsReducer,
});

// Root reducer with state clearing logic
const rootReducer = (state: any, action: any) => {
  if (action.type === 'RESET_APP_STATE') {
    state = undefined; // Clear all state
  }
  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
