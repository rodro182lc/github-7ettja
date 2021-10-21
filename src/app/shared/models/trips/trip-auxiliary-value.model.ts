import { ACXStatuses } from 'app/trips/enumerations/acx-statuses.enum';
import { ProbillEventStatuses } from 'app/trips/enumerations/probill-event-statuses.enum';
import { ReeferStatuses } from 'app/trips/enumerations/reefer-statuses.enum';
import { TripAuxiliaryItems } from 'app/trips/enumerations/trip-auxiliary-items.enum';

export interface TripAuxiliaryValue {
  tripId: string;
  auxItem: TripAuxiliaryItems;
  value: ACXStatuses | ProbillEventStatuses | ReeferStatuses;
}
