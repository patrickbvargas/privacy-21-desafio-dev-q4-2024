import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { QUERY_STALE_TIME_IN_SECONDS } from '@/constants/query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: QUERY_STALE_TIME_IN_SECONDS * 1000,
    },
  },
});

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
