import React from 'react';

import { AvatarIcon } from './icons';

import { User } from '../types';

interface ProfileProps {
  user: User;
}

export const Profile: React.FC<ProfileProps> = ({ user }) => {
  return (
    <div className="profile">
      <AvatarIcon letter={user.name.charAt(0)} />
      <div className="name2">
        {user.name}
        <p className="email">{user.email}</p>
      </div>
    </div>
  );
};
