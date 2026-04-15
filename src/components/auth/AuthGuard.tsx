'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/contexts/ToastContext';

interface AuthGuardProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

export default function AuthGuard({ children, allowedRoles }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { addToast } = useToast();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('accessToken');
      
      // 1. Check if token exists
      if (!token) {
        router.push(`/login?returnUrl=${encodeURIComponent(pathname)}`);
        return;
      }

      try {
        // 2. Decode the JWT payload to get user details (Role is usually stored here by Spring Boot)
        const payload = JSON.parse(atob(token.split('.')[1]));
        const userRole = payload.role || payload.roles?.[0] || localStorage.getItem('userRole');

        // 3. If the route requires specific roles, check against the user's role
        if (allowedRoles && allowedRoles.length > 0) {
          // Normalize roles for comparison (e.g., 'ROLE_ADMIN' vs 'ADMIN')
          const normalizedUserRole = userRole?.replace('ROLE_', '').toUpperCase();
          const hasRequiredRole = allowedRoles.some(
            role => role.replace('ROLE_', '').toUpperCase() === normalizedUserRole
          );

          if (!hasRequiredRole) {
            addToast({
              type: 'error',
              title: 'Access Denied',
              message: 'You do not have the required permissions to view this page.'
            });
            // Kick normal users back to their dashboard if they snoop
            router.replace('/user/dashboard');
            return;
          }
        }

        setIsAuthorized(true);
      } catch (error) {
        // If token is malformed, clear it and force login
        localStorage.removeItem('accessToken');
        router.push('/login');
      }
    };

    checkAuth();
  }, [router, pathname, allowedRoles, addToast]);

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <Loader2 className="w-10 h-10 text-must-green animate-spin mb-4" />
        <p className="text-gray-500 font-medium animate-pulse">Verifying access rights...</p>
      </div>
    );
  }

  return <>{children}</>;
}