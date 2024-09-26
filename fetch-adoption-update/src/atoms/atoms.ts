import { atom } from 'jotai';
import { atomWithQuery } from 'jotai-tanstack-query';

// Types
interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

interface SearchParams {
  breeds?: string[];
  zipCodes?: string[];
  ageMin?: number;
  ageMax?: number;
  size?: number;
  from?: number;
  sort?: string;
}

interface User {
  name: string;
  email: string;
}

// Auth atoms
export const isAuthenticatedAtom = atom<boolean>(false);
export const userAtom = atom<User | null>(null);

// Search params atom
export const searchParamsAtom = atom<SearchParams>({
  breeds: [],
  zipCodes: [],
  ageMin: undefined,
  ageMax: undefined,
  size: 25,
  from: 0,
  sort: 'breed:asc',
});

// Favorites atom
export const favoritesAtom = atom<string[]>([]);
export const generateMatchTriggerAtom = atom(0);

// API functions
const searchDogs = async (params: SearchParams): Promise<string[]> => {
  const response = await fetch('https://frontend-take-home-service.fetch.com/dogs/search', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  const data = await response.json();
  return data.resultIds;
};

const getDogs = async (ids: string[]): Promise<Dog[]> => {
  const response = await fetch('https://frontend-take-home-service.fetch.com/dogs', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(ids),
  });
  return response.json();
};

const generateMatch = async (favoriteIds: string[]): Promise<string> => {
  const response = await fetch('https://frontend-take-home-service.fetch.com/dogs/match', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(favoriteIds),
  });
  const data = await response.json();
  return data.match;
};

const fetchBreeds = async (): Promise<string[]> => {
  const response = await fetch('https://frontend-take-home-service.fetch.com/dogs/breeds', {
    credentials: 'include',
  });
  if (!response.ok) throw new Error('Failed to fetch breeds');
  return response.json();
};

// Query atoms
export const generateMatchAtom = atomWithQuery((get) => ({
  queryKey: ['generateMatch', get(favoritesAtom), get(generateMatchTriggerAtom)],
  queryFn: () => generateMatch(get(favoritesAtom)),
  enabled: get(favoritesAtom).length > 0,
}));

export const breedsAtom = atomWithQuery(() => ({
  queryKey: ['breeds'],
  queryFn: fetchBreeds,
}));

export const searchResultsAtom = atomWithQuery((get) => ({
  queryKey: ['dogSearch', get(searchParamsAtom)],
  queryFn: () => searchDogs(get(searchParamsAtom)),
}));

export const searchResultsDataAtom = atom((get) => {
  const result = get(searchResultsAtom);
  return result.data ?? [];
});

export const dogsAtom = atomWithQuery((get) => ({
  queryKey: ['dogs', get(searchResultsDataAtom)],
  queryFn: () => getDogs(get(searchResultsDataAtom)),
  enabled: get(searchResultsDataAtom).length > 0,
}));

export const favoriteDogsAtom = atomWithQuery((get) => ({
  queryKey: ['favoriteDogs', get(favoritesAtom)],
  queryFn: () => getDogs(get(favoritesAtom)),
  enabled: get(favoritesAtom).length > 0,
}));