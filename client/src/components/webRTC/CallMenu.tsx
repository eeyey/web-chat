import classNames from 'classnames';
import React from 'react';
import { useAppDispatch, RTCActions } from '../../redux';

import { MicroOffIcon, PhoneIcon, VideoIcon } from '../icons';

interface CallMenuProps {
  stream: MediaStream | null;
  video: boolean;
}

export const CallMenu: React.FC<CallMenuProps> = (props) => {
  const { stream, video } = props;

  const dispatch = useAppDispatch();

  const toggleVideo = () => {
    if (!stream) return;

    stream.getTracks()[1].enabled = !enableVideo;

    setEnableVideo(!enableVideo);
  };

  const toggleAudio = () => {
    if (!stream) return;

    stream.getTracks()[0].enabled = !enableAudio;

    setEnableAudio(!enableAudio);
  };

  const [enableVideo, setEnableVideo] = React.useState(video);
  const [enableAudio, setEnableAudio] = React.useState(true);

  return (
    <div className="call-menu">
      <button
        onClick={toggleVideo}
        className={classNames('call-button', { active: enableVideo })}
      >
        <VideoIcon />
      </button>
      <button
        onClick={toggleAudio}
        className={classNames('call-button', { active: !enableAudio })}
      >
        <MicroOffIcon />
      </button>
      <button
        onClick={() => dispatch(RTCActions.declineCall())}
        className="call-button button_end"
      >
        <PhoneIcon />
      </button>
    </div>
  );
};
