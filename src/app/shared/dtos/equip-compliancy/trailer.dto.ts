import { TrailerLoadStateDto } from './trailer-load-state.dto';
export interface TrailerDto {
  id: string;
  isRowDeleted: boolean;
  createdBy: string;
  createdAt: Date;
  updatedBy: string;
  updatedAt: Date;
  externalId: number;
  unitNo: string;
  state: string;
  class: string;
  vin: string;
  make: string;
  model: string;
  modelYear: number;
  licensePlate: string;
  trailerStatusId: string;
  trailerCategoryId: string;
  trailerTypeId: string;
  currentLocationId: string;
  contractId: number;
  terminalId: string;
  trailerStatus: {
    id: string;
    isRowDeleted: boolean;
    createdBy: string;
    createdAt: Date;
    updatedBy: string;
    updatedAt: Date;
    name: string;
  };
  trailerCategory: {
    id: string;
    isRowDeleted: number;
    createdBy: string;
    createdAt: Date;
    updatedBy: string;
    updatedAt: Date;
    externalId: number;
    name: string;
  };
  ownerTerminal: {
    id: string;
    externalId: number;
    name: string;
    locationId: string;
  };
  division: {
    id: string;
    externalId: number;
    name: string;
    code: string;
    locationId: string;
  };
  trailerType: {
    id: string;
    isRowDeleted: number;
    createdBy: string;
    createdAt: Date;
    updatedBy: string;
    updatedAt: Date;
    externalId: number;
    name: string;
  };
  currentLocation: {
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
  terminal: {
    id: string;
    externalId: number;
    name: string;
    locationId: string;
  };
  trailerLoadState: TrailerLoadStateDto;
  geoPositionLat: number;
  geoPositionLon: number;
  geoPositionAddress: string;
  geoPositionDate: Date;
}
