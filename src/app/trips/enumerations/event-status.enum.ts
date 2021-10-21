import { KeyValue } from '@angular/common';

export enum EventStatus {
  PrePlanned = 'Pre-Planned',
  Planned = 'Planned',
  Completed = 'Completed'
}

export const EVENT_STATUS: KeyValue<EventStatus, string>[] = [
  {
    key: EventStatus.PrePlanned,
    value: 'Pre-Planned'
  },
  {
    key: EventStatus.Planned,
    value: 'Planned'
  }
];
