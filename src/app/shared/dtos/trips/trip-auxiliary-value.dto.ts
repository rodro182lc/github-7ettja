import { TripAuxiliaryItemDto } from './trip-auxiliary-item.dto';

export interface TripAuxiliaryValueDto {
  id: string;
  tripAuxiliaryItem: TripAuxiliaryItemDto;
  tripId: string;
  value: string;
  isRowDeleted: boolean;
}
