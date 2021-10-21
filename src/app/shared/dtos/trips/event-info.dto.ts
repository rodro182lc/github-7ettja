import { TrailerDto } from '../equip-compliancy/trailer.dto';
import { TruckDto } from '../equip-compliancy/truck.dto';

export interface EventInfoDto {
  truck: TruckDto;
  trailer: TrailerDto;
  probills: string[];
}
