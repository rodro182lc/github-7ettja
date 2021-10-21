import { formatNumber } from '@angular/common';
import { CustomLocaleFormats } from '@shared/enumerations/core/custom-locale-formats.enum';
import { CustomNumberFormats } from '@shared/enumerations/core/custom-number-formats.enum';
export abstract class NumberHelper {
  static formatNumber(
    numberValue: string | number | undefined | null,
    format?: CustomNumberFormats | string
  ): string {
    if (!numberValue) {
      return '';
    }
    numberValue = Number(numberValue);
    format =
      format === undefined
        ? CustomNumberFormats.MinimumOneDigitWithTwoDecimalPoints
        : format;
    return formatNumber(
      numberValue,
      CustomLocaleFormats.UnitedStatesLocale,
      format
    );
  }
}
