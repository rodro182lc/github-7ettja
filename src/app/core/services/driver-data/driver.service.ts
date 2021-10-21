import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Driver } from '@shared/models/trips/driver.model';
import { ObservableStore } from '@codewithdan/observable-store/dist/observable-store';
import { StoreState } from '@shared/models/store-state.model';
import { driversData } from '../../../../../mocks/data/trip/drivers';

@Injectable({
  providedIn: 'root'
})
export class DriverService extends ObservableStore<StoreState> {
  constructor() {
    super({ trackStateHistory: true });
  }

  /**
   * This method gets the driver obj based on driver Id
   * @param driverId driver Id of the required driver
   */
  getDriver(driverId: string): Observable<Driver | null> {
    return of(driversData);
  }
}
