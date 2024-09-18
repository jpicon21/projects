import { atom } from 'jotai';

export interface SearchFilters {
  breeds: string[];
  zipCodes: string[];
  ageMin: number | null;
  ageMax: number | null;
}

export interface SortOption {
  field: 'breed' | 'name' | 'age';
  direction: 'asc' | 'desc';
}

export const searchFiltersAtom = atom<SearchFilters>({
  breeds: [],
  zipCodes: [],
  ageMin: null,
  ageMax: null,
});

export const sortOptionAtom = atom<SortOption>({ field: 'breed', direction: 'asc' });
export const pageAtom = atom(1);
export const pageSizeAtom = atom(25);
export const favoritesAtom = atom<string[]>([]);
export const searchTermAtom = atom<string>('');