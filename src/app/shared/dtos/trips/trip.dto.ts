import { DriverDto } from '../driver-data/driver.dto';
import { LocationDto } from '../map-data/location.dto';
import { TripEventDto } from './trip-event.dto';

export interface TripDto {
  id: string;
  createdBy: string;
  modifiedBy: string;
  modifiedOn: string;
  isCompleted: boolean;
  externalId: number;
  mainDriver: DriverDto;
  teamDriver: DriverDto | null;
  tripCategory: {
    id: string;
    name?: string;
  };
  nextEvent: TripEventDto;
  finalEvent: TripEventDto;
  location: LocationDto;
  truck: {
    unitNo: string;
    geoPositionAddress: string;
  };
  trailer: {
    unitNo: string;
    geoPositionAddress: string;
  };
  status: {
    id: string;
    name: string;
  };
  pendingActions: {
    // pendingActions is still in progress by BE team, in future they may rename it to "tripAuxiliaries"
    actionType: string;
    details: string;
  }[];
  localStartTime: string | null;
  localFinishTime: string | null;
  startTerminal: {
    id: string;
    name?: string;
  };
  tripRole: {
    id: string;
    name?: string;
  };
  createdOn: string;
  isClosed: boolean;
}
