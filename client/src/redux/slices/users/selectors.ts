import { RootState } from '../../types';

export const selectUsers = (state: RootState) => state.users.users;
export const selectOnline = (state: RootState) => state.users.online;
