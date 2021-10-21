import { AfterContentInit, Directive } from '@angular/core';
import { IgxGridComponent } from '@infragistics/igniteui-angular';
/**
 * Directive for copy to clipboard for the grid
 */
@Directive({
  selector: '[appGridCopyClipboard]'
})
export class GridCopyClipboardDirective implements AfterContentInit {
  constructor(private host: IgxGridComponent) {}

  private options = {
    enabled: true,
    copyHeaders: false,
    copyFormatters: true,
    separator: '\t'
  };

  ngAfterContentInit(): void {
    this.host.clipboardOptions = this.options;
  }
}
