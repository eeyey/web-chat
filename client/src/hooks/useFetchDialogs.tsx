import React from 'react';

import {
  fetchDialogs,
  useAppDispatch,
  dialogActions,
  useAppSelector,
} from '../redux';
import { socket } from '../utils/socket';

export const useFetchDialogs = () => {
  const dispatch = useAppDispatch();

  const { status, dialogs } = useAppSelector((state) => state.dialogs);

  React.useEffect(() => {
    dispatch(fetchDialogs());
  }, []);

  React.useEffect(() => {
    socket.on('sendMessage', ({ dialogId, message }) =>
      dispatch(dialogActions.addMessage({ dialogId, message })),
    );
  }, []);

  return { status, dialogs };
};
