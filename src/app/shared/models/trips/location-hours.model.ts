import { OpeningHours } from './opening-hours.model';
export interface LocationHours {
  shipping: OpeningHours[];
  receiving: OpeningHours[];
}
