'use client';

import React, { ReactNode } from 'react';
import { ToastProvider } from '@/contexts/ToastContext';
import { useGlobalInterceptor } from '@/hooks/useGlobalInterceptor';

function InterceptorSetup({ children }: { children: ReactNode }) {
  useGlobalInterceptor();
  return <>{children}</>;
}

export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      <InterceptorSetup>
        {children}
      </InterceptorSetup>
    </ToastProvider>
  );
}