import { Location } from '@shared/models/trips/location.model';
export interface Truck {
  truckId: string;
  truckNo: string;
  driverId: string;
  isPowerUnit: string;
  powerUnit: number;
  location: Location;
  status: string;
  unitNo: string;
  vin: string;
  make: string;
  model: string;
  plateNo: string;
  year: string;
  terminal: string;
  class: string;
  division: string;

  vehicleType: string;
  owner: string;
  role: string;
  truckCategory: string;
  satelliteProvider: string;
}
