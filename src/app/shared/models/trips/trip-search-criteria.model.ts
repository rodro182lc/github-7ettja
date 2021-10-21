import { TripCategoryFilter } from 'app/trips/enumerations/trip-category-filter.enum';
import { TripFieldFilter } from 'app/trips/enumerations/trip-field-filter.enum';

export interface TripSearchCriteria {
  fieldName: '' | TripFieldFilter | TripCategoryFilter.RequestedDetentions;
  fieldValue: string;
}
