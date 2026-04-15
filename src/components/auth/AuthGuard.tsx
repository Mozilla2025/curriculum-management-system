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
      // Support both storage key formats for backward compatibility
      const token = localStorage.getItem('accessToken') || localStorage.getItem('auth_token');
      
      // 1. Check if token exists
      if (!token) {
        router.push(`/login?returnUrl=${encodeURIComponent(pathname)}`);
        return;
      }

      try {
        // 2. Decode the JWT payload to get user details
        const payload = JSON.parse(atob(token.split('.')[1]));
        
        // Get user role - handle both single role and roles array
        let userRoles: string[] = [];
        if (Array.isArray(payload.roles)) {
          userRoles = payload.roles;
        } else if (payload.role) {
          userRoles = [payload.role];
        } else if (payload.roles?.[0]) {
          userRoles = [payload.roles[0]];
        }

        // Also check localStorage for backward compatibility
        const storedRole = localStorage.getItem('user_role');
        if (storedRole && !userRoles.includes(storedRole)) {
          userRoles.push(storedRole);
        }

        // 3. If the route requires specific roles, check against the user's roles
        if (allowedRoles && allowedRoles.length > 0) {
          // Normalize roles for comparison (e.g., 'ROLE_ADMIN' vs 'ADMIN')
          const normalizedUserRoles = userRoles.map(role => 
            role.replace('ROLE_', '').toUpperCase()
          );
          const hasRequiredRole = allowedRoles.some(requiredRole => {
            const normalizedRequired = requiredRole.replace('ROLE_', '').toUpperCase();
            return normalizedUserRoles.includes(normalizedRequired);
          });

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