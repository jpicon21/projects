// src/atoms.ts
import { atom } from 'jotai';

export const formStateAtom = atom({
  propertyAddress: '',
  city: '',
  county: '',
  zipCode: '',
  assessorParcelNumber: '',
  purchasePrice: '',
  closeOfEscrow: ''
});

export interface Home {
  last_sold_date: string;
  sold_price: string;
  price_per_sqft: string;
  primary_photo: string;
  street: string;
  beds: string;
  full_baths: string;
  half_baths: string;
}

export type SetDataCallback = (data: []) => void;

export const searchAddressAtom = atom<string>('2651 Union St');
export const homesDataAtom = atom([]);

