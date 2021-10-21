import { Location } from '@shared/models/trips/location.model';
import { Trailer } from '../equip-compliancy/trailer.model';
import { BolProbillDetails } from './bol-probill-details.model';
import { Consignee } from './consignee.model';
import { Order } from './order.model';
import { ProbillStatus } from './probill-status.model';
import { Shipper } from './shipper.model';
import { TrailerType } from './trailer-type.model';

export interface ProbillDetails {
  laneId: string;
  equipmentName: string;
  equipmentId: string;
  handlingInformation: string;
  handlingInformationId: string;
  probillId: string;
  probillNo: string;

  deliverTo: string;
  city: string;
  location: Location;
  shipperInfo: Shipper;
  consigneeInfo: Consignee;
  bolInfo: BolProbillDetails;

  status: string;

  trailer: Trailer;
  trailerType: TrailerType;
  order: Order;
  probillStatus: ProbillStatus;
  pickupDate: Date;
  deliveryDate: Date;
  province: string;
  pULocation: Location;
  delLocation: Location;
  trailerId: string;
  isPickedup: boolean;
}
