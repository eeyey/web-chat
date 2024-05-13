import { createAsyncThunk } from '@reduxjs/toolkit';
import { authAPI } from '../../../http';
import { Dialog } from '../../../types';

export const fetchDialogs = createAsyncThunk(
  'fetchDialogs',
  async (_, thunkApi) => {
    try {
      const response = await authAPI.get<Dialog[]>('/api/chat/getDialogs');

      return response.data;
    } catch (e) {
      if (e instanceof Error) {
        return thunkApi.rejectWithValue(e.message);
      }
      return thunkApi.rejectWithValue('Проищошла ошибка..');
    }
  },
);
