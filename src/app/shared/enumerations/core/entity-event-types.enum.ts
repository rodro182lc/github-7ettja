export enum EntityEventTypes {
  TripCreated = 'TripCreatedEvent',
  TripUpdated = 'TripUpdatedEvent',
  TripEventCreated = 'TripEventCreatedEvent',
  TripEventUpdated = 'TripEventUpdatedEvent'
}

export type EntityEventTypesKey = keyof typeof EntityEventTypes;
