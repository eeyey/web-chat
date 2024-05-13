import React from 'react';

import { Navigate, useLocation } from 'react-router-dom';

import { FormInput } from '../../components/UI/FormInput';
import { FormButton } from '../../components/UI/FormButton';

import { fetchLogin, useAppDispatch, useAppSelector } from '../../redux';

import './Auth.scss';

const redirectMask = /\/chat\/[0-9]+($|\/)/;

export const LoginPage = () => {
  const { state: savedPath } = useLocation();

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const submit = async (email: string, password: string) => {
    dispatch(fetchLogin({ email, password }));
  };

  const buttonClickHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    submit(email, password);
  };

  const inputHandler = (setter: (value: string) => void) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => setter(e.target.value);
  };

  return (
    <>
      {user && (
        <Navigate to={redirectMask.test(savedPath) ? savedPath : '/chat/'} />
      )}
      <div className="form-container">
        <form>
          <FormInput
            onChange={inputHandler(setEmail)}
            value={email}
            icon="person"
            type="email"
            placeholder="Email"
            required
          />
          <FormInput
            onChange={inputHandler(setPassword)}
            value={password}
            icon="lock"
            type="password"
            placeholder="Password"
            required
          />
          <FormButton text="Войти" onClick={buttonClickHandler} />
        </form>
      </div>
    </>
  );
};
