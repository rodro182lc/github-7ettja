import { GenericOption } from './generic-option.model';

/**
 * idBox:            Represents selected TripEventId.
 * index:            Represents position of the event box in the array.
 * selectedTripEvent Represents the selected trip event.
 */
export interface BoxOptions {
  idBox?: string;
  index?: number;
  selectedEventType: GenericOption;
}
