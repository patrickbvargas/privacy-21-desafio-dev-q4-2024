import * as React from 'react';

interface HeaderProps extends React.ComponentProps<'header'> {
  title: string;
}
export const Header = ({ title = '', ...props }: HeaderProps) => {
  return (
    <header {...props}>
      <h1 className="text-2xl tracking-wider">{title}</h1>
    </header>
  );
};
