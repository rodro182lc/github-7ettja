import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { TripEventsService } from '@core/services/trips/trip-event.service';
import {
  IGridCellEventArgs,
  IGridEditEventArgs,
  IgxGridComponent,
  RowType
} from '@infragistics/igniteui-angular';
import { CustomDateTimeFormats } from '@shared/enumerations/core/custom-date-time-formats.enum';
import { ContextMenuItem } from '@shared/models/context-menu-item.model';
import { TripEvent } from '@shared/models/trips/trip-event.model';
import { SubSink } from 'subsink';
import {
  EventActionTypes,
  EVENT_ACTIONS
} from '../enumerations/event-action.enum';
//import { EventBusService } from '@core/services/event-bus.service';
import { TripItemActions } from '../enumerations/trip-item-actions.enum';
import { BusEvent } from '@shared/models/bus-event.model';
import { EventToMarkPlanned } from '@shared/models/trips/event-to-mark-planned.model';
import { ResponseStatus } from '@shared/enumerations/core/response-status.enum';
import { EventStatus } from '../enumerations/event-status.enum';
import { forkJoin } from 'rxjs';
import { FuelStation } from '@shared/models/trips/fuel-station.model';
import { Location } from '@shared/models/trips/location.model';
import { MapMarker } from '@shared/models/map-marker.model';
import { EventMarkerClasses } from '../enumerations/event-marker-classes.enum';
import { EventFields } from '../enumerations/event-fields.enum';
import { MapMarkerTypes } from '@shared/enumerations/core/map-marker-types.enum';
import { formatDate } from '@angular/common';
//import { MapComponent } from '@shared/map/map.component';
import { MessageEvents } from '@shared/enumerations/core/message-events.enum';
import { Trip } from '@shared/models/trips/trip.model';
import { DriverService } from '@core/services/driver-data/driver.service';
import { of } from 'rxjs';
import { BackhaulRequest } from '@shared/models/trips/backhaul-request.model';
import { DriverAvailability } from '@shared/models/trips/driver-availability.model';
//import { TripToolbarComponent } from '../trip-toolbar/trip-toolbar.component';
import { ToasterEvents } from '@shared/enumerations/core/toaster-events.enum';
import { catchError, switchMap } from 'rxjs/operators';
import { ApiResponse } from '@shared/models/api-response.model';
import { ContextMenuComponent } from '@shared/context-menu/context-menu.component';
import { TripEventsCellFormattingHelper } from './tripevents-cell-formatting.helper';
import { GridEditEventHelper } from '@shared/helpers/grid-edit-event.helper';

const EVENT_NAME = 'eventName';

@Component({
  selector: 'app-tripevents',
  templateUrl: './tripevents.component.html',
  styleUrls: ['./tripevents.component.scss']
})
export class TripEventsComponent implements OnInit, OnDestroy {
  // Constants
  private readonly COMPLETED = EventStatus.Completed.toLowerCase();
  private readonly PROBILL_COL_ID = 'probillNo';
  private readonly EQUIPMENT_UNIT_COL_ID = 'equipmentUnitAndStatus';
  private readonly START_TIME_COL_ID = 'startTime';
  private readonly FINISH_TIME_COL_ID = 'endTime';
  private readonly STATUS_COL_ID = 'status';
  private readonly ETA_COL_ID = 'etaDate';

  // ViewChild members
  //@ViewChild(TripToolbarComponent)
  //private tripToolbarComponent!: TripToolbarComponent;
  //@ViewChild(MapComponent)
  //private mapComponent!: MapComponent;
  @Input()
  trip!: Trip;
  @Input() contextMenuAvailable = false;
  @ViewChild('eventsGrid', { read: IgxGridComponent, static: true })
  private eventsGrid!: IgxGridComponent;

  private subs = new SubSink();
  isGridLoading = true;
  tripEventsData: TripEvent[] = [];
  allCssClasses = {
    'text-decoration-strikethrough': (tripEvent: TripEvent) =>
      (tripEvent?.status || '').toLowerCase() === this.COMPLETED
  };
  clickableCssClasses = {
    ...this.allCssClasses,
    'clickable-cell': () => true
  };

  // Event time formats
  readonly EVENT_TIME_IGX_INPUT_FORMAT = 'MM/dd/yyyy hh:mm tt';

  tripEventsCellFormattingHelper = TripEventsCellFormattingHelper;
  customDateTimeFormats = CustomDateTimeFormats;
  readonly eventName = EVENT_NAME;

  // Output members
  @Output() private equipmentInformation = new EventEmitter<any>();
  @Output() private applySeal = new EventEmitter<any>();
  @Output() private upsertEvent = new EventEmitter<any>();
  @Output() private openEquipmentFreight = new EventEmitter<TripEvent>();
  @Output() private openUpdateLocation = new EventEmitter();
  @Output() private showRemoveEventDialog = new EventEmitter<any>();
  @Output() public rowSelected = new EventEmitter<any>();
  @Output() private eventDatesChange = new EventEmitter<string>();

  // For toolbar
  @Output() private showTripPropertiesDialog = new EventEmitter<any>();

  @Output()
  private showBackhaulRequestDialog = new EventEmitter<BackhaulRequest>();

  @Output()
  private showDriverAvailabilityDialog = new EventEmitter<DriverAvailability>();
  @Output() private openAllApplySealDialog = new EventEmitter<any>();

  // Map related properties
  mapMarkers: MapMarker[] = [];
  private fuelStations: FuelStation[] = [];
  private driverCurrentLocation: Location | undefined = undefined;
  private nextEvent: TripEvent | undefined = undefined;
  private lastEvent: TripEvent | undefined = undefined;
  private readonly CURRENT_LOC_MARKER_ID = 'currentLocMkr';

  constructor(
    private tripEventsService: TripEventsService,
    // private mapService: MapService, // temporarily commented
    private driverService: DriverService,
    ///private tripItemActionBusService: EventBusService<TripItemActions>,
    //private messagesEventBusService: EventBusService<MessageEvents>,
    //private toasterEventBusService: EventBusService<ToasterEvents>,
    private changeDetectorRf: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadTripEventsData();
  }

  refresh(): void {
    this.loadTripEventsData();
    this.refreshTripToolbar();
  }

  loadTripEventsData(): void {
    this.isGridLoading = true;
    this.subs.sink = forkJoin({
      tripEventsData: this.tripEventsService.getEventsForTrip(this.trip).pipe(
        catchError(() => {
          return of(null);
        })
      ),
      driver: this.trip.leadDriverId
        ? this.driverService.getDriver(this.trip.leadDriverId).pipe(
            catchError(() => {
              return of(null);
            })
          )
        : of(null)
      // Temporary commenting as the backend is not avialable yet
      // fuelStations: this.mapService.getFuelStationsForDriver(this.trip.tripId)
    }).subscribe((data) => {
      this.tripEventsData = data?.tripEventsData || [];
      this.trip.events = this.tripEventsData;
      this.tripEventsData.forEach((tripEvent) => {
        tripEvent.equipmentUnitAndStatus =
          tripEvent.equipmentUnit && tripEvent.equipmentStatusDesc
            ? `${tripEvent.equipmentUnit} [${tripEvent.equipmentStatusDesc}]`
            : tripEvent.equipmentUnit;
      });
      // Temporary commenting as the backend is not avialable yet
      // this.fuelStations = data.fuelStations;
      this.driverCurrentLocation = data?.driver?.location;

      this.mapMarkers = [];
      if (this.tripEventsData.length > 0) {
        this.setNextLastEvents();
        this.createMapMarkers();
      }

      if (this.driverCurrentLocation) {
        // Add current driver location map marker
        this.mapMarkers.push(this.addDriverCurrentLocationMarker());
      }

      this.isGridLoading = false;
      this.changeDetectorRf.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  rightClick(
    eventArgs: IGridCellEventArgs,
    contextMenu: ContextMenuComponent
  ): void {
    eventArgs.event.preventDefault();

    this.selectRow(eventArgs.cell.row);

    const selectedEvent = eventArgs.cell.row.data as TripEvent;

    // if the trip is not completed yet, only then show the context menu
    if (!this.contextMenuAvailable || !selectedEvent?.eventName) {
      return;
    }

    const contextMenuItems = this.tripEventsService.getUserActions(
      selectedEvent?.eventName
    );
    const mouseEvent = eventArgs.event as MouseEvent;
    contextMenu.show({
      xPosition: mouseEvent.clientX,
      yPosition: mouseEvent.clientY,
      menuItems: contextMenuItems,
      associatedEntity: selectedEvent
    });
  }

  cellClicked(eventArgs: IGridCellEventArgs): void {
    eventArgs.event.preventDefault();
    const selectedCell = eventArgs.cell;
    const selectedEvent = eventArgs.cell.row.data as TripEvent;
    // Only show Equipment Dialog box, if user clicked on Equipment unit column
    if (selectedCell.column.field === this.EQUIPMENT_UNIT_COL_ID) {
      this.equipmentInformation.emit({
        eventName: selectedEvent.eventName,
        equipmentUnit: selectedEvent.equipmentUnit,
        equipmentId: selectedEvent.equipmentId
      });
    }

    // Only show Probill Dialog box, if user clicked on Probill column
    if (
      selectedCell.column.field === this.PROBILL_COL_ID &&
      selectedEvent?.probillId
    ) {
    }
  }

  // This will be called when user selects an item from the context menu
  onContextMenuItemClicked(contextItem: {
    selectedItem: ContextMenuItem;
    associatedEntity: TripEvent;
  }): void {
    const eventAction = EVENT_ACTIONS.find(
      (action) =>
        action.key.toLowerCase() ===
        contextItem.selectedItem.itemId?.toLowerCase()
    )?.key;

    // if user selects ApplySealNumber option
    if (
      eventAction?.toLowerCase() ===
      EventActionTypes.ApplySealNumber.toLowerCase()
    ) {
      this.applySeal.emit({
        selectedEvent: contextItem.associatedEntity,
        eventActionType: eventAction
      });
    }
    // if user selects EquipmentFreightSummary option
    else if (eventAction === EventActionTypes.EquipmentFreightSummary) {
      this.openEquipmentFreight.emit(contextItem.associatedEntity);
    }
    // if user selects update Location Information option
    else if (eventAction === EventActionTypes.UpdateLocationInformation) {
      this.openUpdateLocation.emit(contextItem.associatedEntity.id);
    }
    // if user selects AddEvent || Insert || Edit || SwitchTruck || SwitchTrailer option
    else if (
      eventAction?.toLowerCase() === EventActionTypes.AddEvent.toLowerCase() ||
      eventAction?.toLowerCase() === EventActionTypes.Insert.toLowerCase() ||
      eventAction?.toLowerCase() === EventActionTypes.Edit.toLowerCase() ||
      eventAction?.toLowerCase() ===
        EventActionTypes.SwitchTruck.toLowerCase() ||
      eventAction?.toLowerCase() ===
        EventActionTypes.SwitchTrailer.toLowerCase()
    ) {
      this.upsertEvent.emit({
        trip: this.trip,
        eventActionType: eventAction,
        eventData: contextItem.associatedEntity,
        lastEventId: this.getLastEventId()
      });
    }
    // if user selects MarkPlanned option
    else if (
      eventAction?.toLowerCase() === EventActionTypes.MarkPlanned.toLowerCase()
    ) {
      // let's mark the event planned
      this.markEventPlanned(contextItem.associatedEntity);
    }
    // if user selects Remove option
    else if (
      eventAction?.toLowerCase() === EventActionTypes.Delete.toLowerCase()
    ) {
      // let's show  the confirmation dialog
      this.showRemoveConfirmDialog(contextItem.associatedEntity);
    }
  }

  markEventPlanned(currentRightSelectedEvent: TripEvent): void {
    const eventToMarkPlannedModel: EventToMarkPlanned = {
      eventId: currentRightSelectedEvent.id
    };
    this.subs.sink = this.tripEventsService
      .markEventPlanned(eventToMarkPlannedModel)
      .subscribe((updateResponse) => {
        if (updateResponse?.status === ResponseStatus.Success) {
          currentRightSelectedEvent.status = EventStatus.Planned;
        }
      });
  }

  setNextLastEvents(): void {
    this.nextEvent = this.tripEventsData.find(
      (x) => x.startTime === null || x.endTime === null
    );
    this.lastEvent = this.tripEventsData[this.tripEventsData.length - 1];
  }

  createMapMarkers(): void {
    let tempMarkers: MapMarker[] = [];
    // add closest fuel station markers
    tempMarkers = tempMarkers.concat(this.getFuelMarkers());
    const locations: any = {};
    // add trip events markers
    this.tripEventsData.forEach((event) => {
      if (
        event.longitude &&
        event.latitude &&
        event.status.toLowerCase() !== EventStatus.Completed.toLowerCase()
      ) {
        if (!locations[event.location]) {
          const mkr: MapMarker = {
            id: event.id,
            longitude: event.longitude,
            latitude: event.latitude,
            cssClass: this.getMarkerCssClass(event.id),
            tooltip: this.getEventToolTip(event)
          };
          tempMarkers.push(mkr);
          locations[event.location] = event.id;
        } else {
          const mark = tempMarkers.find(
            (m) => m.id === locations[event.location]
          );
          if (mark) {
            mark.tooltip = mark.tooltip + this.getEventToolTip(event);
          }
        }
      }
    });

    // pass all markers to the map component
    this.mapMarkers = tempMarkers;
  }

  private getMarkerCssClass(eventId: string): string {
    // if we have both the next and the last events
    if (this.nextEvent && this.lastEvent) {
      // let's see if the next event and the last event is same
      if (this.nextEvent.id === eventId && this.lastEvent.id === eventId) {
        return EventMarkerClasses.LastEventMarker;
      } else {
        // let's see if this is the next event
        if (this.nextEvent.id === eventId) {
          return EventMarkerClasses.NextEventMarker;
        }
        // let's see if this is the last event
        else if (this.lastEvent.id === eventId) {
          return EventMarkerClasses.LastEventMarker;
        }
      }
    } else if (this.lastEvent) {
      if (this.lastEvent.id === eventId) {
        // if we have only last event
        return EventMarkerClasses.LastEventMarker;
      }
    } else if (this.nextEvent) {
      if (this.nextEvent.id === eventId) {
        // if we have only next event
        return EventMarkerClasses.NextEventMarker;
      }
    }
    return EventMarkerClasses.EventMarker;
  }

  private getEventToolTip(event: TripEvent): string {
    const eventLabel = this.getEventLabel(event.id);
    const label = `<div class='d-table'>
                      <div class='d-table-row'>                      
                         <div class='d-table-cell'>
                          &#8226;<b> ${event.eventName.toUpperCase()}</b>
                         </div>                        
                      </div>
                      <div class='d-table-row'>
                        <div class='d-table-cell align-right'>
                          ${EventFields.Location}: 
                        </div>
                        <div class='d-table-cell pl-1'>
                          ${event.city} 
                        </div>
                      </div>
                      <div class='d-table-row'>
                        <div class='d-table-cell align-right'>
                          ${EventFields.Status}: 
                        </div>
                        <div class='d-table-cell pl-1'>
                          ${event.status} 
                        </div>
                      </div>
                      <div class='d-table-row'>
                        <div class='d-tbl-cell align-right'>
                          ${EventFields.ETA}: 
                        </div>
                        <div class='d-table-cell pl-1'>
                          ${
                            event.etaDate
                              ? formatDate(
                                  event.etaDate,
                                  CustomDateTimeFormats.MediumDateTime,
                                  'en'
                                )
                              : ''
                          } 
                        </div>
                      </div>
                   </div>`;
    return label;
  }

  private getEventLabel(id: string): string {
    // if we have both the next and the last events
    if (this.nextEvent && this.lastEvent) {
      if (id === this.lastEvent.id && id === this.nextEvent.id) {
        return MapMarkerTypes.LastEvent;
      } else if (id === this.nextEvent.id) {
        return MapMarkerTypes.NextEvent;
      } else if (id === this.lastEvent.id) {
        return MapMarkerTypes.LastEvent;
      }
    } else if (this.lastEvent) {
      // if we have only last event
      if (id === this.lastEvent.id) {
        return MapMarkerTypes.LastEvent;
      }
    } else if (this.lastEvent) {
      // if we have only next event
      if (id === this.nextEvent?.id) {
        return MapMarkerTypes.NextEvent;
      }
    }
    return MapMarkerTypes.RegularEvent;
  }

  private addDriverCurrentLocationMarker(): MapMarker {
    const locmkr: MapMarker = {
      id: this.CURRENT_LOC_MARKER_ID,
      longitude: this.driverCurrentLocation?.longitude || 0,
      latitude: this.driverCurrentLocation?.latitude || 0,
      cssClass: EventMarkerClasses.CurrentLocationMarker,
      tooltip: `<b>${MapMarkerTypes.DriverCurrentLocation}:</b> <br /> ${this.driverCurrentLocation?.locationName} <br /> ${this.driverCurrentLocation?.address}`
    };
    return locmkr;
  }

  private getFuelMarkers(): MapMarker[] {
    const fuelMarkers: MapMarker[] = [];
    this.fuelStations.forEach((element) => {
      const mkr: MapMarker = {
        id: element.id,
        longitude: element.longitude,
        latitude: element.latitude,
        cssClass: EventMarkerClasses.FuelStationMarker,
        tooltip: `<b>${MapMarkerTypes.FuelStation}:</b> <br /> ${element.address}`
      };
      fuelMarkers.push(mkr);
    });
    return fuelMarkers;
  }

  /**
   * Shows the dialog to ask for user confirmation before removing an event
   * @param selectedEvent selected trip event
   */
  showRemoveConfirmDialog(selectedEvent: TripEvent): void {
    this.showRemoveEventDialog.emit({
      tripId: this.trip.tripId,
      selEvent: selectedEvent
    });
  }

  /**
   * Open the Trip Properties dialog
   */
  openTripPropertiesDialog(): void {
    this.showTripPropertiesDialog.emit();
  }

  /**
   * Open the Backhaul Request dialog
   */
  openBackhaulRequestDialog(backhaulRequest: BackhaulRequest): void {
    this.showBackhaulRequestDialog.emit(backhaulRequest);
  }

  /**
   * Open the Trip Driver Avaiability dialog
   */
  openDriverAvailabilityDialog(driverAvailability: DriverAvailability): void {
    this.showDriverAvailabilityDialog.emit(driverAvailability);
  }

  /**
   * Updates the trip toolbar
   */
  private refreshTripToolbar(): void {
    //if (this.tripToolbarComponent) {
    //  this.tripToolbarComponent.getToolbarData();
    //}
  }

  /**
   * Returns the id of the last event
   */
  getLastEventId(): string | null {
    const events = this.tripEventsData;
    return events && events.length ? events[events.length - 1].id : null;
  }

  onOpenAllApplySealDialog(): void {
    this.openAllApplySealDialog.emit();
  }

  /**
   * Method triggered when user has started edit mode fot trip events
   */
  editStart(eventArgs: IGridEditEventArgs) {
    const editingField = eventArgs.column?.field || '';
    if (
      editingField === this.START_TIME_COL_ID ||
      editingField === this.FINISH_TIME_COL_ID
    ) {
      // This code below is to improve user's experience since Ignite's edit mode for nested grids
      // does not focus the requested input control on first character, so we need to do that manually
      // Additionally, using setTimeout to properly get the input control
      GridEditEventHelper.focusEditControl(eventArgs);

      // When there's no previous value we set a default one
      const tripEvent = eventArgs.rowData as TripEvent;
      if (!eventArgs.oldValue && tripEvent) {
        // TripEvent's locationTimeMsDif contains the difference in ms between Event's location local datetime and the
        // current browser's datetime, so with such information we can auto-generate the current
        // datetime at event's location without having to call the endpoint again just to get Event's location local datetime
        const eventLocationInMs = Date.now() + tripEvent.locationTimeMsDif;
        const dateToSet = new Date(eventLocationInMs);
        const currentCell = this.eventsGrid.getCellByKey(
          tripEvent.id,
          editingField
        );
        currentCell.editValue = dateToSet;
      }
    }
  }

  /**
   * Updates both start and finish datetimes for the given trip event
   */
  private updateStartFinishDates(
    tripEvent: TripEvent,
    originalValue: Date | null
  ) {
    const revert = () => {
      this.eventsGrid.updateCell(
        originalValue,
        tripEvent.id,
        this.START_TIME_COL_ID
      );
    };
    const okRefreshCells = (latestTripEvent: TripEvent) => {
      this.eventsGrid.updateCell(null, tripEvent.id, this.FINISH_TIME_COL_ID);
      this.eventsGrid.updateCell(
        latestTripEvent.etaDate,
        tripEvent.id,
        this.ETA_COL_ID
      );
      this.eventsGrid.updateCell(
        latestTripEvent.status,
        tripEvent.id,
        this.STATUS_COL_ID
      );
    };
    this.subs.sink = this.tripEventsService
      .updateEventDates(tripEvent.id)
      .pipe(
        switchMap((response: ApiResponse) => {
          if (response?.status === ResponseStatus.Success) {
            return this.tripEventsService.getTripEventById(tripEvent.id);
          }
          return of(null);
        })
      )
      .subscribe(
        (updatedTripEvent: TripEvent | null) => {
          if (updatedTripEvent) {
            this.eventDatesChange.emit(tripEvent.trip.tripId);
            okRefreshCells(updatedTripEvent);
          } else {
            revert();
          }
        },
        () => {
          revert();
        }
      );
  }

  /**
   * Updates the start datetime for the given trip event
   */
  private updateStartDate(
    tripEvent: TripEvent,
    candidateValue: Date | null,
    originalValue: Date | null
  ) {
    const revert = () => {
      this.eventsGrid.updateCell(
        originalValue,
        tripEvent.id,
        this.START_TIME_COL_ID
      );
    };
    const okRefreshCells = (latestTripEvent: TripEvent) => {
      this.eventsGrid.updateCell(
        latestTripEvent.etaDate,
        tripEvent.id,
        this.ETA_COL_ID
      );
      this.eventsGrid.updateCell(
        latestTripEvent.status,
        tripEvent.id,
        this.STATUS_COL_ID
      );
    };
    this.subs.sink = this.tripEventsService
      .updateEventStart(tripEvent.id, candidateValue)
      .pipe(
        switchMap((response: ApiResponse) => {
          if (response?.status === ResponseStatus.Success) {
            return this.tripEventsService.getTripEventById(tripEvent.id);
          }
          return of(null);
        })
      )
      .subscribe(
        (updatedTripEvent: TripEvent | null) => {
          if (updatedTripEvent) {
            this.eventDatesChange.emit(tripEvent.trip.tripId);
            okRefreshCells(updatedTripEvent);
          } else {
            revert();
          }
        },
        () => {
          revert();
        }
      );
  }

  /**
   * Updates the finish datetime for the given trip event
   */
  private updateEndDate(
    tripEvent: TripEvent,
    candidateValue: Date | null,
    originalValue: Date | null
  ) {
    const revert = () => {
      this.eventsGrid.updateCell(
        originalValue,
        tripEvent.id,
        this.FINISH_TIME_COL_ID
      );
    };
    const okRefreshCells = (latestTripEvent: TripEvent) => {
      this.eventsGrid.updateCell(
        latestTripEvent.etaDate,
        tripEvent.id,
        this.ETA_COL_ID
      );
      this.eventsGrid.updateCell(
        latestTripEvent.status,
        tripEvent.id,
        this.STATUS_COL_ID
      );
    };
    this.subs.sink = this.tripEventsService
      .updateEventEnd(tripEvent.id, candidateValue)
      .pipe(
        switchMap((response: ApiResponse) => {
          if (response?.status === ResponseStatus.Success) {
            return this.tripEventsService.getTripEventById(tripEvent.id);
          }
          return of(null);
        })
      )
      .subscribe(
        (updatedTripEvent: TripEvent | null) => {
          if (updatedTripEvent) {
            this.eventDatesChange.emit(tripEvent.trip.tripId);
            okRefreshCells(updatedTripEvent);
          } else {
            revert();
          }
        },
        () => {
          revert();
        }
      );
  }

  /**
   * Method triggered when user has tried to commit/submit any edition made to event cell values
   */
  editDone(eventArgs: IGridEditEventArgs) {
    const editingField = eventArgs.column?.field || '';
    const tripEvent = eventArgs.rowData as TripEvent;
    const candidateValue = eventArgs.newValue as Date | null;
    const originalValue = eventArgs.oldValue as Date | null;
    const makeInvalidCase = (message: string) => {
      eventArgs.cancel = true;
    };

    // User must not enter a value in finish datetime when start datetime is empty
    if (
      editingField === this.FINISH_TIME_COL_ID &&
      candidateValue &&
      !tripEvent.startTime
    ) {
      makeInvalidCase('End time cannot be entered if start time is empty');
      return;
    }

    // When user clears start datetime then finish datetime is cleared too
    if (editingField === this.START_TIME_COL_ID && !candidateValue) {
      this.updateStartFinishDates(tripEvent, originalValue);
      return;
    }

    // Start/End times must be earlier than Event's location local datetime
    if (
      (editingField === this.START_TIME_COL_ID ||
        editingField === this.FINISH_TIME_COL_ID) &&
      candidateValue
    ) {
      const eventLocationInMs = Date.now() + tripEvent.locationTimeMsDif;
      const eventLocationDate = new Date(eventLocationInMs);
      if (candidateValue > eventLocationDate) {
        makeInvalidCase(`It must not be after event's location time`);
        return;
      }
    }

    // When user changes start datetime then we call the API to update such field only
    if (editingField === this.START_TIME_COL_ID) {
      // Start time must be earlier than finish time
      if (
        !tripEvent.endTime ||
        !candidateValue ||
        candidateValue < tripEvent.endTime
      ) {
        this.updateStartDate(tripEvent, candidateValue, originalValue);
      } else {
        makeInvalidCase('Start time must be earlier than end time');
      }
      return;
    }

    // When user changes finish datetime then we call the API to update such field only
    if (editingField === this.FINISH_TIME_COL_ID) {
      // Start time must be earlier than finish time
      if (
        !candidateValue ||
        (tripEvent.startTime && tripEvent.startTime < candidateValue)
      ) {
        this.updateEndDate(tripEvent, candidateValue, originalValue);
      } else {
        makeInvalidCase('End time must be after start time');
      }
      return;
    }
  }

  // Method to deselect grid rows from a parent component
  deselectAllRows(): void {
    this.eventsGrid.deselectAllRows();
  }

  selectRow(row: RowType) {
    this.deselectAllRows();
    row.selected = true;
    // Telling parent components that a row has been selected
    this.rowSelected.emit();
  }
}
