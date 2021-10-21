import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { SubSink } from 'subsink';
import { TripsService } from '@core/services/trips/trips.service';
import { Trip } from '@shared/models/trips/trip.model';
import { TripsGridFieldVisibility } from '@shared/models/trips/trips-grid-field-visibility.model';
import {
  FilteringExpressionsTree,
  FilteringLogic,
  IGridCellEventArgs,
  IgxColumnComponent,
  IgxGridComponent,
  IgxGridPinningActionsComponent,
  IRowToggleEventArgs,
  RowType
} from '@infragistics/igniteui-angular';
import { TripCategoryFilter } from '../enumerations/trip-category-filter.enum';
import { TripSearchEventData } from '../../shared/models/trips/trip-search-event-data.model';
import {
  TripGridColumn,
  TripGridColumnKey
} from '../enumerations/trip-grid-column.enum';
import { TripsFilterHelper } from './trips-filter.helper';
import { CustomDateTimeFormats } from '@shared/enumerations/core/custom-date-time-formats.enum';
import { TripsCellFormattingHelper } from './trips-cell-formatting.helper';
import { TripEvent } from '@shared/models/trips/trip-event.model';
import { TripSearchCriteria } from '@shared/models/trips/trip-search-criteria.model';
import { TripStatus } from '../enumerations/trip-status.enum';
import { TripToClose } from '@shared/models/trips/trip-to-close.model';
import { TripItemActions } from '../enumerations/trip-item-actions.enum';
import { BackhaulRequest } from '@shared/models/trips/backhaul-request.model';
import { DriverAvailability } from '@shared/models/trips/driver-availability.model';
import { EventActionTypes } from '../enumerations/event-action.enum';
import { BusEvent } from '@shared/models/bus-event.model';
import { GridFilterHelper } from '../abstract/grid-filter.helper';
import { TRIPS_FILTER_CONFIG } from './trips-filter.config';
import { ContextMenuItem } from '@shared/models/context-menu-item.model';
import { concatMap } from 'rxjs/operators';
import { ContextMenuComponent } from '@shared/context-menu/context-menu.component';
import { ResourceInformationTab } from '../enumerations/ResourceInformationTab.enum';
import { TripFieldFilter } from '../enumerations/trip-field-filter.enum';
import { TripsPreferencesService } from '@core/services/trips/trips-preferences.service';
import { TripDetailComponent } from '../trip-detail/trip-detail.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-tripboard',
  templateUrl: './tripboard.component.html',
  styleUrls: ['./tripboard.component.scss']
})
export class TripboardComponent implements OnInit, OnDestroy, AfterViewInit {
  // ViewChild members
  @ViewChild('tripsGrid', { read: IgxGridComponent, static: true })
  private tripsGrid!: IgxGridComponent;
  @ViewChildren(TripDetailComponent)
  private tripDetailComponents!: QueryList<TripDetailComponent>;
  @ViewChild('headerTemplate', { read: TemplateRef, static: true })
  private headerTemplate!: TemplateRef<any>;
  @ViewChild('nextEventTemplate', { static: true })
  private nextEventTemplate!: TemplateRef<any>;
  @ViewChild('lastEventTemplate', { static: true })
  private lastEventTemplate!: TemplateRef<any>;
  @ViewChild('pinningActions', { static: true })
  private pinningActions!: IgxGridPinningActionsComponent;

  // Output members
  @Output() openTripPlanner = new EventEmitter<Trip>();
  @Output() private openEventUpsert = new EventEmitter<{
    trip: Trip;
    eventAction: EventActionTypes;
    eventData: TripEvent | null;
    lastEventId: string;
  }>();
  @Output() openUpdateLocation = new EventEmitter<string>();
  @Output() openEquipmentFreight = new EventEmitter<{
    selectedEvent: TripEvent;
    selectedTrip: Trip;
  }>();
  @Output() openApplySeal = new EventEmitter<TripEvent[]>();
  @Output() openCloseTrip = new EventEmitter<Trip>();
  @Output() openEquipmentInfo = new EventEmitter<{
    eventName: string;
    equipmentUnit: string;
    equipmentId: string;
  }>();
  @Output() openTripProperties = new EventEmitter<Trip>();
  @Output() openRemoveEvent = new EventEmitter<any>();
  @Output() openResourceboard = new EventEmitter<ResourceInformationTab>();
  @Output() openBackhaulRequest = new EventEmitter<{
    tripId: string;
    backhaulRequest: BackhaulRequest;
  }>();
  @Output() openDriverAvailability = new EventEmitter<{
    tripId: string;
    driverAvailability: DriverAvailability;
  }>();

  // Private members
  private subs = new SubSink();
  private lastServerSideFilter: TripSearchCriteria = {
    fieldName: '',
    fieldValue: ''
  };
  private lastClientSideFilter: {
    filterText: string;
    category: TripCategoryFilter;
  } = {
    filterText: '',
    category: TripCategoryFilter.AllTrips
  };
  private isShowingInactiveTrips = false;
  private readonly TRIP_NUMBER_WAIT_SECONDS = 15;
  private readonly TRIP_GRID_ID = 'tripboard-grid'; // Internal id used to store grid's state

  // Public members
  aboutToDeleteTrips: TripEvent[] = [];
  tripsData: Trip[] = [];
  isGridLoading = false;

  // These next objects define the relationships between css classes and functions
  // These relationships indicate when to apply a css class for certain grid's cells
  // by evaluating a boolean function
  trailerCellClasses = {
    'fuel-level-icon': (trip: Trip) => trip.icons.fuelWarning
  };
  driverCellClasses = {
    'red-ace-icon': (trip: Trip) => trip.icons.ace.danger,
    'yellow-ace-icon': (trip: Trip) => trip.icons.ace.warning,
    'green-ace-icon': (trip: Trip) => trip.icons.ace.success,
    'red-aci-icon': (trip: Trip) => trip.icons.aci.danger,
    'yellow-aci-icon': (trip: Trip) => trip.icons.aci.warning,
    'green-aci-icon': (trip: Trip) => trip.icons.aci.success
  };
  tripCellClasses = {
    'brand-new-trip': (trip: Trip) => trip.icons.isBrandNewTrip
  };
  tripGridColumn = TripGridColumn;
  customDateTimeFormats = CustomDateTimeFormats;
  tripStatus = TripStatus;
  tripsCellFormattingHelper = TripsCellFormattingHelper;
  eventActionTypes = EventActionTypes;

  constructor(
    private tripsService: TripsService,
    private tripPreferences: TripsPreferencesService
  ) {}

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    // Grid Data api call
    this.loadTripsData();

    // This is a work-around to detect when the user has clicked on the scrollToRow button from pin pannel.
    // We need this to immediatelly expand the chosen trip after user clicked on scrollToRow.
    // Storing current scrollToRow function into our variable so we can append our custom logic to it
    const scrollToRowFunc = this.pinningActions.scrollToRow;
    // Overwriting scrollToRow function with our own
    this.pinningActions.scrollToRow = () => {
      // Calling the original function with passed arguments
      scrollToRowFunc.apply(this.pinningActions, arguments as any);
      // Getting the trip that was selected
      const trip = (this.pinningActions as any).strip.context.rowData as Trip;
      // Attaching our custom logic
      this.tripsGrid.expandRow(trip.tripId);
    };
    // Re-acting on filtering process completed
    this.subs.sink = this.tripsGrid.filteringDone.subscribe(() => {
      // Highlighting coincidences of filterText
      this.tripsGrid.clearSearch();
      this.tripsGrid.findNext(this.lastClientSideFilter.filterText);
    });
  }

  ngAfterViewInit(): void {
    const layout: TripsGridFieldVisibility[] = [];

    Object.keys(TripGridColumn).forEach((columnEnumItem) => {
      const columnKey = columnEnumItem as TripGridColumnKey;
      layout.push({
        column: TripGridColumn[columnKey],
        isVisible: true
      });
    });
  }

  onColumnInit(column: IgxColumnComponent) {
    if (column.field !== undefined && column.field !== '') {
      column.headerTemplate = this.headerTemplate;
    }
    if (column.field === this.tripGridColumn.Trip) {
      column.cellClasses = this.tripCellClasses;
    }
    if (column.field === this.tripGridColumn.Driver) {
      column.cellClasses = this.driverCellClasses;
    }
    if (column.field === this.tripGridColumn.Trailer1) {
      column.cellClasses = this.trailerCellClasses;
    }
    if (column.field === this.tripGridColumn.NextEvent) {
      column.bodyTemplate = this.nextEventTemplate;
    }
    if (column.field === this.tripGridColumn.LastEvent) {
      column.bodyTemplate = this.lastEventTemplate;
    }
    if (column.field === this.tripGridColumn.NextEventETA) {
      column.formatter = this.tripsCellFormattingHelper.formatETA;
    }
    if (column.field === this.tripGridColumn.HOS) {
      column.formatter = this.tripsCellFormattingHelper.formatHOS;
    }
    if (column.field === this.tripGridColumn.LastDate) {
      column.formatter = this.tripsCellFormattingHelper.formatLastDate;
    }
    if (column.field === this.tripGridColumn.NextDate) {
      column.formatter = this.tripsCellFormattingHelper.formatNextDate;
    }
  }

  /**
   * Fetches trips' data by calling the backend API
   */
  private loadTripsData(): void {
    this.tripsGrid.deselectAllRows();
    this.isGridLoading = true;
    this.isShowingInactiveTrips = !!this.lastServerSideFilter.fieldName;
    this.collapseAllTrips();
    this.tripsData = [];

    this.subs.sink = this.tripPreferences
      .getTripQuery()
      .pipe(
        concatMap((tripQuery) => {
          // Notifying to any eventbus listeners of the LayoutGotten event
          return this.tripsService.getTrips(
            this.lastServerSideFilter,
            tripQuery
          );
        })
      )
      .subscribe(
        (responseTrips) => {
          // Grid's records
          this.tripsData = responseTrips || [];
          // Making sure that client side filtering is re-applied after loading data from server
          //his.doClientSideFiltering();
          this.isGridLoading = false;
        },
        () => {
          this.isGridLoading = false;
        }
      );
  }

  private collapseAllTrips() {
    this.tripsGrid.collapseAll();
    this.tripsData.forEach((t) => (t.isExpanded = false));
    if (this.tripDetailComponents?.length) {
      const collapsedTrips = this.tripDetailComponents?.filter(
        (c) => !c.dataItem.isExpanded
      );
      if (collapsedTrips?.length) {
        collapsedTrips?.forEach((c) => c.detectChanges());
      }
    }
  }

  /**
   * Removes the trip that matches the given tripId from grid
   * @param tripId - Id of the trip to be removed
   */
  private deleteTripRow(tripId: string) {
    const foundTrip = this.tripsData.find((t) => t.tripId === tripId);
    if (foundTrip) {
      foundTrip.isExpanded = false;
    }
    this.detectChangesForTripDetails(tripId);
    this.tripsGrid.deleteRow(tripId);
    this.tripsGrid.rowDeleted.emit();
  }

  private detectChangesForTripDetails(tripId: string) {
    const tripDetComp = this.tripDetailComponents.filter(
      (c) => c.dataItem.tripId === tripId
    );
    if (tripDetComp?.length) {
      tripDetComp.forEach((c) => c.detectChanges());
    }
  }

  openEventCreationDialog(event: {
    trip: Trip;
    eventAction: EventActionTypes;
    eventData: TripEvent | null;
  }): void {
    let lastEventId: string = '';
    const selectedTripDetails = this.tripDetailComponents.find(
      (c) =>
        c?.dataItem?.tripId === event.trip?.tripId && !!c.tripEventComponent
    );
    if (selectedTripDetails) {
      lastEventId =
        selectedTripDetails.tripEventComponent.getLastEventId() || '';
    }
    this.openEventUpsert.emit({
      trip: event.trip,
      eventAction: event.eventAction,
      eventData: event.eventData,
      lastEventId
    });
  }

  openEventEditionInsertionDialog(event: {
    trip: Trip;
    eventAction: EventActionTypes;
    eventData: TripEvent;
    lastEventId: string;
  }): void {
    this.openEventUpsert.emit({
      trip: event.trip,
      eventAction: event.eventAction,
      eventData: event.eventData,
      lastEventId: event.lastEventId
    });
  }

  /**
   * Method called when a trip has been sucessfully closed
   */
  onTripClosed(closeInfo: TripToClose): void {
    if (this.isShowingInactiveTrips) {
      const foundTrip = this.tripsData.find(
        (trip) => trip.tripId === closeInfo.tripId
      );
      if (foundTrip) {
        foundTrip.status = TripStatus.Closed;
        foundTrip.finishTime = closeInfo?.dateIn;
        this.tripsGrid.updateRow(foundTrip, closeInfo.tripId);
      }
    } else {
      this.deleteTripRow(closeInfo.tripId);
    }
  }

  /**
   * Method called when a trip refresh button is clicked
   */
  reloadTripEvents(event: { trip: Trip; reloadTrip?: boolean }): void {
    event.reloadTrip =
      event.reloadTrip === undefined || event.reloadTrip === null
        ? true
        : event.reloadTrip;
    const selectedTripDetails = this.tripDetailComponents.find(
      (c) =>
        c?.dataItem?.tripId === event.trip?.tripId && !!c.tripEventComponent
    );
    if (selectedTripDetails) {
      if (event.reloadTrip) {
      } else {
        selectedTripDetails.tripEventComponent.refresh();
      }
    }
  }

  /**
   * Method called when user has created a new Trip from the dialog
   */
  onTripCreated(createdTrip: Trip): void {
    const isTripInGrid =
      this.tripsData.findIndex(
        (currentTrip: Trip) => currentTrip.tripId === createdTrip.tripId
      ) >= 0;
    if (!isTripInGrid) {
      // Adding the trip to the grid (using addRow to trigger data pipes that process and render the data)
      this.tripsGrid.addRow(createdTrip);
      // Getting the trip data record that was just insered and removing from source data
      const justInsertedRecord = this.tripsData.pop();
      // Inserting the trip data record to the begining of the data source
      if (justInsertedRecord) {
        this.tripsData.splice(0, 0, justInsertedRecord);
      }
      // Expanding the new trip by default
      this.tripsGrid.expandRow(createdTrip.tripId);
      this.selectRow(createdTrip.tripId);
      // Updating count of records
      this.tripsGrid.rowAdded.emit();
      // Calling the trip service after some seconds in order to set the generated Trip Number and Hiding the 3 dots icon
      setTimeout(() => {}, 1000 * this.TRIP_NUMBER_WAIT_SECONDS);
    } else {
      this.tripsGrid.updateRow(createdTrip, createdTrip.tripId);
      // Expanding the new trip by default
      this.tripsGrid.expandRow(createdTrip.tripId);
      this.selectRow(createdTrip.tripId);
      this.reloadTripEvents({ trip: createdTrip, reloadTrip: false });
    }
    // Pinning the just created trip
    this.tripsGrid.pinRow(createdTrip.tripId);
  }

  /**
   * Method called when user has updated an existing Trip
   */
  onTripUpdated(updatedTrip: Trip): void {
    this.tripsGrid.updateRow(updatedTrip, updatedTrip.tripId);
  }

  onTripIdUpdated(tripId: string): void {
    /*this.subs.sink = this.tripsService.getTrip(tripId).subscribe((tripResp) => {
      this.tripsGrid.updateRow(tripResp, tripId);
    });*/
  }

  /**
   * Method called when user has deleted a Trip
   */
  onTripDeleted(tripId: string): void {
    this.deleteTripRow(tripId);
  }

  onEventRemoved(removeInfo: { tripId: string; events: TripEvent[] }): void {
    const foundTrip = this.tripsData.find(
      (currentTrip) => currentTrip.tripId === removeInfo?.tripId
    );
    if (foundTrip) {
      this.reloadTripEvents({ trip: foundTrip });
    }
  }

  /**
   *  Based the tab selected (Driver, Truck, Trailer) resource will be shown
   */
  refreshTabContent(selectedChoice: ResourceInformationTab): void {
    this.openResourceboard.emit(selectedChoice);
  }

  private selectRow(tripId: string, goToRow?: boolean) {
    goToRow = goToRow === undefined || goToRow === null ? false : goToRow;
    this.tripsGrid.deselectAllRows();
    const row: RowType = this.tripsGrid.getRowByKey(tripId);
    if (row) {
      row.selected = true;
      if (goToRow) {
        this.tripsGrid.navigateTo(row.index);
      }
    }
  }

  // Deselecting rows when a trip events grid row is selected
  tripEventsRowSelected(): void {
    this.tripsGrid.deselectAllRows();
  }

  // Deselecting trip event grid rows when a row is selected
  handleRowSelection(): void {
    const expandedTrip = this.tripsData.find((t) => t.isExpanded);
    if (expandedTrip) {
      const tripDetail = this.tripDetailComponents.find(
        (c) =>
          c?.dataItem?.tripId === expandedTrip.tripId && !!c.tripEventComponent
      );
      if (tripDetail) {
        tripDetail.tripEventComponent.deselectAllRows();
      }
    }
  }

  /**
   * Shows the context menu for trips
   */
  showTripsContextMenu(
    eventArgs: IGridCellEventArgs,
    contextMenu: ContextMenuComponent
  ): void {
    eventArgs.event.preventDefault();
    this.selectRow(eventArgs.cell.row.rowID);
    // Need to manually trigger because it isn't triggered by the right click by it self
    this.handleRowSelection();

    const selectedTrip = eventArgs.cell.row.data as Trip;
    const contextMenuItems: ContextMenuItem[] = [
      {
        itemId: TripItemActions.Deletion,
        itemText: 'Delete Trip'
      }
    ];
    const mouseEvent = eventArgs.event as MouseEvent;
    contextMenu.show({
      xPosition: mouseEvent.clientX,
      yPosition: mouseEvent.clientY,
      menuItems: contextMenuItems,
      associatedEntity: selectedTrip
    });
  }

  /**
   * Method triggered once user has clicked on a context menu item
   * @param contextItem
   */
  onTripContextItemClicked(contextItem: {
    selectedItem: ContextMenuItem;
    associatedEntity: Trip;
  }): void {}

  onHeaderClick(event: PointerEvent, column: IgxColumnComponent): void {
    const element = event.target as HTMLElement;
    if (!column.sortable || element.draggable) {
      return;
    }
    setTimeout(() => column.headerCell.onSortingIconClick(event));
  }

  rowToggle(event: IRowToggleEventArgs) {
    // Detecting previously expanded trips
    let prevExpandedTrips: Trip[];
    if (event.expanded) {
      prevExpandedTrips = this.tripsData.filter((t) => t.isExpanded);
    } else {
      prevExpandedTrips = [];
    }

    // Actions for all other previously expanded trips
    if (prevExpandedTrips.length) {
      prevExpandedTrips.forEach((expandedTrip) => {
        // Releasing any trip events from memory
        expandedTrip.events = null;
        // Collapsing the trip
        expandedTrip.isExpanded = false;
        this.tripsGrid.collapseRow(expandedTrip.tripId);
        // Calling detectChanges is necessary so the component gets destroyed
        this.detectChangesForTripDetails(expandedTrip.tripId);
      });
    }

    // Actions to be done for the current trip/row that was toggled (expanded/collapsed)
    const currentTrip = this.tripsData.find((t) => t.tripId === event.rowID);
    if (currentTrip) {
      currentTrip.isExpanded = event.expanded;
      if (currentTrip.isExpanded) {
        this.selectRow(event.rowID, true);
      } else {
        // Calling detectChanges is necessary so the component gets destroyed
        this.detectChangesForTripDetails(currentTrip.tripId);
      }
    }
  }
}
