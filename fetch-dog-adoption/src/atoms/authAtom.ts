import { atom } from 'jotai';
import axios from 'axios';

export const isAuthenticatedAtom = atom<boolean>(false);
export const userAtom = atom<{ name: string; email: string } | null>(null);

export const logoutAtom = atom(
  null,
  async (_, set) => {
    try {
      await axios.post('https://frontend-take-home-service.fetch.com/auth/logout', {}, { withCredentials: true });
      set(isAuthenticatedAtom, false);
      set(userAtom, null);
    } catch (error) {
      console.error('Logout failed', error);
    }
  }
);