import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import { BackhaulRequest } from '@shared/models/trips/backhaul-request.model';
import { DriverAvailability } from '@shared/models/trips/driver-availability.model';
import { TripEvent } from '@shared/models/trips/trip-event.model';
import { Trip } from '@shared/models/trips/trip.model';
import { EventActionTypes } from '../enumerations/event-action.enum';
import { TripStatus } from '../enumerations/trip-status.enum';
import { TripEventsComponent } from '../trip-events/tripevents.component';

@Component({
  selector: 'app-trip-detail',
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.scss']
})
export class TripDetailComponent {
  @ViewChild(TripEventsComponent)
  tripEventComponent!: TripEventsComponent;

  @Input() dataItem!: Trip;

  @Output() private addEvent = new EventEmitter<{
    trip: Trip;
    eventAction: EventActionTypes;
    eventData: TripEvent | null;
  }>();
  @Output() private showCloseTrip = new EventEmitter<Trip>();
  @Output() private tripRefreshed = new EventEmitter<{
    trip: Trip;
    reloadTrip?: boolean;
  }>();
  @Output() private showTripPlanner = new EventEmitter<Trip>();

  @Output() private upsertEvent = new EventEmitter<{
    trip: Trip;
    eventAction: EventActionTypes;
    eventData: TripEvent;
    lastEventId: string;
  }>();
  @Output() private equipmentInformation = new EventEmitter<{
    eventName: string;
    equipmentUnit: string;
    equipmentId: string;
  }>();
  @Output() private applySeal = new EventEmitter<TripEvent>();
  @Output() private showTripPropertiesDialog = new EventEmitter<Trip>();
  @Output() private showDriverAvailabilityDialog = new EventEmitter<{
    tripId: string;
    driverAvailability: DriverAvailability;
  }>();
  @Output() private openEquipmentFreight = new EventEmitter<{
    selectedEvent: TripEvent;
    selectedTrip: Trip;
  }>();
  @Output() private openUpdateLocation = new EventEmitter<string>();
  @Output() private showRemoveEventDialog = new EventEmitter<any>();
  @Output() private showBackhaulRequestDialog = new EventEmitter<{
    tripId: string;
    backhaulRequest: BackhaulRequest;
  }>();
  @Output() private openAllApplySealDialog = new EventEmitter<Trip>();
  @Output() private rowSelected = new EventEmitter<void>();
  @Output() eventDatesChange = new EventEmitter<string>();

  tripStatus = TripStatus;
  eventActionTypes = EventActionTypes;

  constructor(private cdRef: ChangeDetectorRef) {}

  detectChanges() {
    this.cdRef.detectChanges();
  }

  openEventCreationDialog(
    trip: Trip,
    eventAction: EventActionTypes,
    eventData: TripEvent | null
  ): void {
    this.addEvent.emit({ trip, eventAction, eventData });
  }

  showCloseTripDialog(selectedTrip: Trip): void {
    this.showCloseTrip.emit(selectedTrip);
  }

  reloadTripEvents(trip: Trip): void {
    this.tripRefreshed.emit({ trip });
  }

  openTripPlanner(trip: Trip): void {
    this.showTripPlanner.emit(trip);
  }

  openEventEditionInsertionDialog(
    trip: Trip,
    eventAction: EventActionTypes,
    eventData: TripEvent,
    lastEventId: string
  ): void {
    this.upsertEvent.emit({ trip, eventAction, eventData, lastEventId });
  }

  openEquipmentInformationDialog(
    eventName: string,
    equipmentUnit: string,
    equipmentId: string
  ): void {
    this.equipmentInformation.emit({ eventName, equipmentUnit, equipmentId });
  }

  openApplySealDialog(selectedEvent: TripEvent): void {
    this.applySeal.emit(selectedEvent);
  }

  openTripPropertiesDialog(selectedTrip: Trip): void {
    this.showTripPropertiesDialog.emit(selectedTrip);
  }

  openDriverAvailability(
    tripId: string,
    driverAvailability: DriverAvailability
  ): void {
    this.showDriverAvailabilityDialog.emit({ tripId, driverAvailability });
  }

  openEquipmentFreightDialog(
    selectedEvent: TripEvent,
    selectedTrip: Trip
  ): void {
    this.openEquipmentFreight.emit({ selectedEvent, selectedTrip });
  }

  openUpdateLocationDialog(selectedEventId: string): void {
    this.openUpdateLocation.emit(selectedEventId);
  }

  openRemoveEventDialog(eventInfo: any): void {
    this.showRemoveEventDialog.emit(eventInfo);
  }

  openBackhaulRequestDialog(
    tripId: string,
    backhaulRequest: BackhaulRequest
  ): void {
    this.showBackhaulRequestDialog.emit({ tripId, backhaulRequest });
  }

  openOnAllApplySealDialog(selectedTrip: Trip): void {
    this.openAllApplySealDialog.emit(selectedTrip);
  }

  tripEventsRowSelected(): void {
    this.rowSelected.emit();
  }
}
