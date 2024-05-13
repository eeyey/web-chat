import React from 'react';
import { Message } from '../../../types';
import { getHM } from '../../../utils/date';

interface MessageItemProps {
  message: Message;
}

export const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  return (
    <div className="bubble">
      {message.text}
      <div className="bubble__timestamp">
        {getHM(new Date(+message.created_at))}
      </div>
    </div>
  );
};
