import React from 'react';
import { useParams } from 'react-router-dom';
import { selectDialogs, useAppSelector } from '../../../redux';

import { MessageItem } from './MessageItem';

export const ChatBody = () => {
  const { id = 0 } = useParams();

  const bodyRef = React.useRef<HTMLDivElement | null>(null);

  const { dialogs } = useAppSelector(selectDialogs);

  const dialog = React.useMemo(() => {
    const dialog = dialogs.filter((dialog) => dialog.id === +id);

    return dialog.length ? dialog[0] : { id: +id, messages: [] };
  }, [dialogs, id]);

  const messageGroups = React.useMemo(() => {
    const messages = dialog.messages;

    const groups: Array<{
      type: 'incoming' | 'outgoing';
      messages: typeof dialog.messages;
    }> = [];

    for (let i = 0; i < messages.length; i++) {
      const message = messages[i];

      const type = message.sender_id === +id ? 'incoming' : 'outgoing';

      const lastGroup = groups[groups.length - 1];

      if (lastGroup && lastGroup.type === type) {
        lastGroup.messages.push(message);
      } else {
        groups.push({ type, messages: [message] });
      }
    }

    return groups;
  }, [dialog.messages.length, id]);

  React.useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTo(0, bodyRef.current.scrollHeight);
    }
  }, [dialog.messages.length, id]);

  return (
    <div className="body" ref={bodyRef}>
      {messageGroups.map((group, i) => (
        <div key={i} className={group.type}>
          {group.messages.map((message) => (
            <MessageItem key={message.id} message={message} />
          ))}
        </div>
      ))}
    </div>
  );
};
