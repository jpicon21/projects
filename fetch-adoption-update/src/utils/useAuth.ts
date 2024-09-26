import { useAtom } from 'jotai';
import { useState, useCallback } from 'react';
import { isAuthenticatedAtom, userAtom } from '../atoms/atoms';
import { LoginCredentials, loginUser, logoutUser } from '../atoms/authAtom';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
  const [user, setUser] = useAtom(userAtom);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const login = useCallback(async (credentials: LoginCredentials, onSuccess?: () => void) => {
    setIsLoading(true);
    setError(null);
    try {
      const user = await loginUser(credentials);
      setIsAuthenticated(true);
      setUser(user);
      if (onSuccess) {
        onSuccess();
      }
      return user;
    } catch (e) {
      setError(e instanceof Error ? e : new Error('An unknown error occurred'));
      throw e;
    } finally {
      setIsLoading(false);
    }
  }, [setIsAuthenticated, setUser]);

  const logout = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      await logoutUser();
      setIsAuthenticated(false);
      setUser(null);
    } catch (e) {
      setError(e instanceof Error ? e : new Error('An unknown error occurred'));
      throw e;
    } finally {
      setIsLoading(false);
    }
  }, [setIsAuthenticated, setUser]);

  return { isAuthenticated, user, login, logout, isLoading, error };
};