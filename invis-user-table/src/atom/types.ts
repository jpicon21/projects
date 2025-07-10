export interface Geo {
  lat: string;
  lng: string;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export interface AugmentedUser extends User {
  population: number;
}

export type SortField = 'name' | 'email' | 'company' | 'city' | 'website';
export type SortDirection = 'asc' | 'desc';

export interface ColumnConfig<T = AugmentedUser> {
  field: SortField;
  label: string;
  render?: (user: T) => React.ReactNode;
  className?: string;
}