import { createAsyncThunk } from '@reduxjs/toolkit';
import { check, login, registration } from '../../../http/authAPI';

export const fetchAuth = createAsyncThunk(
  'auth/tryAuth',
  async (_, thunkApi) => {
    let user = null;

    try {
      await new Promise((resolve, reject) =>
        setTimeout(() => resolve(2), 2000),
      );
      user = await check();
    } catch (e) {
      return thunkApi.rejectWithValue(1);
    }

    return user;
  },
);

interface LoginData {
  email: string;
  password: string;
}

type RegisterData = LoginData & { name: string };

export const fetchRegister = createAsyncThunk(
  'auth/tryAuth',
  async (data: RegisterData, thunkApi) => {
    const { email, password, name } = data;

    let user = null;

    try {
      user = await registration(email, password, name);
    } catch (e) {
      return thunkApi.rejectWithValue(null);
    }

    return user;
  },
);

export const fetchLogin = createAsyncThunk(
  'auth/tryAuth',
  async (data: LoginData, thunkApi) => {
    const { email, password } = data;

    let user = null;

    try {
      user = await login(email, password);
    } catch (e) {
      return thunkApi.rejectWithValue(null);
    }

    return user;
  },
);
