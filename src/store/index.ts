import { configureStore } from '@reduxjs/toolkit';

import themeReducer from './theme.store';
import userReducer from './user.store';

const store = configureStore({
  reducer: {
    user: userReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
