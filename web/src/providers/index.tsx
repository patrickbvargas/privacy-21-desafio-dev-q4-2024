import { QueryProvider } from './tanstack-query';

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  return <QueryProvider>{children}</QueryProvider>;
};
