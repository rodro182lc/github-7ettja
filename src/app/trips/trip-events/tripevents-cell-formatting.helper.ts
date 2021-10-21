import { DateTimeHelper } from '@shared/helpers/date-time.helper';

export abstract class TripEventsCellFormattingHelper {
  static formatStartTime(dateValue: string): string | null {
    return DateTimeHelper.formatDate(dateValue);
  }
  static formatEndTime(dateValue: string): string | null {
    return DateTimeHelper.formatDate(dateValue);
  }
  static formatEtaDate(dateValue: string): string | null {
    return DateTimeHelper.formatDate(dateValue);
  }
}
