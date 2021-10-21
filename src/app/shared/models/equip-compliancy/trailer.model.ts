import { Location } from '@shared/models/trips/location.model';
export interface Trailer {
  trailerId: string;
  trailerNo: string;
  location: Location;
  status: string;
  unitNo: string;
  vin: string;
  make: string;
  model: string;
  year: string;
  terminal: string;
  class: string;
  division: string;
  plateNo: string;
  vehicleType: string;
  trailerCategory: string;
  trailerNoWithLoadState: string;
  loadState: string;
}
