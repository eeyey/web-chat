import React from 'react';

import { Messanger } from '../../components/Messanger/Messanger';
import { CallWindow, CallOffer } from '../../components/webRTC/';

import { useRTC } from '../../hooks/useRTC';

import { socket } from '../../utils/socket';
import { CallStatus } from '../../types';

import './Chat.scss';
import './Call.scss';

export const ChatPage = () => {
  const call = useRTC();

  React.useEffect(() => {
    socket.emit('connect');
  }, []);

  return (
    <>
      {call?.status === CallStatus.INVITE && <CallOffer />}
      {call && call?.status !== CallStatus.INVITE && <CallWindow />}
      <Messanger />
    </>
  );
};
