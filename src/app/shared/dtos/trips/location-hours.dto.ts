import { OpeningHoursDto } from './opening-hours.dto';
export interface LocationHoursDto {
  shipping: OpeningHoursDto[];
  receiving: OpeningHoursDto[];
}
