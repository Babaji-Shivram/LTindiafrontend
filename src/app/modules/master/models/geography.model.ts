export interface Country {
  id: number;
  code: string;
  name: string;
  currency: string;
  timeZone: string;
  status: 'Active' | 'Inactive';
  createdAt: string;
  updatedAt: string;
}

export interface State {
  id: number;
  code: string;
  name: string;
  countryId: number;
  countryName: string;
  status: 'Active' | 'Inactive';
  createdAt: string;
  updatedAt: string;
}

export interface City {
  id: number;
  name: string;
  stateId: number;
  stateName: string;
  countryId: number;
  countryName: string;
  pincode: string;
  status: 'Active' | 'Inactive';
  createdAt: string;
  updatedAt: string;
}
