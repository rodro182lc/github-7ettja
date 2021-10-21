import { Trailer } from '../equip-compliancy/trailer.model';
import { Truck } from '../equip-compliancy/truck.model';
import { TripEventIcon } from './trip-event-icon.model';
import { Trip } from './trip.model';

export interface TripEvent {
  id: string;
  eventTypeId: string;
  orderId: string;
  probillId: string;
  eventName: string;
  probillNo: string;
  eventNumber: string;
  equipmentId: string;
  equipmentUnit: string;
  equipmentStatus: number;
  equipmentStatusDesc: string;
  location: string;
  locationId: string;
  city: string;
  code: string;
  cityWithState: string;
  miles: number;
  startTime: Date | null;
  endTime: Date | null;
  etaDate: Date | null;
  waitTime: number;
  detentionTime: number;
  status: string;
  longitude: number;
  latitude: number;
  sequence: number;
  trip: Trip;
  truck: Truck;
  trailer: Trailer;
  equipmentUnitAndStatus: string;
  scheduledDateTime: Date;
  isPowerUnit: boolean;
  // This field below holds the difference in milliseconds between local datetime at Event's location
  // and current browser's datetime
  // This difference will be useful so we don't have to call the endpoint multiple times just
  // to get the event's current time
  locationTimeMsDif: number;
  icons: TripEventIcon;
  localEtaDate: Date;
  currentLocationDate: Date;
  localStartTime: Date;
  localFinishTime: Date;
  finishTime: Date;
  eventLogStatus: any;
  createdOn: Date;
  createdBy: string;
  modifiedOn: Date;
  modifiedBy: string;
  //isRowDeleted:boolean;
}
