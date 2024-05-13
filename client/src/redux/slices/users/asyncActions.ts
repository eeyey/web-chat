import { createAsyncThunk } from '@reduxjs/toolkit';
import { authAPI } from '../../../http';
import { User } from '../../../types';

export const fetchUsers = createAsyncThunk(
  'fetchUsers',
  async (_, thunkApi) => {
    try {
      const response = await authAPI.get<User[]>('/api/chat/getUsers');

      return response.data;
    } catch (e) {
      return thunkApi.rejectWithValue('Не удалось получить пользователей.');
    }
  },
);
