import { GridColumnDataType } from '@infragistics/igniteui-angular';

export class GridColumn {
  field: string;
  header: string;
  dataType: GridColumnDataType;
  filteringCondition?: any;
  hidden: boolean;
  resizable: boolean;
  sortable: boolean;
  filterable: boolean;

  constructor(colInfo: {
    field: string;
    header?: string;
    dataType?: GridColumnDataType;
    filteringCondition?: any;
    hidden?: boolean;
    resizable?: boolean;
    sortable?: boolean;
    filterable?: boolean;
  }) {
    this.field = colInfo.field;
    this.header =
      colInfo.header === null || colInfo.header === undefined
        ? colInfo.field
        : colInfo.header;
    this.dataType =
      colInfo.dataType === null || colInfo.dataType === undefined
        ? 'string'
        : colInfo.dataType;
    this.filteringCondition = colInfo.filteringCondition;
    this.hidden =
      colInfo.hidden === null || colInfo.hidden === undefined
        ? false
        : colInfo.hidden;
    this.resizable =
      colInfo.resizable === null || colInfo.resizable === undefined
        ? true
        : colInfo.resizable;
    this.sortable =
      colInfo.sortable === null || colInfo.sortable === undefined
        ? true
        : colInfo.sortable;
    this.filterable =
      colInfo.filterable === null || colInfo.filterable === undefined
        ? true
        : colInfo.filterable;
  }
}
