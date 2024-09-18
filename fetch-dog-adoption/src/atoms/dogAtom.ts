import { atom } from 'jotai';
import axios from 'axios';

export interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

export const dogsAtom = atom<Dog[]>([]);

export interface SearchParams {
  breeds?: string[];
  zipCodes?: string[];
  ageMin?: number | null;
  ageMax?: number | null;
  size?: number;
  from?: number;
  sort?: string;
}

interface SearchResponse {
  resultIds: string[];
  total: number;
}

export const searchDogsAtom = atom(
  null,
  async (_, set, searchParams: SearchParams) => {
    try {
      const cleanedParams = Object.fromEntries(
        Object.entries(searchParams).filter(([, v]) => v != null)
      );
      const searchResponse = await axios.get<SearchResponse>('https://frontend-take-home-service.fetch.com/dogs/search', {
        params: cleanedParams,
        withCredentials: true,
      });
      const dogIds = searchResponse.data.resultIds;
      const dogsResponse = await axios.post<Dog[]>('https://frontend-take-home-service.fetch.com/dogs', dogIds, { withCredentials: true });
      set(dogsAtom, dogsResponse.data);
      return searchResponse.data.total;
    } catch (error) {
      console.error('Error searching dogs:', error);
      return 0;
    }
  }
);