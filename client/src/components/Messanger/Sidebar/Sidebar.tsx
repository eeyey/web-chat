import React from 'react';

import { DialogItem } from './DialogItem';
import { Profile } from '../../Profile';
import { List } from '../../List';

import { useFetchDialogs } from '../../../hooks';
import { selectAuth, useAppSelector } from '../../../redux';
import { SearchBar } from './SearchBar';

export const Sidebar = () => {
  const { dialogs } = useFetchDialogs();
  const { user } = useAppSelector(selectAuth);

  if (!user) throw Error('Unauth');

  return (
    <div className="sidebar">
      <Profile user={user} />
      <SearchBar />
      <List
        className="dialogs"
        items={dialogs}
        render={(dialog) => <DialogItem key={dialog.id} dialog={dialog} />}
      />
    </div>
  );
};
