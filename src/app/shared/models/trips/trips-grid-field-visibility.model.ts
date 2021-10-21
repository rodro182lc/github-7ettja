import { TripGridColumn } from 'app/trips/enumerations/trip-grid-column.enum';

export interface TripsGridFieldVisibility {
  column: TripGridColumn;
  isVisible: boolean;
}
