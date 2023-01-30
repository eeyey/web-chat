export interface IcecandidateEmit {
  user_id: number;
  candidate: RTCIceCandidate;
}

export interface SendMessageEmit {
  to: number;
  text: string;
}

export interface EndCallEmit {
  user_id: number; // Из-за плохого бекенда.
}
