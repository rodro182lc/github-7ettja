import { Terminal } from './terminal.model';
import { Location } from './location.model';

export interface Driver {
  driverId: string;
  driverCode: string;
  role: string;
  truck: string;
  driverName: string;
  truckId: string;
  location: Location;
  status: string;

  class: string;
  division: string;
  currentStatus: string;
  nextCity: string;
  nextLocation: string;
  lastTrip: string;
  lastEvent: string;
  category: string;
  lastLocation: string;
  lastCity: string;
  terminal: Terminal;
}
