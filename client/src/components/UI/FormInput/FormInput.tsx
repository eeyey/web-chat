import classNames from 'classnames';
import React from 'react';

import './FormInput.css';

interface FormInputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  icon: 'person' | 'lock';
}

export const FormInput: React.FC<
  FormInputProps & React.ComponentPropsWithoutRef<'input'>
> = (props) => {
  return (
    <div className={classNames('form-field', `form-field_${props.icon}`)}>
      <input className="form-input" {...props} />
    </div>
  );
};
