import React from 'react';

import { CallMenu } from './CallMenu';

import {
  selectCall,
  useAppDispatch,
  useAppSelector,
  RTCActions,
} from '../../redux';

import { iceServers } from './iceServers';
import { socket } from '../../utils/socket';

import { CallType } from '../../types';

export const CallWindow = () => {
  const call = useAppSelector(selectCall);

  const dispatch = useAppDispatch();

  const peerConnection = React.useRef(new RTCPeerConnection(iceServers));

  const localVideo = React.useRef<HTMLVideoElement>(null);
  const remoteVideo = React.useRef<HTMLVideoElement>(null);

  const [mediaStream, setMediaStream] = React.useState<MediaStream | null>(
    null,
  );

  if (!call) throw Error('Not calling ');

  const video = call.video;

  React.useEffect(() => {
    async function startCapture() {
      if (!call) return;

      const connection = peerConnection.current;

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      setMediaStream(stream);

      connection.addTrack(stream.getTracks()[0], stream); // AudioStream
      connection.addTrack(stream.getTracks()[1], stream); // VideoStream

      stream.getTracks()[1].enabled = video;

      if (localVideo.current) {
        localVideo.current.srcObject = stream;
      }

      connection.onicecandidate = (e) => {
        if (e.candidate) {
          socket.emit('icecandidate', {
            user_id: call.user_id,
            candidate: e.candidate,
          });
        }
      };

      let tracksNumber = 0;
      connection.ontrack = (e) => {
        if (!e.streams) return;

        tracksNumber++;

        if (tracksNumber === 2) {
          if (remoteVideo.current) {
            remoteVideo.current.srcObject = e.streams[0];
          }
        }
      };

      socket.on('icecandidate', ({ candidate }) => {
        connection.addIceCandidate(new RTCIceCandidate(candidate));
      });

      if (call.type === CallType.CREATED) {
        connection.createOffer().then((description) => {
          connection.setLocalDescription(description);

          socket.emit('RTCConnect', {
            user_id: call.user_id,
            description,
            video,
          });
        });

        socket.on('RTCConnect', ({ description }) => {
          connection.setRemoteDescription(description);
        });
      } else {
        await connection.setRemoteDescription(call.description);

        connection.createAnswer().then((description) => {
          connection.setLocalDescription(description);

          socket.emit('RTCConnect', {
            user_id: call.user_id,
            description,
            video,
          });
        });
      }
    }

    startCapture();
  }, []);

  React.useEffect(() => {
    peerConnection.current.onconnectionstatechange = (e) => {
      if (peerConnection.current.connectionState === 'disconnected') {
        dispatch(RTCActions.declineCall());
      }
    };
  }, []);

  return (
    <div className="call-wrapper">
      <div className="call-window">
        <CallMenu stream={mediaStream} video={video} />
        <video ref={localVideo} id="local-video" autoPlay muted></video>
        <video ref={remoteVideo} id="remote-video" autoPlay></video>
      </div>
    </div>
  );
};
