import { IcecandidateEmit, SendMessageEmit } from './emits';

import {
  ConnectEvent,
  EndCallEvent,
  IcecandidateEvent,
  RTCConnectEvent,
  SendMessageEvent,
  UpdateOnlineEvent,
} from './events';

interface EventMap {
  connect: ConnectEvent;
  sendMessage: SendMessageEvent;
  updateOnline: UpdateOnlineEvent;
  RTCConnect: RTCConnectEvent;
  icecandidate: IcecandidateEvent;
  endCall: EndCallEvent;
}

interface EmitMap {
  connect: ConnectEvent;
  sendMessage: SendMessageEmit;
  updateOnline: UpdateOnlineEvent;
  RTCConnect: RTCConnectEvent;
  icecandidate: IcecandidateEmit;
  endCall: EndCallEvent;
}

export type EventType = keyof EventMap;
export type EmitType = keyof EmitMap;

export type EventData<E extends EventType> = EventMap[E];
export type EmitData<E extends EmitType> = EmitMap[E];

export type Subscriber<E extends EventType> = (data: EventData<E>) => void;
export type EmitHandler<E extends EmitType> = (data: EmitData<E>) => void;

export * from './emits';
export * from './events';
