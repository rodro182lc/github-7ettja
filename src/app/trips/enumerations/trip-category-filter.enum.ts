import { KeyValue } from '@angular/common';
import { ButtonGroupItem } from '@shared/models/button-group-item.model';

export enum TripCategoryFilter {
  AllTrips = 'AllTrips',
  OverDue = 'OverDue',
  LateForPU = 'LateForPU',
  ETALessThan30 = 'ETALessThan30',
  LateForDel = 'LateForDel',

  // Temporarily the request detention is not displayed
  RequestedDetentions = 'RequestedDetentions'
}

export const TRIP_CATEGORY_FILTER_TYPES: KeyValue<
  TripCategoryFilter,
  ButtonGroupItem
>[] = [
  {
    key: TripCategoryFilter.AllTrips,
    value: {
      label: 'All',
      icon: 'layers',
      selected: true,
      disabled: false
    }
  },
  {
    key: TripCategoryFilter.OverDue,
    value: {
      label: 'Overdue',
      icon: 'history',
      selected: false,
      disabled: false
    }
  },
  {
    key: TripCategoryFilter.LateForPU,
    value: {
      label: 'Late PU',
      icon: 'hourglass_full',
      selected: false,
      disabled: false
    }
  },
  {
    key: TripCategoryFilter.ETALessThan30,
    value: {
      label: 'ETA < 30',
      icon: 'timer',
      selected: false,
      disabled: false
    }
  },
  {
    key: TripCategoryFilter.LateForDel,
    value: {
      label: 'Late Del',
      icon: 'hourglass_bottom',
      selected: false,
      disabled: false
    }
  }
  // Temporarily the request detention is not displayed
  // {
  //   key: TripCategoryFilter.RequestedDetentions,
  //   value: {
  //     label: 'Req. Dtns.',
  //     icon: 'task_alt',
  //     selected: false,
  //     disabled: false
  //   }
  // }
];
