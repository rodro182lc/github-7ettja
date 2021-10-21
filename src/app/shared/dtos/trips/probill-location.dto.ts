import { LocationDto } from '../map-data/location.dto';

export interface ProbillLocationDto {
  id: string;
  externalId: number;
  orderId: string;
  probillStatusId: string;
  hazmat: false;
  pickupDate: string;
  deliveryDate: string;
  farmOut: false;
  shipperLocation: LocationDto;
  pickupLocation: LocationDto;
  consigneeLocation: LocationDto;
  deliveryLocation: LocationDto;
  isRowDeleted: boolean;
}
