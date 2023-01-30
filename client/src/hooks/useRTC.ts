import React from 'react';

import { useAppDispatch, useAppSelector, RTCActions } from '../redux';

import { RTCConnectEvent, Subscriber } from '../models/Socket/types';
import { socket } from '../utils/socket';

export const useRTC = () => {
  const call = useAppSelector((state) => state.RTC.call);
  const dispatch = useAppDispatch();

  const { declineCall, inviteCall } = RTCActions;

  const [RTCConSub, setRTCConSub] =
    React.useState<Subscriber<'RTCConnect'> | null>();

  // remove observer when user calls
  React.useEffect(() => {
    const conSub = (data: RTCConnectEvent) => {
      dispatch(inviteCall(data));
    };

    if (call) {
      if (RTCConSub) socket.remove('RTCConnect', RTCConSub);

      setRTCConSub(null);
    } else {
      socket?.on('RTCConnect', conSub);

      setRTCConSub(() => conSub);
    }
  }, [call]);

  React.useEffect(() => {
    socket.on('endCall', () => dispatch(declineCall()));
  }, []);

  return call;
};
