// hooks/useAuth.ts
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  email: string;
  name: string;
}

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    try {
      const token = localStorage.getItem('auth-token');
      const userData = localStorage.getItem('user');
      
      if (token && userData) {
        setIsAuthenticated(true);
        setUser(JSON.parse(userData));
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = (token: string, userData: User) => {
    localStorage.setItem('auth-token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData);
    router.push('/dashboard');
  };

  const logout = () => {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    router.push('/auth/signin');
  };

  const signup = (token: string, userData: User) => {
    localStorage.setItem('auth-token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData);
    router.push('/');
  };

  return {
    isAuthenticated,
    isLoading,
    user,
    login,
    logout,
    signup,
    checkAuthStatus
  };
}