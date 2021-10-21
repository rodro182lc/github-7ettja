import {
  IgxDateFilteringOperand,
  IgxStringFilteringOperand
} from '@infragistics/igniteui-angular';
import { formatDate } from '@angular/common';
import { CustomDateTimeFormats } from '@shared/enumerations/core/custom-date-time-formats.enum';

export class DateTimeFilteringOperand extends IgxDateFilteringOperand {
  private constructor() {
    super();
    this.operations = [
      {
        name: 'medium-datetime-contains',
        isUnary: false,
        iconName: 'contains',
        logic: (target: Date, searchVal: string, ignoreCase?: boolean) => {
          return this.dateContains(
            CustomDateTimeFormats.MediumDateTime,
            target,
            searchVal,
            ignoreCase
          );
        }
      }
    ].concat(this.operations);
  }

  /**
   * Performs the logic to determine if the given valueToBeLookedFor value is inside of the given candidateDate
   * @returns - True if the string representation of candidateDate contains the given valueToBeLookedFor value
   */
  private dateContains(
    format: CustomDateTimeFormats,
    candidateDate: Date,
    valueToBeLookedFor: string,
    ignoreCase?: boolean
  ): boolean {
    ignoreCase =
      ignoreCase === null || ignoreCase === undefined ? true : ignoreCase;
    // Applying ignore case to the value that will be searched inside the date cell
    valueToBeLookedFor = IgxStringFilteringOperand.applyIgnoreCase(
      valueToBeLookedFor,
      ignoreCase
    );

    // Converting the date to its string representation
    let candidateDateAsString = formatDate(candidateDate, format, 'en');

    // Applying ignore case to the string date
    candidateDateAsString = IgxStringFilteringOperand.applyIgnoreCase(
      candidateDateAsString,
      ignoreCase
    );

    return candidateDateAsString.indexOf(valueToBeLookedFor) !== -1;
  }
}
