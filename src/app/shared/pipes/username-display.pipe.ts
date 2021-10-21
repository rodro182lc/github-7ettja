import { Pipe, PipeTransform } from '@angular/core';
import { UsernameDisplayHelper } from './username-display.helper';

@Pipe({
  name: 'usernamedisplay'
})
export class UsernameDisplayPipe implements PipeTransform {
  transform(originalValue: any): any {
    return UsernameDisplayHelper.formatUsername(originalValue);
  }
}
