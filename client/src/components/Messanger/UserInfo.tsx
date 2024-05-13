import React from 'react';

import { AvatarIcon, OnlineIcon } from '../icons';

import { selectOnline, useAppSelector } from '../../redux';
import { User } from '../../types';

export const UserInfo: React.FC<{ user: User }> = ({ user }) => {
  const online = useAppSelector(selectOnline);

  return (
    <div className="user-info">
      <AvatarIcon letter={user.name[0]} />
      <div className="name">
        {user.name}
        {online.includes(user.id) && <OnlineIcon />}
      </div>
    </div>
  );
};
