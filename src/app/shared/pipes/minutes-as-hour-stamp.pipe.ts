import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minutesAsHourStamp'
})
export class MinutesAsHourStampPipe implements PipeTransform {
  transform(totalMinutes: number): string {
    if (totalMinutes === null || totalMinutes === undefined) {
      return '';
    }
    const wholeHours = Math.floor(totalMinutes / 60);
    const remainingMinutes = Math.floor(totalMinutes % 60);
    const hoursString = String(wholeHours).padStart(2, '0');
    const minutesString = String(remainingMinutes).padStart(2, '0');
    return `${hoursString}:${minutesString}`;
  }
}
