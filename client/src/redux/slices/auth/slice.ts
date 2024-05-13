import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../../types';

interface AuthState {
  isLoading: boolean;
  user: User | null;
}

const initialState: AuthState = {
  user: null,
  isLoading: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    'auth/tryAuth/pending': (state) => {
      state.isLoading = true;
    },
    'auth/tryAuth/fulfilled': (state, action: PayloadAction<User | null>) => {
      state.isLoading = false;
      state.user = action.payload;
    },
    'auth/tryAuth/rejected': (state) => {
      state.user = null;
      state.isLoading = false;
    },
  },
});

export const authReducer = authSlice.reducer;
