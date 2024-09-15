import * as React from 'react';
import { cn } from '@/utils';

export const Container = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        'grid grid-rows-[auto_1fr] gap-4 h-screen w-full max-w-[80rem] mx-auto overflow-hidden p-8',
        'bg-gray-50 text-gray-700',
        'dark:bg-neutral-900 dark:text-neutral-300',
        className,
      )}
      {...props}
    />
  );
};
