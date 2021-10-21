import {
  AfterViewInit,
  ContentChildren,
  Directive,
  OnDestroy,
  QueryList
} from '@angular/core';
import { IgxSelectItemComponent } from '@infragistics/igniteui-angular';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
/**
 * * Directive for auto selecting single options IgxSelect or IgxCombo components
 */
@Directive({
  selector: '[appSingleOptionSelect]'
})
export class SingleOptionSelectDirective implements AfterViewInit, OnDestroy {
  @ContentChildren(IgxSelectItemComponent, { read: IgxSelectItemComponent })
  private items!: QueryList<IgxSelectItemComponent>;
  private itemsSubs!: Subscription;

  constructor() {}

  ngAfterViewInit(): void {
    this.itemsSubs = this.items.changes
      .pipe(filter((opts: any) => opts?._results?.length === 1))
      .subscribe((opts) => {
        setTimeout(() => {
          opts._results[0].selected = true;
        });
      });
  }

  ngOnDestroy(): void {
    this.itemsSubs.unsubscribe();
  }
}
