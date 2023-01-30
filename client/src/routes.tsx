import React from 'react';

import { Navigate } from 'react-router-dom';

import { ChatPage } from './pages/Chat';
import { LoginPage } from './pages/auth/Login';
import { RegisterPage } from './pages/auth/Register';

export const authRoutes = [
  {
    path: '/chat/:id',
    element: <ChatPage />,
  },
  {
    path: '/chat',
    element: <ChatPage />,
  },
];

export const publicRoutes = [
  {
    path: '/',
    element: <Navigate to="/login" replace={true} />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '*',
    element: <Navigate to="/login" replace={true} state={location.pathname} />,
  },
];
