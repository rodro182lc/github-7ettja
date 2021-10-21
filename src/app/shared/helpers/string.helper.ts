import { UsernameDisplayHelper } from '@shared/pipes/username-display.helper';

export abstract class StringHelper {
  /**
   * This method returns the unique id
   * @returns unique id
   */
  static newGUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      (character) => {
        const r = (Math.random() * 16) | 0;

        const v = character === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  /**
   * Return string value if not null or undefined. Otherwise return empty.
   */
  static toStringOrEmpty(value: string): string | '' {
    if (value === undefined || value === null || value === 'null') {
      return '';
    } else {
      return value;
    }
  }

  /**
   * Removes any blank character from the given string
   * @param value - Value for which blank spaces will be removed
   * @returns - New string without any kind of blank character
   */
  static removeBlankSpaces(
    value: string | null | undefined
  ): string | null | undefined {
    if (value) {
      return value.replace(/\s/g, '');
    }
    return value;
  }

  static replaceWithValues(originalValue: string, values: any) {
    if (!values) {
      return originalValue;
    }
    let result = originalValue;
    for (let property in values) {
      if (Object.prototype.hasOwnProperty.call(values, property)) {
        const searchValue = '{$' + property + '}';
        let replaceValue = values[property];
        if (property.toLowerCase().endsWith('by')) {
          replaceValue = UsernameDisplayHelper.formatUsername(replaceValue);
        }
        result = result.replace(searchValue, replaceValue);
      }
    }
    return result;
  }
}
