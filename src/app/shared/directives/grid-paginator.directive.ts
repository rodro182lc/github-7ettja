import { AfterContentInit, Directive } from '@angular/core';
import {
  IgxGridComponent,
  IPaginatorResourceStrings
} from '@infragistics/igniteui-angular';
/**
 * Directive for adding the pagination to the grid
 */
@Directive({
  selector: '[appGridPaginator]'
})
export class GridPaginatorDirective implements AfterContentInit {
  constructor(private host: IgxGridComponent) {}
  private paginatorResourceStrings: IPaginatorResourceStrings = {
    igx_paginator_label: ''
  };

  ngAfterContentInit(): void {
    if (this.host?.paginator) {
      this.host.paginator.selectOptions = [25, 50, 75, 100];
      this.host.paginator.perPage = 100;

      this.host.rowAdded.subscribe(() => {
        this.changeGridPaginator();
      });

      this.host.rowDeleted.subscribe(() => {
        this.changeGridPaginator();
      });

      this.host.filteringDone.subscribe(() => {
        this.changeGridPaginator();
      });
    }
  }

  /**
   *  This method sets the paginator of the grid
   */
  private changeGridPaginator(): void {
    requestAnimationFrame(() => {
      setTimeout(() => {
        this.paginatorResourceStrings.igx_paginator_label = `Total: ${this.host.totalRecords}. Per page:`;
        this.host.paginator.resourceStrings = this.paginatorResourceStrings;
      }, 500);
    });
  }
}
