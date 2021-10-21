import { Directive, HostListener } from '@angular/core';
import { IgxDateTimeEditorDirective } from '@infragistics/igniteui-angular';

@Directive({
  selector: '[appDateTimeEditorDelete]',
  exportAs: 'appDateTimeEditorDelete'
})
export class DateTimeEditorDeleteDirective {
  constructor(private host: IgxDateTimeEditorDirective) {}

  @HostListener('keydown', ['$event']) private onKeyDown(
    event: KeyboardEvent
  ): void {
    const input = event.target as HTMLInputElement | null;
    if (input && event.key === 'Delete') {
      const selectionStart = input.selectionStart || 0;
      const selectionEnd = input.selectionEnd || 0;
      const areSeveralCharactersSelected =
        Math.abs(selectionEnd - selectionStart) >= 2;
      if (areSeveralCharactersSelected) {
        input.value = '';
        this.host.value = '';
      }
    }
  }
}
