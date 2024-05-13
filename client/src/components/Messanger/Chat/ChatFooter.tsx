import React from 'react';
import { useParams } from 'react-router-dom';
import { selectAuth, useAppSelector } from '../../../redux';
import { socket } from '../../../utils/socket';
import { TelegramIcon } from '../../icons';

export const ChatFooter = () => {
  const { id } = useParams();

  const { user } = useAppSelector(selectAuth);

  if (!user || !id) throw Error('Not auth');

  const textInput = React.useRef<HTMLInputElement | null>(null);

  const submit = () => {
    const text = textInput.current?.value ?? '';

    if (!text.trim().length) return;

    socket.emit('sendMessage', { to: +id, text });

    if (textInput.current) textInput.current.value = '';
  };

  const inputKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') submit();
  };

  return (
    <div className="footer">
      <input
        onKeyDown={inputKeydown}
        ref={textInput}
        type="text"
        placeholder="Type a message..."
      />
      <button type="submit" onClick={submit}>
        <TelegramIcon />
      </button>
    </div>
  );
};
