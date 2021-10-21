import { Trailer } from '@shared/models/equip-compliancy/trailer.model';
import { Truck } from '@shared/models/equip-compliancy/truck.model';

export abstract class EquipmentInformationActionable {
  truck: Truck | null = null;
  trailer: Trailer | null = null;

  initialize(truck: Truck | null, trailer: Trailer | null): void {
    this.truck = truck;
    this.trailer = trailer;
  }
}
