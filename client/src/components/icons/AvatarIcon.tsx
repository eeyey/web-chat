import React from 'react';

interface AvatarIconProps {
  letter: string;
}

export const AvatarIcon: React.FC<
  AvatarIconProps & React.ComponentPropsWithoutRef<'div'>
> = ({ letter }) => {
  return (
    <div className="avatar">
      <p>{letter.toUpperCase()}</p>
    </div>
  );
};
