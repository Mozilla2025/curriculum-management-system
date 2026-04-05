'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { axiosClient } from '@/lib/api/axiosClient';
import { useToast } from '@/contexts/ToastContext';

export function useGlobalInterceptor() {
  const { addToast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const responseInterceptor = axiosClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response) {
          const status = error.response.status;
          const data = error.response.data;
          const errorMessage = data?.message || 'An unexpected error occurred';

          if (status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
              const refreshToken = localStorage.getItem('refreshToken');
              if (refreshToken) {
                const res = await axiosClient.post('/auth/refresh-token', { refreshToken });
                localStorage.setItem('accessToken', res.data.accessToken);
                originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;
                return axiosClient(originalRequest);
              }
              throw new Error('No refresh token');
            } catch (refreshError) {
              localStorage.removeItem('accessToken');
              localStorage.removeItem('refreshToken');
              addToast({
                type: 'error',
                title: 'Session Expired',
                message: 'Please log in again to continue.',
              });
              router.push('/login');
              return Promise.reject(refreshError);
            }
          }

          if (status === 403) {
            addToast({
              type: 'error',
              title: 'Access Denied',
              message: 'You do not have permission to perform this action.',
            });
          } else if (status === 400) {
            addToast({
              type: 'warning',
              title: 'Validation Error',
              message: errorMessage,
            });
          } else if (status >= 500) {
            addToast({
              type: 'error',
              title: 'Server Error',
              message: 'Our systems are experiencing issues. Please try again later.',
            });
          } else if (status !== 401) {
            addToast({
              type: 'error',
              title: 'Error',
              message: errorMessage,
            });
          }
        } else if (error.request) {
          addToast({
            type: 'error',
            title: 'Network Error',
            message: 'Unable to connect to the server. Please check your internet connection.',
          });
        }

        return Promise.reject(error);
      }
    );

    const requestInterceptor = axiosClient.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('accessToken');
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      axiosClient.interceptors.response.eject(responseInterceptor);
      axiosClient.interceptors.request.eject(requestInterceptor);
    };
  }, [addToast, router]);
}