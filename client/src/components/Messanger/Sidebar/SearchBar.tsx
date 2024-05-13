import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import { List } from '../../List';
import { SearchIcon } from '../../icons/SearchIcon';
import { selectAuth, selectUsers, useAppSelector } from '../../../redux';
import { UserInfo } from '../UserInfo';

export const SearchBar: React.FC = () => {
  const { user } = useAppSelector(selectAuth);
  const users = useAppSelector(selectUsers);

  const [queryValue, setQueryValue] = useState('');
  const [results, setResults] = useState<typeof users>([]);

  useEffect(() => {
    if (!user) return;

    const filteredUsers = users.filter(
      (u) =>
        u.id !== user.id &&
        (u.name.includes(queryValue) || u.email.includes(queryValue)),
    );
    setResults(filteredUsers);
  }, [queryValue]);

  const handleBlur = () => {
    setTimeout(() => setResults([]), 200);
  };

  return (
    <div className="searchbar">
      <input
        className="searchbar__input"
        placeholder="Search"
        value={queryValue}
        onChange={(e) => setQueryValue(e.target.value)}
        onBlur={handleBlur}
      />
      <SearchIcon />
      <div
        className={classNames('searchbar__results', {
          searchbar__results_show: results.length > 0,
        })}
      >
        <List
          className=""
          items={results}
          render={(user) => (
            <li key={user.id}>
              <NavLink to={`/chat/${user.id}`}>
                <UserInfo user={user} />
              </NavLink>
            </li>
          )}
        />
      </div>
    </div>
  );
};
