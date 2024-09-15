import * as React from 'react';
import { AppRoutes } from '@/routes';
import { Toaster } from '@/components/ui/sonner';

export const Content = ({ ...props }: React.ComponentProps<'main'>) => {
  return (
    <main className="flex flex-col" {...props}>
      <AppRoutes />
      <Toaster />
    </main>
  );
};
