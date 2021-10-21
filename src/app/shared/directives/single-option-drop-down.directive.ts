import {
  AfterViewInit,
  ContentChildren,
  Directive,
  OnDestroy,
  QueryList
} from '@angular/core';
import {
  IgxDropDownComponent,
  IgxDropDownItemComponent
} from '@infragistics/igniteui-angular';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
/**
 * Directive for auto selecting single options on IgxDropDown component
 */
@Directive({
  selector: '[appSingleOptionDropDown]'
})
export class SingleOptionDropDownDirective implements AfterViewInit, OnDestroy {
  @ContentChildren(IgxDropDownItemComponent, { read: IgxDropDownItemComponent })
  private itemsDD!: QueryList<IgxDropDownItemComponent>;
  private itemsSubsDD!: Subscription;

  constructor(private host: IgxDropDownComponent) {}

  ngAfterViewInit(): void {
    this.itemsSubsDD = this.itemsDD.changes
      .pipe(filter((opts: any) => opts?._results?.length === 1))
      .subscribe(() => {
        setTimeout(() => {
          this.host.setSelectedItem(0);
        }, 0);
      });
  }

  ngOnDestroy(): void {
    this.itemsSubsDD.unsubscribe();
  }
}
