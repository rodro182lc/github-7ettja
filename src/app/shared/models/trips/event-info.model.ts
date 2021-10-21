import { Trailer } from '../equip-compliancy/trailer.model';
import { Truck } from '../equip-compliancy/truck.model';

export interface EventInfo {
  truck: Truck;
  trailer: Trailer;
  probills: string[];
}
