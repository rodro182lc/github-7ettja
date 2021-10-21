import {
  ComponentFactoryResolver,
  Directive,
  Host,
  OnDestroy,
  OnInit,
  ViewContainerRef
} from '@angular/core';
import { UserPreferencesService } from '@core/services/user-preferences.service';
import {
  IgxGridComponent,
  IgxGridStateDirective
} from '@infragistics/igniteui-angular';
import { merge } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';
import { SubSink } from 'subsink';

@Directive({
  selector: '[appGridState]',
  exportAs: 'appGridState'
})
export class GridStateDirective implements OnInit, OnDestroy {
  // Private members
  private subs = new SubSink();
  private igxGridState!: IgxGridStateDirective;

  constructor(
    @Host() private grid: IgxGridComponent,
    private componentFactory: ComponentFactoryResolver,
    private viewContainer: ViewContainerRef,
    private userPref: UserPreferencesService
  ) {}

  ngOnInit() {
    // Our directive totally depends on Ignite's State Directive, that is why we need to create this instance manually
    // Placing the instance here allows the developer to only decorate the consumer component with appGridState and
    // not both appGridState & igxGridState
    this.igxGridState = new IgxGridStateDirective(
      this.grid,
      this.componentFactory,
      this.viewContainer
    );

    // Configuring the features we only want to persist
    this.igxGridState.options = {
      sorting: false,
      filtering: false,
      advancedFiltering: false,
      paging: false,
      cellSelection: false,
      rowSelection: false,
      columnSelection: false,
      rowPinning: true,
      expansion: false,
      groupBy: false,
      columns: true // Columns order/sequence and properties (such as width)
    };

    // Subscribing to grid's events to save state
    // This will allow to save grid's state even if user changed any column and closed the browser
    this.subs.sink = merge(
      this.grid.columnResized,
      this.grid.columnMovingEnd,
      this.grid.columnVisibilityChanged,
      // For rowPinned event we need to filter based on event.row, this is because after restoreGridState
      // is called it was also emitting the rowPinned event, hence calling saveGridState, which caused a bug
      // that cleared the pinned rows state (from local storage)
      this.grid.rowPinned.pipe(filter((e) => !!e.row))
    )
      .pipe(debounceTime(1000))
      .subscribe(() => this.saveGridState());

    setTimeout(() => this.restoreGridState());
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private saveGridState() {
    const serializedState = this.igxGridState.getState() as string;
    // Grid id is automatically populated by ignite if not provided by developer
    this.userPref.saveGridState(this.grid.id, serializedState);
  }

  private restoreGridState() {
    const serializedState = this.userPref.getGridState(this.grid.id);
    if (serializedState) {
      this.igxGridState.setState(serializedState);
    }
  }
}
