import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../../types';
import { fetchUsers } from './asyncActions';

type StateStatus = 'loading' | 'error' | 'success' | 'updating';

interface UserState {
  users: User[];
  online: number[];
  status: StateStatus;
}

const initialState: UserState = {
  users: [],
  online: [],
  status: 'success',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateOnline: (state, action: PayloadAction<{ online: number[] }>) => {
      state.online = action.payload.online;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state, action) => {
        // Попытка отличить первую загрузку от данных от апдейта.
        if (state.status === 'success' && !state.users.length) {
          state.status = 'updating';
        } else {
          state.status = 'loading';
        }
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.status = 'success';
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'error';
      });
  },
});

export const { reducer: userReducer, actions: userActions } = userSlice;
