import {
  IgxNumberFilteringOperand,
  IgxStringFilteringOperand
} from '@infragistics/igniteui-angular';
import { DateTimeHelper } from '@shared/helpers/date-time.helper';

export class NumberFilteringOperand extends IgxNumberFilteringOperand {
  private constructor() {
    super();
    this.operations = [
      {
        name: 'time-span-contains',
        isUnary: false,
        iconName: 'contains',
        logic: (target: number, searchVal: string, ignoreCase?: boolean) => {
          ignoreCase =
            ignoreCase === null || ignoreCase === undefined ? true : ignoreCase;
          // Applying ignore case to the value that will be searched inside the number cell
          searchVal = IgxStringFilteringOperand.applyIgnoreCase(
            searchVal,
            ignoreCase
          );

          // Converting the number to its string representation
          let candidateNumberAsString =
            DateTimeHelper.formatMinutesAsHourStamp(target);

          // Applying ignore case to the string date
          candidateNumberAsString = IgxStringFilteringOperand.applyIgnoreCase(
            candidateNumberAsString,
            ignoreCase
          );

          return candidateNumberAsString.indexOf(searchVal) !== -1;
        }
      }
    ].concat(this.operations);
  }
}
