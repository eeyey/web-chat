import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RTCConnectEvent } from '../../../models/Socket/events';
import { Call, CallStatus, CallType } from '../../../types';
import { socket } from '../../../utils/socket';

interface RTCState {
  call: null | Call;
}

const initialState: RTCState = {
  call: null,
};

export const RTCSlice = createSlice({
  name: 'RTC',
  initialState,
  reducers: {
    initCall: (
      state,
      action: PayloadAction<{ user_id: number; video: boolean }>,
    ) => {
      state.call = {
        type: CallType.CREATED as const,
        status: CallStatus.CALLING,
        user_id: action.payload.user_id,
        video: action.payload.video,
      };
    },
    inviteCall: (state, action: PayloadAction<RTCConnectEvent>) => {
      state.call = {
        type: CallType.ACCEPTED as const,
        status: CallStatus.INVITE,
        user_id: action.payload.user_id,
        description: action.payload.description,
        video: action.payload.video,
      };
    },
    acceptCall: (state) => {
      if (state.call?.type !== CallType.ACCEPTED) return;

      state.call.status = CallStatus.ACCEPTED;
    },
    declineCall: (state) => {
      if (!state.call) return;

      socket.emit('endCall', { user_id: state.call.user_id }); // Передача user_id из-за плохого бекенда.

      state.call = null;
    },
  },
});

export const { reducer: RTCReducer, actions: RTCActions } = RTCSlice;
