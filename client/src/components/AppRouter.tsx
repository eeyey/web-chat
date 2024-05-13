import React from 'react';

import { Route, Routes } from 'react-router-dom';
import { useAppSelector } from '../redux';

import { authRoutes, publicRoutes } from '../routes';

export const AppRouter = () => {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <Routes>
      {user &&
        authRoutes.map(({ element, path }) => (
          <Route key={path} {...{ element, path }} />
        ))}

      {publicRoutes.map(({ element, path }) => (
        <Route key={path} {...{ element, path }} />
      ))}
    </Routes>
  );
};
