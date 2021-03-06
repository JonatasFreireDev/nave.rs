import { configureStore } from '@reduxjs/toolkit';

import userReducer from './user.store';
import naversReducer from './navers.store';

const store = configureStore({
  reducer: {
    user: userReducer,
    navers: naversReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
