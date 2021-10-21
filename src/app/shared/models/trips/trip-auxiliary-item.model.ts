import { TripAuxiliaryItems } from 'app/trips/enumerations/trip-auxiliary-items.enum';

export interface TripAuxiliaryItem {
  id: string;
  auxiliaryItem: TripAuxiliaryItems;
}
