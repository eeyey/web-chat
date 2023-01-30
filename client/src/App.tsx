import React from 'react';

import { AppRouter } from './components/AppRouter';
import { PageLoader } from './components/UI/PageLoader';

import { fetchAuth, useAppDispatch, useAppSelector } from './redux';

export function App() {
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector((state) => state.auth.isLoading);

  React.useEffect(() => {
    dispatch(fetchAuth());
  }, []);

  return (
    <>
      {isLoading && <PageLoader />}
      <AppRouter />
    </>
  );
}
