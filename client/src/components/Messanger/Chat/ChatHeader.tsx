import React from 'react';

import { useParams } from 'react-router-dom';

import { PhoneIcon, VideoIcon } from '../../icons';

import {
  selectUsers,
  useAppDispatch,
  useAppSelector,
  RTCActions,
} from '../../../redux';
import { UserInfo } from '../UserInfo';

export const ChatHeader = () => {
  const { id: user_id = 0 } = useParams();

  const dispatch = useAppDispatch();

  const users = useAppSelector(selectUsers);

  const user = users.filter((u) => u.id === +user_id)[0];

  if (!user) throw Error('Cant find user ');

  const initCall = (video: boolean) => {
    dispatch(RTCActions.initCall({ user_id: +user_id, video }));
  };

  return (
    <div className="header">
      <UserInfo user={user} />
      <div className="menu">
        <div className="icons">
          <PhoneIcon onClick={initCall.bind(this, false)} />
          <VideoIcon onClick={initCall.bind(this, true)} />
        </div>
      </div>
    </div>
  );
};
