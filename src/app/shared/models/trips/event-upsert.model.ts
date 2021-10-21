import { EventStatus } from 'app/trips/enumerations/event-status.enum';
import { Events } from '../../../trips/enumerations/events.enum';
export interface EventUpsert {
  tripId?: string;
  eventId?: string;
  eventType: Events;
  eventTypeId?: string;
  status?: EventStatus;
  startTime?: Date;
  finishTime?: Date;
  eventNumber?: string;
  location?: string;
  sequence?: number;
  scheduledDateTime: Date;
  probillNo?: string;
}
