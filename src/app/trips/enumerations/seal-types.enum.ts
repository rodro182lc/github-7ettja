import { KeyValue } from '@angular/common';
import { ButtonGroupItem } from '@shared/models/button-group-item.model';

export enum SealTypes {
  Company = 'Company',
  Other = 'Other'
}

export const SEAL_TYPES: KeyValue<SealTypes, ButtonGroupItem>[] = [
  {
    key: SealTypes.Company,
    value: {
      label: 'Company',
      selected: true,
      disabled: false
    }
  },
  {
    key: SealTypes.Other,
    value: {
      label: 'Other',
      selected: false,
      disabled: false
    }
  }
];
