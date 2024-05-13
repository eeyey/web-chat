import React from 'react';

import { Navigate } from 'react-router-dom';

import { FormButton, FormInput } from '../../components/UI';
import { fetchRegister, useAppDispatch, useAppSelector } from '../../redux';

import './Auth.scss';

export const RegisterPage = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.auth.user);

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');

  const buttonClickHandler = async (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(fetchRegister({ email, password, name }));
  };

  const inputHandler = (setter: (value: string) => void) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => setter(e.target.value);
  };

  return (
    <div className="form-container">
      {user && <Navigate to="/chat/" />}
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
          onChange={inputHandler(setName)}
          value={name}
          icon="person"
          type="text"
          placeholder="Name"
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
  );
};
