import { FormGroup } from '@angular/forms';
import { ApiResponse } from '@shared/models/api-response.model';
import { OrderDetails } from '@shared/models/trips/order-details.model';
import { Trip } from '@shared/models/trips/trip.model';
import { Observable, of } from 'rxjs';

export abstract class OrderActionable {
  isEditing: boolean = false;
  form!: FormGroup;
  orderDetails!: OrderDetails;
  probillId: string = '';
  trip!: Trip;

  disableChildControls(): void {
    this.isEditing = false;
  }

  enableChildControls(): void {
    this.isEditing = true;
  }

  initialize(orderDetails: OrderDetails, probillId: string, trip: Trip): void {
    this.orderDetails = orderDetails;
    this.probillId = probillId;
    this.trip = trip;
  }

  abstract finalize(): void;

  save(): Observable<ApiResponse> {
    return of();
  }
}
