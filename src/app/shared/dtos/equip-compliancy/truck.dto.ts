import { LocationDto } from '../map-data/location.dto';

export interface TruckDto {
  id: string;
  isRowDeleted: boolean;
  createdBy: string;
  createdAt: Date;
  updatedBy: string;
  updatedAt: Date;
  externalId: number;
  unitNo: string;
  vin: string;
  class: string;
  powerUnit: number;
  satelliteProvider: string;
  make: string;
  model: string;
  modelYear: number;
  licensePlate: string;
  odometer: number;
  truckStatusId: string;
  truckStateId: string;
  truckCategoryId: string;
  currentLocationId: string;
  ownerDriverId: string;
  divisionId: string;
  ownerTerminalId: string;
  truckRoleId: string;
  truckStatus: {
    id: string;
    isRowDeleted: boolean;
    createdBy: string;
    createdAt: Date;
    updatedBy: string;
    updatedAt: Date;
    name: string;
  };
  truckState: {
    id: string;
    isRowDeleted: boolean;
    createdBy: string;
    createdAt: Date;
    updatedBy: string;
    updatedAt: Date;
    name: string;
  };
  truckCategory: {
    id: string;
    isRowDeleted: boolean;
    createdBy: string;
    createdAt: Date;
    updatedBy: string;
    updatedAt: Date;
    externalId: number;
    name: string;
  };
  currentLocation: LocationDto;
  division: {
    id: string;
    externalId: number;
    name: string;
    code: string;
    locationId: string;
  };
  ownerTerminal: {
    id: string;
    externalId: number;
    name: string;
    locationId: string;
  };
  truckType: {
    createdOn: string;
    externalId: string;
    name: string;
    id: string;
  };
  ownerDriver: {
    id: string;
    externalId: number;
    drvCode: string;
    firstName: string;
    lastName: string;
    class: string;
    location: {
      id: string;
      externalId: number;
      name: string;
      address1: string;
      address2: string;
      city: string;
      lat: number;
      lon: number;
      jurisdictionId: string;
      geolocationExt: string;
    };
    driverCategoryId: string;
    driverStatusId: string;
    driverRoleId: string;
    truckId: string;
    locationId: string;
  };
  truckRole: {
    id: string;
    isRowDeleted: boolean;
    createdBy: string;
    createdAt: Date;
    updatedBy: string;
    updatedAt: Date;
    name: string;
  };
}
