import { RootReducer, store } from './store';

export type RootState = ReturnType<typeof RootReducer>;
export type AppDispatch = typeof store.dispatch;
