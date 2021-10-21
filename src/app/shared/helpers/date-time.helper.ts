import { formatDate } from '@angular/common';
import { CustomDateTimeFormats } from '@shared/enumerations/core/custom-date-time-formats.enum';
import { CustomLocaleFormats } from '@shared/enumerations/core/custom-locale-formats.enum';
export abstract class DateTimeHelper {
  static formatMinutesAsHourStamp(totalMinutes: number): string {
    if (totalMinutes === null || totalMinutes === undefined) {
      return '';
    }
    const wholeHours = Math.floor(totalMinutes / 60);
    const remainingMinutes = Math.floor(totalMinutes % 60);
    const hoursString = String(wholeHours).padStart(2, '0');
    const minutesString = String(remainingMinutes).padStart(2, '0');
    return `${hoursString}:${minutesString}`;
  }

  static stringTruncOffset(date: Date | null | undefined): string | null {
    if (date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    }
    return null;
  }

  static formatDate(
    dateValue: string | number | Date | null | undefined,
    format?: CustomDateTimeFormats | string
  ): string {
    if (!dateValue) {
      return '';
    }
    format =
      format === undefined ? CustomDateTimeFormats.MediumDateTime : format;
    return formatDate(
      dateValue,
      format,
      CustomLocaleFormats.UnitedStatesLocale
    );
  }

  /**
   * Returns the difference in milliseconds between the given sourceDate and
   * the current browser's datetime.
   * The Minuend is the passed value in sourceDate argument, the subtrahend is browser's current datetime.
   * @remarks - Minuend: The number from which we subtract the other number.
   * Subtrahend: The number which is subtracted from the minuend.
   */
  static getMsDifference(sourceDate: string | Date | null | undefined): number {
    const wasValueSupplied = sourceDate !== undefined && sourceDate !== null;
    if (!wasValueSupplied) {
      return 0;
    }
    const isDate = sourceDate instanceof Date;
    const isStringDate =
      typeof sourceDate === 'string' && Date.parse(sourceDate);
    if (!isDate && !isStringDate) {
      return 0;
    }
    const subtrahendDate = isDate
      ? (sourceDate as Date)
      : new Date(sourceDate as string);
    const currentDate = new Date();
    const difference = subtrahendDate.getTime() - currentDate.getTime();
    return difference;
  }

  /**
   * Returns the difference in minutes between minuend and subtrahend, i.e. minuend - subtrahend
   * @param minuend - The number from which we subtract the other parameter
   * @param subtrahend - The number which is subtracted from the minuend
   */
  static getMinutesBetween(
    minuend: Date | null,
    subtrahend: Date | null
  ): number {
    const milliseconds =
      (minuend?.getTime() || 0) - (subtrahend?.getTime() || 0);
    const seconds = milliseconds / 1000;
    const minutes = seconds / 60;
    return minutes;
  }
}
