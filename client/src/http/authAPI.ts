import jwt_decode from 'jwt-decode';

import { authAPI, publicAPI } from '.';
import { User } from '../types';

export const registration = async (
  email: string,
  password: string,
  name: string,
): Promise<User> => {
  const response = await publicAPI.post<{ token: string }>(
    'api/user/registration',
    { email, password, name },
  );

  localStorage.setItem('token', response.data.token);

  return await jwt_decode(response.data.token);
};

export const login = async (email: string, password: string): Promise<User> => {
  const response = await publicAPI.post<{ token: string }>('/api/user/login', {
    email,
    password,
  });

  localStorage.setItem('token', response.data.token);

  return await jwt_decode(response.data.token);
};

export const check = async (): Promise<User> => {
  const { data } = await authAPI.get('api/user/auth');

  localStorage.setItem('token', data.token);

  return await jwt_decode(data.token);
};
