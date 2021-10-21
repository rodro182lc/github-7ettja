import { Component, ViewChild } from '@angular/core';
import { BackhaulRequest } from '@shared/models/trips/backhaul-request.model';
import { DriverAvailability } from '@shared/models/trips/driver-availability.model';
import { TripEvent } from '@shared/models/trips/trip-event.model';
import { Trip } from '@shared/models/trips/trip.model';
import { SubSink } from 'subsink';
import { EventActionTypes } from '../enumerations/event-action.enum';
import { ResourceInformationTab } from '../enumerations/ResourceInformationTab.enum';
import { TripboardComponent } from '../tripboard/tripboard.component';

@Component({
  selector: 'app-tripboard-container',
  templateUrl: './tripboard-container.component.html',
  styleUrls: ['./tripboard-container.component.scss']
})
export class TripboardContainerComponent {
  // ViewChild members
  @ViewChild(TripboardComponent)
  private tripboardComponent!: TripboardComponent;

  // Private members
  private subs = new SubSink();

  constructor() {}

  onEventUpserted(trip: Trip): void {
    this.tripboardComponent?.reloadTripEvents({ trip });
  }

  onTripCreated(createdTrip: Trip): void {
    this.tripboardComponent?.onTripCreated(createdTrip);
  }

  onTripUpdated(updatedTrip: Trip): void {
    this.tripboardComponent?.onTripUpdated(updatedTrip);
  }

  reloadTripEvents(event: { trip: Trip }): void {
    this.tripboardComponent?.reloadTripEvents({ trip: event.trip });
  }

  openTripPlanner(trip: Trip) {}

  openEventUpsert(event: {
    trip: Trip;
    eventAction: EventActionTypes;
    eventData: TripEvent | null;
    lastEventId: string;
  }) {}

  openUpdateLocation(tripEventId: string) {}

  openEquipmentFreight(event: {
    selectedEvent: TripEvent;
    selectedTrip: Trip;
  }) {}

  openApplySeal(tripEvents: TripEvent[]) {}

  openCloseTrip(trip: Trip) {}

  openEquipmentInfo(event: {
    eventName: string;
    equipmentUnit: string;
    equipmentId: string;
  }) {}

  openTripProperties(trip: Trip) {}

  openRemoveEvent(event: any) {}

  openResourceboard(resourceTab: ResourceInformationTab) {}

  openBackhaulRequest(event: {
    tripId: string;
    backhaulRequest: BackhaulRequest;
  }) {}

  openDriverAvailability(event: {
    tripId: string;
    driverAvailability: DriverAvailability;
  }) {}
}
