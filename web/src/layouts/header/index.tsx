import * as React from 'react';
export const Header = ({ ...props }: React.ComponentProps<'header'>) => {
  return (
    <header {...props}>
      <a href="/loans">
        <h1 className="text-3xl tracking-wider mb-4">Privacy21 Demo</h1>
      </a>
      <hr className="border-neutral-300" />
    </header>
  );
};
