export enum CallStatus {
  ACCEPTED = 'ACCEPTED',
  CALLING = 'CALLING',
  INVITE = 'INVITE',
}

export enum CallType {
  CREATED = 'CREATED',
  ACCEPTED = 'ACCEPTED',
}

export interface CreatedCall {
  status: CallStatus;
  user_id: number;
  video: boolean;
  type: CallType.CREATED;
}
export interface AcceptedCall {
  status: CallStatus;
  user_id: number;
  video: boolean;
  type: CallType.ACCEPTED;
  description: RTCSessionDescriptionInit;
}

export type Call = CreatedCall | AcceptedCall;

export interface User {
  id: number;
  email: string;
  name: string;
}

export interface Message {
  id: number;
  receiver_id: number;
  sender_id: number;
  text: string;
  updated_at: number;
  created_at: number;
}

export interface Dialog {
  id: number;
  messages: Message[];
}
