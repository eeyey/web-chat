import React from 'react';

import { Profile } from '../Profile';

import {
  selectCall,
  selectUsers,
  useAppDispatch,
  useAppSelector,
  RTCActions,
} from '../../redux';

export const CallOffer = () => {
  const call = useAppSelector(selectCall);
  const users = useAppSelector(selectUsers);

  if (!call) throw Error('Cant get call');

  const user = users.filter((user) => user.id === call.user_id)[0];

  if (!user) return <></>;

  const dispatch = useAppDispatch();

  return (
    <div className="call-offer">
      <Profile user={user} />
      <div className="offer-menu">
        <button
          className={'offer-button accept'}
          onClick={() => dispatch(RTCActions.acceptCall())}
        >
          Принять
        </button>
        <button
          className={'offer-button decline  '}
          onClick={() => dispatch(RTCActions.declineCall())}
        >
          Отклонить
        </button>
      </div>
    </div>
  );
};
