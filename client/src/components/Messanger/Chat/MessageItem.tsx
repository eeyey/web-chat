import React from 'react';

interface MessageItemProps {
  text: string;
}

export const MessageItem: React.FC<MessageItemProps> = ({ text }) => {
  return <div className="bubble">{text}</div>;
};
