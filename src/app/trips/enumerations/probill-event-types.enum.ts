import { KeyValue } from '@angular/common';
import { ButtonGroupItem } from '@shared/models/button-group-item.model';
import { Events } from './events.enum';

export const PROBILL_EVENT_TYPES: KeyValue<Events, ButtonGroupItem>[] = [
  {
    key: Events.None,
    value: {
      label: 'None',
      selected: true,
      disabled: false
    }
  },
  {
    key: Events.Deliver,
    value: {
      label: 'Deliver',
      selected: false,
      disabled: false
    }
  },
  {
    key: Events.Unload,
    value: {
      label: 'Unload',
      selected: false,
      disabled: false
    }
  }
];
