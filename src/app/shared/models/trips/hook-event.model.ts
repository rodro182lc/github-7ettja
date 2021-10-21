import { Events } from 'app/trips/enumerations/events.enum';

export interface HookEvent {
  eventType: Events;
  selected: boolean;
}
