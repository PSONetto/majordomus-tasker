import React from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PrimeReactProvider } from 'primereact/api';

import { AuthProvider } from './contexts/auth/AuthContext.tsx';
import AppRoutes from './routes/Routes.tsx';

const queryClient = new QueryClient();

export function MyApp() {
  return (
    <React.StrictMode>
      <PrimeReactProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </QueryClientProvider>
      </PrimeReactProvider>
    </React.StrictMode>
  );
}
