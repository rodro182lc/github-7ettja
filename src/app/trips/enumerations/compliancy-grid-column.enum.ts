import { KeyValue } from '@angular/common';
import { GridColumn } from '@shared/models/grid-column.model';

export enum TruckCompliancyGridColumn {
  CompliancyItem = 'compliancyItem',
  Description = 'description',
  Odometer = 'odometer',
  Expiry = 'expiry'
}

export enum TrailerCompliancyGridColumn {
  CompliancyItem = 'compliancyItem',
  Description = 'description',
  Hours = 'hours',
  Expiry = 'expiry'
}

export const TRUCK_COMPLIANCY_GRID_COLUMNS: KeyValue<
  TruckCompliancyGridColumn,
  GridColumn
>[] = [
  {
    key: TruckCompliancyGridColumn.CompliancyItem,
    value: new GridColumn({
      field: TruckCompliancyGridColumn.CompliancyItem,
      header: 'Compliancy Item',
      dataType: 'string'
    })
  },
  {
    key: TruckCompliancyGridColumn.Description,
    value: new GridColumn({
      field: TruckCompliancyGridColumn.Description,
      header: 'Description',
      dataType: 'string'
    })
  },
  {
    key: TruckCompliancyGridColumn.Odometer,
    value: new GridColumn({
      field: TruckCompliancyGridColumn.Odometer,
      header: 'Odometer',
      dataType: 'number'
    })
  },
  {
    key: TruckCompliancyGridColumn.Expiry,
    value: new GridColumn({
      field: TruckCompliancyGridColumn.Expiry,
      header: 'Expiry',
      dataType: 'date'
    })
  }
];

export const TRAILER_COMPLIANCY_GRID_COLUMNS: KeyValue<
  TrailerCompliancyGridColumn,
  GridColumn
>[] = [
  {
    key: TrailerCompliancyGridColumn.CompliancyItem,
    value: new GridColumn({
      field: TrailerCompliancyGridColumn.CompliancyItem,
      header: 'Compliancy Item',
      dataType: 'string'
    })
  },
  {
    key: TrailerCompliancyGridColumn.Description,
    value: new GridColumn({
      field: TrailerCompliancyGridColumn.Description,
      header: 'Description',
      dataType: 'string'
    })
  },
  {
    key: TrailerCompliancyGridColumn.Hours,
    value: new GridColumn({
      field: TrailerCompliancyGridColumn.Hours,
      header: 'Hours',
      dataType: 'number'
    })
  },
  {
    key: TrailerCompliancyGridColumn.Expiry,
    value: new GridColumn({
      field: TrailerCompliancyGridColumn.Expiry,
      header: 'Expiry',
      dataType: 'date'
    })
  }
];
