import { Message } from '../../types';

export interface ConnectEvent {
  prop: number;
}

export interface SendMessageEvent {
  message: Message;
  dialogId: number;
}

export interface UpdateOnlineEvent {
  online: number[];
}

export interface RTCConnectEvent {
  user_id: number;
  video: boolean;
  description: RTCSessionDescriptionInit;
}

export interface IcecandidateEvent {
  candidate: RTCIceCandidate;
}

export interface EndCallEvent {
  user_id: number;
}
