import { QueryClient, QueryCache, MutationCache } from '@tanstack/react-query';
import { toast } from 'sonner';

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error: any) => {
      const status = error?.status || error?.statusCode;
      if (status === 401) {
        // Handled by Axios Interceptors
      } else if (status === 403) {
        toast.error('Permission Denied (403): You cannot access this query data.');
      } else if (status === 429) {
        toast.warning('Rate Limit Exceeded (429): Retrying automatically shortly.');
      } else if (status >= 500) {
        toast.error('Server Communication Error (500): Please check back shortly.');
      }
    },
  }),
  mutationCache: new MutationCache({
    onError: (error: any) => {
      const status = error?.status || error?.statusCode;
      if (status === 403) {
        toast.error('Action Forbidden (403): You do not have permission to execute this operation.');
      } else if (status === 429) {
        toast.warning('Too Many Requests (429): Action throttled. Please wait a moment.');
      }
    },
  }),
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
      networkMode: 'always',
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: false,
      networkMode: 'online',
    },
  },
});
