import { TrailerDto } from '../equip-compliancy/trailer.dto';
import { LocationDto } from '../map-data/location.dto';
import { OrderDto } from './order.dto';
import { ProbillStatusDto } from './probill-status.dto';
import { TrailerTypeDto } from './Trailer-type.dto';

export interface ProbillDetailsDto {
  id: string;
  externalId: string; // This is probill number
  orderId: string;
  probillStatusId: string;
  hazmat: true;
  currentLocationId: string;
  pickupNumber: string;
  deliveryNumber: string;
  pickupDate: string;
  deliveryDate: string;
  farmOut: boolean;
  shipperLocationId: string;
  shipperLocation: LocationDto;
  pickupLocationId: string;
  consigneeLocationId: string;
  consigneeLocation: LocationDto;
  order: OrderDto;
  trailerType: TrailerTypeDto;
  probillStatus: ProbillStatusDto;
  pickupLocation: LocationDto;
  deliveryLocation: LocationDto;
  trailerTypeId: string;
  isRowDeleted: boolean;
  deliverySignedBy: string;
  pickupSignedBy: string;
  trailerId: string;
  currentLocation: LocationDto;
  laneId: string;
  equipmentName: string;
  equipmentId: string;
  handlingInformation: string;
  handlingInformationId: string;
  orderNo: string;
  status: string;
}
