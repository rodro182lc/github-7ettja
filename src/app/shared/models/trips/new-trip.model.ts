import { EventUpsert } from './event-upsert.model';
import { EventType } from '@shared/models/trips/event-type.model';
export interface NewTrip {
  tripGuid?: string;
  startTime: Date;
  dispatcher: string;
  leadDriverId: string;
  teamDriverId: string;
  tripCategoryId: string;
  roleId: string;
  truckId: string;
  lastLocataionTruckId: string;
  lastLocataionTrailerId: string;
  trailerId: string;
  eventUpserts: EventUpsert[];
  eventTypes: EventType[];
}
