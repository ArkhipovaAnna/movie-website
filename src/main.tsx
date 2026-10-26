import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './app/App.tsx';
import { ApiError } from './shared/api/client.ts';
import { ZodError } from 'zod';

const NO_RETRY_STATUSES = [402, 404, 429];
const MAX_RETRIES = 1;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        if (error instanceof ZodError) return false;
        if (error instanceof ApiError && NO_RETRY_STATUSES.includes(error.status)) {
          return false;
        }
        return failureCount < MAX_RETRIES;
      },
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
