import { KeyValue } from '@angular/common';
import { ContextMenuItem } from '@shared/models/context-menu-item.model';

export enum EventActionTypes {
  AddEvent = 'AddEvent',
  Insert = 'InsertEvent',
  Edit = 'Edit',
  Delete = 'DeleteEvent',
  SwitchTruck = 'SwitchSelectedTruck',
  UpdateLocationInformation = 'UpdateLocationInformation',
  MarkPlanned = 'MarkEventPlanned',
  Notes = 'Notes',
  EquipmentFreightSummary = 'EquipmentFreightSummary',
  SwitchTrailer = 'SwitchSelectedTrailer',
  ApplySealNumber = 'ApplySealNumber',
  ViewProbill = 'ViewProbill',
  OrderHistoryNotes = 'OrderHistoryNotes'
}

export const EVENT_ACTIONS: KeyValue<EventActionTypes, ContextMenuItem>[] = [
  {
    key: EventActionTypes.AddEvent,
    value: { itemText: 'Add Event' }
  },
  {
    key: EventActionTypes.Insert,
    value: { itemText: 'Insert Event' }
  },
  {
    key: EventActionTypes.Edit,
    value: { itemText: 'Edit' }
  },
  {
    key: EventActionTypes.Delete,
    value: { itemText: 'Delete Event', needSeparator: true }
  },
  {
    key: EventActionTypes.SwitchTruck,
    value: { itemText: 'Switch Selected Truck' }
  },
  {
    key: EventActionTypes.SwitchTrailer,
    value: { itemText: 'Switch Selected Trailer' }
  },
  {
    key: EventActionTypes.UpdateLocationInformation,
    value: { itemText: 'Update Location Information' }
  },
  {
    key: EventActionTypes.ApplySealNumber,
    value: { itemText: 'Apply Seal Number' }
  },
  {
    key: EventActionTypes.EquipmentFreightSummary,
    value: { itemText: 'Equipment Freight Summary' }
  },
  {
    key: EventActionTypes.ViewProbill,
    value: { itemText: 'View Probill' }
  },
  {
    key: EventActionTypes.MarkPlanned,
    value: { itemText: 'Mark Event Planned' }
  },
  {
    key: EventActionTypes.OrderHistoryNotes,
    value: { itemText: 'Order History Notes' }
  },
  {
    key: EventActionTypes.Notes,
    value: { itemText: 'Notes' }
  }
];
