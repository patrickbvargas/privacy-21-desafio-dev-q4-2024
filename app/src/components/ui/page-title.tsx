import * as React from 'react';
import { cn } from '@/utils';

interface PageTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  title: string;
}
export const PageTitle = ({ title, className, ...props }: PageTitleProps) => {
  return (
    <h2 className={cn('text-2xl font-medium', className)} {...props}>
      {title}
    </h2>
  );
};
