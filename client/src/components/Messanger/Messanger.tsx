import React from 'react';
import { useFetchUsers } from '../../hooks/useFetchUsers';

import { Chat } from './Chat';
import { Sidebar } from './Sidebar';

export const Messanger = () => {
  useFetchUsers();

  return (
    <div className="messanger-container">
      <div className="messanger">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
};
