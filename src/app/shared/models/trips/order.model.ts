import { Customer } from './customer.model';
import { OrderCategory } from './order-category.model';

export interface Order {
  orderNumber: string;
  orderCategory: OrderCategory;
  customer: Customer;
}
