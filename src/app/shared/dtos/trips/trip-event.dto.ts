import { LocationDto } from '../map-data/location.dto';
import { ProbillDetailsDto } from './probill-details.dto';

export interface TripEventDto {
  id: string;
  externalId: number;
  eventType: {
    id: string;
    name: string;
    description: string;
    createdOn: string;
    createdBy: string;
    modifiedOn: string;
    modifiedBy: string;
    isRowDeleted: boolean;
  };
  tripId: string;
  contractId: number;
  sequenceId: number;
  location: LocationDto;
  miles: number;
  truck: {
    id: string;
    unitNo: string;
    powerUnit: number;
    truckCategoryId: string;
  };
  trailer: {
    id: string;
    unitNo: string;
    trailerCategoryId: string;
  };
  probill: ProbillDetailsDto;
  tripNotes: {
    id: string;
    createdOn: string;
    createdBy: string;
    modifiedOn: string;
    modifiedBy: string;
    isRowDeleted: boolean;
    tripId: string;
    note: {
      id: string;
      createdOn: string;
      createdBy: string;
      modifiedOn: string;
      modifiedBy: string;
      isRowDeleted: boolean;
      note: string;
      noteTypeId: string;
    };
  };
  scheduledDate: string;
  etAdate: string;
  localEtaDate: string | null;
  currentLocationDate: string | null;
  localStartTime: string | null;
  localFinishTime: string | null;
  eventLogStatus: {
    id: string;
    createdOn: string;
    createdBy: string;
    modifiedOn: string;
    modifiedBy: string;
    isRowDeleted: boolean;
    name: string;
  };
  estDuration: string;
  stagings: [
    {
      attributeName: string;
      externalId: number;
      referenceType: string;
    }
  ];
  createdOn: string;
  createdBy: string;
  modifiedOn: string;
  modifiedBy: string;
  isRowDeleted: boolean;
  equipmentStatus: number;
}
