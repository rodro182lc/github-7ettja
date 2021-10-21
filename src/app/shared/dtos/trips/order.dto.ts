import { CustomerDto } from './customer.dto';
import { OrderCategoryDto } from './orderCategory.dto';

export interface OrderDto {
  id: string;
  externalId: number;
  orderDate: string;
  customerId: string;
  divisionId: string;
  isRowDeleted: boolean;
  onHold: boolean;
  orderStatusId: string;
  poNumber: string;
  orderCategory: OrderCategoryDto;
  customer: CustomerDto;
}
