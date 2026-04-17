'use client';

import React, { ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastProvider } from '@/contexts/ToastContext';
import { useGlobalInterceptor } from '@/hooks/useGlobalInterceptor';

function InterceptorSetup({ children }: { children: ReactNode }) {
  useGlobalInterceptor();
  return <>{children}</>;
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
            gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <InterceptorSetup>
          {children}
        </InterceptorSetup>
      </ToastProvider>
    </QueryClientProvider>
  );
}