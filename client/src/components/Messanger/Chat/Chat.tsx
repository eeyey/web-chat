import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../../redux';

import { ChatBody } from './ChatBody';
import { ChatEmpty } from './ChatEmpty';
import { ChatFooter } from './ChatFooter';
import { ChatHeader } from './ChatHeader';

export const Chat = () => {
  const { id } = useParams();

  const users = useAppSelector((state) => state.users.users);

  const showChat = id && users.some((user) => user.id === +id);

  return (
    <div className="chatbox">
      {showChat && (
        <React.Fragment>
          <ChatHeader />
          <ChatBody />
          <ChatFooter />
        </React.Fragment>
      )}
      {!showChat && <ChatEmpty />}
    </div>
  );
};
