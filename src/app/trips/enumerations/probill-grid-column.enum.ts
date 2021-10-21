export enum ProbillGridColumn {
  ProbillId = 'probillId',
  OrderNo = 'order.orderNumber',
  ProbillNo = 'probillNo',
  Status = 'probillStatus.name',
  CustomerName = 'order.customer.name',
  TrailerType = 'trailerType.name',
  PickupDate = 'pickupDate',
  PickupCompanyName = 'pULocation.name',
  PickupAddress = 'pULocation.address',
  PickupLocation = 'pULocation.city',
  DeliveryDate = 'deliveryDate',
  DeliveryCompanyName = 'delLocation.name',
  DeliveryAddress = 'delLocation.address',
  DeliveryLocation = 'delLocation.city',
  OrderCategory = 'order.orderCategory.name',
  TrailerId = 'trailerId'
}
