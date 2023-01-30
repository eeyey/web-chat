import React from 'react';

import './FormButton.css';

interface FormButtonProps {
  text: string;
}

export const FormButton: React.FC<
  React.HTMLAttributes<HTMLButtonElement> & FormButtonProps
> = (props) => {
  return (
    <div className="form-field">
      <button className="form-btn" {...props}>
        {props.text}
      </button>
    </div>
  );
};
