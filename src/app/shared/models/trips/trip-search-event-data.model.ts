import { TripFieldFilter } from '../../../trips/enumerations/trip-field-filter.enum';

export interface TripSearchEventData {
  searchType: TripFieldFilter;
  searchValue: string;
}
