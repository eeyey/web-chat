import React from 'react';

import {
  fetchUsers,
  selectUsers,
  useAppDispatch,
  useAppSelector,
  userActions,
} from '../redux';

import { socket } from '../utils/socket';

export const useFetchUsers = () => {
  const dispatch = useAppDispatch();

  const users = useAppSelector(selectUsers);

  React.useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  React.useEffect(() => {
    socket.on('updateOnline', ({ online: newOnline }) => {
      // Проблема плохого бекенда, что он возвращает весь онлайн.
      // Если пользователь только зарегистрировался, то его нужно добавить.
      const currUsers = users.map((u) => u.id);

      const needUpdate = newOnline.some((id) => !currUsers.includes(id));

      if (needUpdate) dispatch(fetchUsers());

      dispatch(userActions.updateOnline({ online: newOnline }));
    });
  }, []);

  return users;
};
