import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import { authReducer } from './slices/auth/';
import { dialogReducer } from './slices/dialogs/';
import { RTCReducer } from './slices/RTC';
import { userReducer } from './slices/users';

export const RootReducer = combineReducers({
  auth: authReducer,
  users: userReducer,
  dialogs: dialogReducer,
  RTC: RTCReducer,
});

export const store = configureStore({
  reducer: RootReducer,
});
