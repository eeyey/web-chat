import React from 'react';

import classNames from 'classnames';

import { NavLink, useParams } from 'react-router-dom';

import { OnlineIcon } from '../../icons';

import { getDialogString } from '../../../utils/date';

import { Dialog } from '../../../types';
import { selectOnline, selectUsers, useAppSelector } from '../../../redux';

interface DialogItemProps {
  dialog: Dialog;
}

export const DialogItem: React.FC<DialogItemProps> = ({ dialog }) => {
  const { id = NaN } = useParams();

  const users = useAppSelector(selectUsers);
  const online = useAppSelector(selectOnline);

  const lastMessage = dialog.messages[dialog.messages.length - 1];
  const user = users.filter((u) => u.id === dialog.id)[0];

  if (!user) return <></>;
  if (!lastMessage) throw Error('Empty dialog');

  const dateString = getDialogString(new Date(+lastMessage.created_at)); // Ошибка бекенда..

  return (
    <li key={dialog.id}>
      <NavLink
        className={classNames('person', { focus: dialog.id === +id })}
        to={`/chat/${dialog.id}`}
      >
        <div className="header">
          <span className="title">
            {user.name}
            {online.includes(user.id) && <OnlineIcon />}
          </span>
          <span className="time">{dateString}</span>
        </div>
        <span className="preview">{lastMessage.text}</span>
      </NavLink>
    </li>
  );
};
