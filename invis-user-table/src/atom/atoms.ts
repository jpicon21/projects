import { atom } from 'jotai';
import type { AugmentedUser, SortField, SortDirection } from './types';

// City population data (mock data for demonstration)
export const cityPopulations: Record<string, number> = {
  'Gwenborough': 5000,
  'Wisokyburgh': 15000,
  'McKenziehaven': 8000,
  'South Elvis': 25000,
  'Roscoeview': 12000,
  'South Christy': 3000,
  'Howemouth': 18000,
  'Aliyaview': 11000,
  'Bartholomebury': 7000,
  'Lebsackbury': 22000,
};

// Core atoms
export const usersAtom = atom<AugmentedUser[]>([]);
export const loadingAtom = atom<boolean>(true);
export const errorAtom = atom<string | null>(null);

// Sort configuration atoms
export const sortFieldAtom = atom<SortField>('name');
export const sortDirectionAtom = atom<SortDirection>('asc');

// Sort value getters - dynamic to allow adding more fields
const sortValueGetters: Record<SortField, (user: AugmentedUser) => string | number> = {
  name: (user) => user.name.toLowerCase(),
  email: (user) => user.email.toLowerCase(),
  company: (user) => user.company.name.toLowerCase(),
  city: (user) => user.address.city.toLowerCase(),
  website: (user) => user.website.toLowerCase(),
};

// Generic comparison function
const compareValues = (a: string | number, b: string | number, direction: SortDirection): number => {
  if (a < b) return direction === 'asc' ? -1 : 1;
  if (a > b) return direction === 'asc' ? 1 : -1;
  return 0;
};

// Derived atom for sorted users
export const sortedUsersAtom = atom((get) => {
  const users = get(usersAtom);
  const sortField = get(sortFieldAtom);
  const sortDirection = get(sortDirectionAtom);

  const getValue = sortValueGetters[sortField];
  
  return [...users].sort((a, b) => {
    const aVal = getValue(a);
    const bVal = getValue(b);
    return compareValues(aVal, bVal, sortDirection);
  });
});