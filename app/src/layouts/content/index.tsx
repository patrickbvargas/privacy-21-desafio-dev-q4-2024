import * as React from 'react';
import { cn } from '@/utils';

export const Content = ({
  className,
  ...props
}: React.ComponentProps<'main'>) => {
  return <main className={cn('', className)} {...props} />;
};
