import { TitleCasePipe } from '@angular/common';

export abstract class UsernameDisplayHelper {
  static formatUsername(originalValue: string): string {
    if (!originalValue) {
      return '';
    }
    const titleCasePipe = new TitleCasePipe();
    let transformedValue = originalValue;
    const chargerText = 'CHARGER';

    if (transformedValue.toUpperCase().startsWith(chargerText)) {
      transformedValue = transformedValue.substr(
        chargerText.length + 1,
        transformedValue.length
      );
    }

    const atIx = transformedValue.indexOf('@');
    if (atIx >= 0) {
      const toRemove = transformedValue.substr(atIx, transformedValue.length);
      transformedValue = transformedValue.replace(toRemove, '');
    }
    transformedValue = transformedValue.replace('.', ' ');
    transformedValue = titleCasePipe.transform(transformedValue);
    return transformedValue;
  }
}
