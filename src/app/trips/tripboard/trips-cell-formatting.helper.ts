import { DateTimeHelper } from '@shared/helpers/date-time.helper';

export abstract class TripsCellFormattingHelper {
  static formatHOS(hosValue: number): string {
    return DateTimeHelper.formatMinutesAsHourStamp(hosValue);
  }

  static formatETA(dateValue: string): string | null {
    return DateTimeHelper.formatDate(dateValue);
  }
  static formatLastDate(dateValue: string): string | null {
    return DateTimeHelper.formatDate(dateValue);
  }
  static formatNextDate(dateValue: string): string | null {
    return DateTimeHelper.formatDate(dateValue);
  }
}
