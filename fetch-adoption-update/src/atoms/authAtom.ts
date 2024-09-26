import { atom } from 'jotai';

export interface User {
  name: string;
  email: string;
}

export interface LoginCredentials {
  name: string;
  email: string;
}

export const isAuthenticatedAtom = atom(false);
export const userAtom = atom<User | null>(null);

export const loginUser = async (credentials: LoginCredentials): Promise<User> => {
  const response = await fetch('https://frontend-take-home-service.fetch.com/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
    credentials: 'include'
  });
  
  if (!response.ok) {
    throw new Error('Login failed');
  }
  
  return credentials;
};

export const logoutUser = async (): Promise<void> => {
  const response = await fetch('https://frontend-take-home-service.fetch.com/auth/logout', {
    method: 'POST',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Logout failed');
  }
};