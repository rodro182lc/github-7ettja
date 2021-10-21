import { KeyValue } from '@angular/common';

export enum Events {
  None = 'None',
  Deliver = 'Deliver',
  Unload = 'Unload',
  Acquire = 'Acquire',
  Hook = 'Hook',
  Pickup = 'Pickup',
  Load = 'Load',
  Drop = 'Drop',
  Release = 'Release',
  Border = 'Border',
  ReRoute = 'Re-Route',
  HookDrop = 'HookDrop',
  DropHook = 'DropHook'
}

export const EVENTS: KeyValue<Events, string>[] = [
  {
    key: Events.None,
    value: 'None'
  },
  {
    key: Events.Deliver,
    value: 'Deliver'
  },
  {
    key: Events.Unload,
    value: 'Unload'
  },
  {
    key: Events.Acquire,
    value: 'Acquire'
  },
  {
    key: Events.Hook,
    value: 'Hook'
  },
  {
    key: Events.Pickup,
    value: 'Pickup'
  },
  {
    key: Events.Load,
    value: 'Load'
  },

  {
    key: Events.Drop,
    value: 'Drop'
  },
  {
    key: Events.Release,
    value: 'Release'
  },
  {
    key: Events.Border,
    value: 'Border'
  },
  {
    key: Events.ReRoute,
    value: 'Re-Route'
  },
  {
    key: Events.HookDrop,
    value: 'HookDrop'
  },
  {
    key: Events.DropHook,
    value: 'DropHook'
  }
];
