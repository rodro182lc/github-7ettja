import { KeyValue } from '@angular/common';
import { GridColumn } from '@shared/models/grid-column.model';
export enum AddTripGridColumn {
  ProbillId = 'probillId',
  ProbillNo = 'probillNo',
  DeliverTo = 'deliverTo',
  City = 'city'
}

export const ADD_TRIP_GRID_COLUMNS: KeyValue<AddTripGridColumn, GridColumn>[] =
  [
    {
      key: AddTripGridColumn.ProbillId,
      value: new GridColumn({
        field: AddTripGridColumn.ProbillId,
        header: 'Actions',
        dataType: 'string'
      })
    },
    {
      key: AddTripGridColumn.ProbillNo,
      value: new GridColumn({
        field: AddTripGridColumn.ProbillNo,
        header: 'Probill',
        dataType: 'string'
      })
    },
    {
      key: AddTripGridColumn.DeliverTo,
      value: new GridColumn({
        field: AddTripGridColumn.DeliverTo,
        header: 'Deliver To',
        dataType: 'string'
      })
    },
    {
      key: AddTripGridColumn.City,
      value: new GridColumn({
        field: AddTripGridColumn.City,
        header: 'City',
        dataType: 'string'
      })
    }
  ];
