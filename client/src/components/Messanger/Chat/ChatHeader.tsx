import React from 'react';

import { useParams } from 'react-router-dom';

import { AvatarIcon, PhoneIcon, VideoIcon } from '../../icons';
import { OnlineIcon } from '../../icons/OnlineIcon';

import {
  selectOnline,
  selectUsers,
  useAppDispatch,
  useAppSelector,
  RTCActions,
} from '../../../redux';

export const ChatHeader = () => {
  const { id: user_id = 0 } = useParams();

  const dispatch = useAppDispatch();

  const users = useAppSelector(selectUsers);
  const online = useAppSelector(selectOnline);

  const user = users.filter((u) => u.id === +user_id)[0];

  if (!user) throw Error('Cant find user ');

  const initCall = (video: boolean) => {
    dispatch(RTCActions.initCall({ user_id: +user_id, video }));
  };

  return (
    <div className="header">
      <div className="user-info">
        <AvatarIcon letter={user.name[0]} />
        <div className="name">
          {user.name}
          {online.includes(user.id) && <OnlineIcon />}
        </div>
      </div>
      <div className="menu">
        <div className="icons">
          {/* <PhoneIcon onClick={initCall.bind(this, false)} /> */}
          <VideoIcon onClick={initCall.bind(this, true)} />
        </div>
      </div>
    </div>
  );
};
