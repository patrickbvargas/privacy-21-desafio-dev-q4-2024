import * as React from 'react';
import { cn } from '@/utils';

interface InfoProps extends React.HTMLAttributes<HTMLParagraphElement> {
  label: string;
  value: string | number;
}

export const Info = ({
  label = '',
  value = '',
  className,
  ...props
}: InfoProps) => {
  return (
    <p className={cn('text-sm mb-4', className)} {...props}>
      <span className="font-semibold">{label}: </span>
      {value}
    </p>
  );
};
