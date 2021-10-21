import { TruckDto } from '../equip-compliancy/truck.dto';
import { LocationDto } from '../map-data/location.dto';
import { TerminalDto } from '../trips/terminal.dto';

export interface DriverDto {
  driverTruck?: {
    id: string;
    unitNo: string;
  };
  driverStatus?: {
    name: string;
  };

  driverCategory?: {
    name: string;
  };

  driverRole?: {
    name: string;
  };

  division?: {
    name: string;
  };

  id: string;
  externalId?: number;
  drvCode?: string;
  firstName?: string;
  lastName?: string;
  class?: string;
  truck?: TruckDto;
  location?: LocationDto;
  driverCategoryId?: string;
  driverStatusId?: string;
  driverRoleId?: string;

  truckId?: string;
  locationId?: string;
  hos?: number; // BE team still to define what data type this property will be, can be number/Date
  terminal?: TerminalDto;
}
