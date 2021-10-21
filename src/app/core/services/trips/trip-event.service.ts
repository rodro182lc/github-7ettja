import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvService } from '../env.service';
import { forkJoin, Observable, of } from 'rxjs';
import { concatMap, map, switchMap } from 'rxjs/operators';
import { TripEvent } from '@shared/models/trips/trip-event.model';
import { EventType } from '@shared/models/trips/event-type.model';
import { ApiResponse } from '@shared/models/api-response.model';
import { EventUpsert } from '@shared/models/trips/event-upsert.model';
import { Location } from '@shared/models/trips/location.model';
import { ProbillDetails } from '@shared/models/trips/probill-details.model';
import { ProbillDetailsDto } from '@shared/dtos/trips/probill-details.dto';
import { EventDto } from '@shared/dtos/trips/event.dto';
import { TripEventUpsertDto } from '@shared/dtos/trips/event-upsert.dto';
import { ObservableStore } from '@codewithdan/observable-store';
import { StoreState } from '@shared/models/store-state.model';
import { ContextMenuItem } from '@shared/models/context-menu-item.model';
import { Events } from 'app/trips/enumerations/events.enum';
import {
  EventActionTypes,
  EVENT_ACTIONS
} from 'app/trips/enumerations/event-action.enum';
import { EventToMarkPlanned } from '@shared/models/trips/event-to-mark-planned.model';
import { EventToMarkPlannedDto } from '@shared/dtos/trips/event-to-mark-planned.dto';
import { TripEventDto } from '@shared/dtos/trips/trip-event.dto';
import { ResponseStatus } from '@shared/enumerations/core/response-status.enum';
import { LocationDto } from '@shared/dtos/map-data/location.dto';
import { EventLocationInformation } from '@shared/models/trips/event-location-information.model';
import { EventLocationInformationDto } from '@shared/dtos/trips/event-location-information.dto';
import { EventLocationSpecialInstruction } from '@shared/models/trips/event-location-special-instruction.model';
import { EventLocationSpecialInstructionDto } from '@shared/dtos/trips/event-location-special-instruction.dto';
import { EventInfoDto } from '@shared/dtos/trips/event-info.dto';
import { EventInfo } from '@shared/models/trips/event-info.model';
import { DateTimeHelper } from '@shared/helpers/date-time.helper';
import { EventNumberLabel } from 'app/trips/enumerations/event-number-label.enum';
import { CriteriaDto } from '@shared/dtos/driver-data/criteria.dto';
import { SearchDto } from '@shared/dtos/trips/search.dto';
import { ProbillStatusDto } from '@shared/dtos/trips/ProbillStatus.dto';
import { ProbillStatus } from '@shared/models/trips/probill-status.dto';
import { ProbillStatusTypes } from 'app/trips/enumerations/probill-status-types.enum';
import { CriteriaTypes } from 'app/trips/enumerations/criteria-types.enum';
import { Trip } from '@shared/models/trips/trip.model';
import { TripIconsService } from './trip-icons.service';
import { TripAuxiliaryItems } from 'app/trips/enumerations/trip-auxiliary-items.enum';
import { ProbillEventStatuses } from 'app/trips/enumerations/probill-event-statuses.enum';
import { tripEventData } from '../../../../../mocks/data/trip/tripEvents';

@Injectable({
  providedIn: 'root'
})
export class TripEventsService extends ObservableStore<StoreState> {
  private readonly ADD = 'Add';
  private readonly PICKUP = Events.Pickup.toLowerCase();
  private readonly DELIVER = Events.Deliver.toLowerCase();
  private readonly PROBILL_MISSING = ProbillEventStatuses.Missing.toLowerCase();
  private readonly PROBILL_WINDOW = ProbillEventStatuses.Window.toLowerCase();

  constructor(
    private environment: EnvService,
    private http: HttpClient,
    private tripIcons: TripIconsService
  ) {
    super({ trackStateHistory: true });
  }

  /**
   * Get the events for a given tripId
   * @returns Array of trip events
   */
  getTripEvents(tripId: string, trip?: Trip): Observable<any[]> {
    return of(tripEventData);
  }

  /**
   * Get the events for a given trip
   * @returns Array of trip events
   */
  getEventsForTrip(trip: Trip): Observable<TripEvent[]> {
    return this.getTripEvents(trip.tripId, trip);
  }

  private setEventIcons(tripEvent: TripEvent) {
    // Icons initialized
    tripEvent.icons = {
      confirmedAppointment: false,
      missingAppointment: false
    };

    // If trip doesn't have pending actions info then no icons will be displayed
    if (!tripEvent?.trip?.pendingActions?.length) {
      return;
    }

    // Icons only apply for pickup and deliver
    const eventName = tripEvent?.eventName?.toLowerCase();
    if (eventName !== this.PICKUP && eventName !== this.DELIVER) {
      return;
    }

    // Getting the probill status based on event type
    let probillStatus = '';
    if (eventName === this.PICKUP) {
      probillStatus = this.tripIcons.getActionByType(
        tripEvent.trip,
        TripAuxiliaryItems.ProbillPickUpInfo
      );
    }
    if (eventName === this.DELIVER) {
      probillStatus = this.tripIcons.getActionByType(
        tripEvent.trip,
        TripAuxiliaryItems.ProbillDeliverInfo
      );
    }

    // Setting final value for each icon
    tripEvent.icons.missingAppointment = probillStatus === this.PROBILL_MISSING;
    tripEvent.icons.confirmedAppointment =
      probillStatus === this.PROBILL_WINDOW;
  }

  /**
   * Retrieves the latest EventTypes as they're stored in the DB
   * @returns - Latest EventTypes from API
   */
  private getEventTypesFromDB(): Observable<EventType[]> {
    return this.http
      .get<ApiResponse<EventDto[]>>(
        `${this.environment.apiUrl}/trip/api/v1/EventTypes`
      )
      .pipe(
        map((response: ApiResponse<EventDto[]>) => {
          let models: EventType[] = [];
          if (
            response?.status === ResponseStatus.Success &&
            response?.result?.length
          ) {
            models = automapper.map(
              'EventDto',
              'EventTypeModel',
              response.result
            );
            this.setState(
              { eventTypes: models },
              EventStoreAction.GetEventTypes
            );
          }
          return models;
        })
      );
  }

  /**
   * Get events types list
   * @returns Array of event types
   */
  getEventTypes(): Observable<EventType[]> {
    const state = this.getState();
    if (state && state.eventTypes) {
      return of(state.eventTypes);
    } else {
      return this.getEventTypesFromDB();
    }
  }

  /**
   * Adds a new Event to the DB
   * @param addEventData - New Event to be saved
   * @returns - Result
   */
  upsertEvent(
    eventUpsertData: EventUpsert,
    actionType: EventActionTypes
  ): Observable<ApiResponse> {
    // In case of the edit, eventId is the id of the event being edited.
    // In case of the insert, eventId is the id of the event on which user intends to insert a new event
    const eventId = eventUpsertData?.eventId || '';
    if (
      actionType === EventActionTypes.Insert ||
      actionType === EventActionTypes.AddEvent
    ) {
      eventUpsertData.eventId = undefined;
    }
    const upsertTripEventDto: TripEventUpsertDto = automapper.map(
      'EventUpsertModel',
      'TripEventUpsertDto',
      eventUpsertData
    );

    // Call edit api if editing an event
    if (actionType === EventActionTypes.Edit) {
      // if it is an edit, we need to pass the whole DTO to the backend along with the user changes
      // retrieve the event from the DB
      const eventObj = this.getTripEventDtoById(eventId);
      return eventObj.pipe(
        concatMap((response: ApiResponse<TripEventDto>) => {
          if (response.status === ResponseStatus.Success && response?.result) {
            // Update the user changes here
            const tripEvent = response.result;
            tripEvent.localEtaDate = DateTimeHelper.stringTruncOffset(
              eventUpsertData.scheduledDateTime
            );
            tripEvent.localStartTime = DateTimeHelper.stringTruncOffset(
              eventUpsertData.startTime
            );
            tripEvent.localFinishTime = DateTimeHelper.stringTruncOffset(
              eventUpsertData.finishTime
            );
            let needTruck = false;
            let needTrailer = false;
            let needProbill = false;

            switch (eventUpsertData.eventType.toLowerCase()) {
              case Events.Acquire.toLowerCase():
              case Events.Release.toLowerCase():
                tripEvent.truck.id = eventUpsertData.eventNumber || '';
                needTruck = true;
                break;
              case Events.Pickup.toLowerCase():
              case Events.Deliver.toLowerCase():
              case Events.Load.toLowerCase():
              case Events.Unload.toLowerCase():
                tripEvent.probill.id = eventUpsertData.eventNumber || '';
                needProbill = true;
                break;
              case Events.Hook.toLowerCase():
              case Events.Drop.toLowerCase():
                tripEvent.trailer.id = eventUpsertData.eventNumber || '';
                needTrailer = true;
                break;
            }
            const tripEventUpdated = {
              externalId: tripEvent.externalId,
              localEtaDate: tripEvent.localEtaDate,
              eventType: { id: tripEvent.eventType.id },
              tripId: tripEvent.tripId,
              contractId: tripEvent.contractId,
              sequenceId: tripEvent.sequenceId,
              location: { id: eventUpsertData.location },
              ...(needTruck && { truck: { id: tripEvent.truck?.id } }),
              ...(needTrailer && { trailer: { id: tripEvent.trailer?.id } }),
              ...(needProbill && { probill: { id: tripEvent.probill?.id } }),
              eventLogStatus: { id: tripEvent.eventLogStatus?.id },
              localStartTime: tripEvent.localStartTime,
              localFinishTime: tripEvent.localFinishTime,
              id: tripEvent.id,
              createdBy: tripEvent.createdBy,
              createdOn: tripEvent.createdOn,
              isRowDeleted: tripEvent.isRowDeleted
            } as TripEventDto;
            return this.updateEvent(tripEventUpdated);
          }
          return of({
            message: '',
            status: ResponseStatus.Failure
          });
        })
      );
    }
    // Call add api if adding an event
    else if (actionType === EventActionTypes.AddEvent) {
      return this.http.post<ApiResponse>(
        `${this.environment.apiUrl}/trip/api/v1/Trips/${upsertTripEventDto.tripId}/tripEvents/add`,
        upsertTripEventDto
      );
    } else if (actionType === EventActionTypes.Insert) {
      // Call insert api if inserting an event
      return this.http.post<ApiResponse>(
        `${this.environment.apiUrl}/trip/api/v1/tripEvents/${eventId}/insert`,
        upsertTripEventDto
      );
    } else {
      return of({
        message: '',
        status: ResponseStatus.Failure
      });
    }
  }

  /**
   * Get the list of probill numbers.
   * @returns Array of probill numbers
   */
  getProbillNumbers(): Observable<ProbillDetails[]> {
    return this.http
      .get<ApiResponse<ProbillDetailsDto[]>>(
        `${this.environment.apiUrl}/probill/api/v1/probills`
      )
      .pipe(
        map((response: ApiResponse<ProbillDetailsDto[]>) => {
          return response?.result
            ? automapper.map(
                'ProbillDetailsDto',
                'ProbillDetailsModel',
                response.result
              )
            : [];
        })
      );
  }

  /**
   * Get the list of pending and loaded probills
   * @returns   Array of probill Details
   */
  getPendingAndLoadedProbills(): Observable<ProbillDetails[]> {
    return forkJoin({
      pendingProbills: this.getPendingProbills(),
      loadedProbills: this.getLoadedProbills()
    }).pipe(
      map((response) => {
        let probillDetails: ProbillDetails[] = [];
        if (response?.pendingProbills) {
          probillDetails = [...response?.pendingProbills];
        }
        if (response?.loadedProbills) {
          probillDetails = [...probillDetails, ...response?.loadedProbills];
        }
        return probillDetails;
      })
    );
  }
  /**
   * Get the list of loaded probill Details.
   * @returns Array of probill Details
   */
  getLoadedProbills(): Observable<ProbillDetails[]> {
    // Converting our filter criteria object into the object that's needed by the API

    const filterCriteriaObs = this.getProbillSearchCriteriaOfLoadedProbills();
    return filterCriteriaObs.pipe(
      concatMap((filterCriteriaObs) => {
        return this.http
          .post<ApiResponse<ProbillDetailsDto[]>>(
            `${this.environment.apiUrl}/probill/api/v1/probills/search`,
            filterCriteriaObs
          )
          .pipe(
            map((response: ApiResponse<ProbillDetailsDto[]>) => {
              const result = response?.result
                ? automapper.map(
                    'ProbillDetailsDto',
                    'ProbillDetailsModel',
                    response.result
                  )
                : [];
              return result;
            })
          );
      })
    );
  }

  /**
   * Get the list of pending probill Details.
   * @returns Array of probill Details
   */
  getPendingProbills(): Observable<ProbillDetails[]> {
    const filters: CriteriaDto[] = [];
    const searchCriteria: SearchDto = {
      filters
    };
    return this.http
      .post<ApiResponse<ProbillDetailsDto[]>>(
        `${this.environment.apiUrl}/probill/api/v1/probills/search/pending`,
        searchCriteria
      )
      .pipe(
        map((response: ApiResponse<ProbillDetailsDto[]>) => {
          const result = response?.result
            ? automapper.map(
                'ProbillDetailsDto',
                'ProbillDetailsModel',
                response.result
              )
            : [];
          return result;
        })
      );
  }

  /**
   * Getting the probill search criteria and converting them into the object that's needed by the API
   */
  private getProbillSearchCriteriaOfLoadedProbills(): Observable<SearchDto> {
    return this.getProbillStatuses().pipe(
      map((response: ProbillStatusDto[]) => {
        const result = response
          ? automapper.map('ProbillStatusDto', 'ProbillStatusModel', response)
          : [];

        let probillPendingStatusid: string[] = [];
        result.forEach((probillStatus: ProbillStatusDto) => {
          if (
            probillStatus.name.toLowerCase() ===
              ProbillStatusTypes.Loaded.toLowerCase() ||
            probillStatus.name.toLowerCase() ===
              ProbillStatusTypes.PickedUp.toLowerCase() ||
            probillStatus.name.toLowerCase() ===
              ProbillStatusTypes.Dropped.toLowerCase()
          ) {
            probillPendingStatusid.push(probillStatus.id);
          }
        });

        const criteria: CriteriaDto = {
          criteria: CriteriaTypes.ProbillStatus,
          ids: probillPendingStatusid
        };
        const filters: CriteriaDto[] = [];
        filters.push(criteria);
        const searchCriteria: SearchDto = {
          filters
        };
        return searchCriteria;
      })
    );
  }

  /**
   * Get the list of all locations matching the search text
   * @param searchText text to be matched in the locations
   * @returns Array of Locations.
   */
  getLocationsList(searchText: string): Observable<Location[]> {
    return this.http
      .get<ApiResponse<LocationDto[]>>(
        `${this.environment.apiUrl}/fleet/api/v1/locations/search?name=${searchText}`
      )
      .pipe(
        map((response: ApiResponse<LocationDto[]>) => {
          return response?.result
            ? automapper.map('LocationDto', 'LocationModel', response?.result)
            : [];
        })
      );
  }

  /**
   * Mark the selected trip event planned matches the given tripiId
   * @param eventInfo Id of the Event To Mark Planned
   */
  markEventPlanned(eventInfo: EventToMarkPlanned): Observable<ApiResponse> {
    const markEventPlannedInfoDto: EventToMarkPlannedDto = automapper.map(
      'EventToMarkPlannedModel',
      'EventToMarkPlannedDto',
      eventInfo
    );
    return this.http.put<ApiResponse>(
      `${this.environment.apiUrl}/trip/api/v1/Trips/markEventPlanned?eventId=${eventInfo.eventId}`,
      markEventPlannedInfoDto
    );
  }

  /**
   *
   * @param eventType Type of the event for which userActions are required
   * @returns UserActions
   */
  getUserActions(eventType: string): ContextMenuItem[] {
    let actionTypes = EVENT_ACTIONS;
    switch (eventType.toLowerCase()) {
      // Acquire Event
      case Events.Acquire.toLowerCase():
        // Remove option that are not applicable
        actionTypes = actionTypes.filter(
          (action) =>
            action.key !== EventActionTypes.Insert &&
            action.key !== EventActionTypes.SwitchTrailer &&
            action.key !== EventActionTypes.ViewProbill &&
            action.key !== EventActionTypes.OrderHistoryNotes &&
            action.key !== EventActionTypes.ApplySealNumber
        );
        break;
      // Hook Event & Drop Event
      case Events.Hook.toLowerCase():
      case Events.Drop.toLowerCase():
        // Remove option that are not applicable
        actionTypes = actionTypes.filter(
          (action) =>
            action.key !== EventActionTypes.SwitchTruck &&
            action.key !== EventActionTypes.ViewProbill &&
            action.key !== EventActionTypes.OrderHistoryNotes
        );

        if (eventType === Events.Drop.toLowerCase()) {
          // Remove Switch Trailer option if it is Drop Event
          actionTypes = actionTypes.filter(
            (action) => action.key !== EventActionTypes.SwitchTrailer
          );
        }

        break;
      // Pickup Event & Deliver Event
      case Events.Pickup.toLowerCase():
      case Events.Deliver.toLowerCase():
        // Remove option that are not applicable
        actionTypes = actionTypes.filter(
          (action) =>
            action.key !== EventActionTypes.SwitchTruck &&
            action.key !== EventActionTypes.SwitchTrailer &&
            action.key !== EventActionTypes.UpdateLocationInformation
        );
        break;
      // Load Event, Unload Event & Border event
      case Events.Load.toLowerCase():
      case Events.Unload.toLowerCase():
      case Events.Border.toLowerCase():
        // Remove option that not applicable
        actionTypes = actionTypes.filter(
          (action) =>
            action.key !== EventActionTypes.SwitchTruck &&
            action.key !== EventActionTypes.SwitchTrailer &&
            action.key !== EventActionTypes.ViewProbill &&
            action.key !== EventActionTypes.OrderHistoryNotes
        );
        break;
      // Release Event
      case Events.Release.toLowerCase():
        // Remove option that are not applicable
        actionTypes = actionTypes.filter(
          (action) =>
            action.key !== EventActionTypes.SwitchTruck &&
            action.key !== EventActionTypes.SwitchTrailer &&
            action.key !== EventActionTypes.ViewProbill &&
            action.key !== EventActionTypes.OrderHistoryNotes &&
            action.key !== EventActionTypes.ApplySealNumber
        );
        break;
    }

    // Remove Mark Event Planned option.
    actionTypes = actionTypes.filter(
      (action) => action.key !== EventActionTypes.MarkPlanned
    );

    // Create the context menu items array with the applicable options
    const menuItems: ContextMenuItem[] = [];

    actionTypes.forEach((action) => {
      const item: ContextMenuItem = {
        itemId: action.key,
        itemText: action.value.itemText,
        needSeparator: action.value.needSeparator
      };
      menuItems.push(item);
    });

    return menuItems;
  }

  /**
   * Get the event associated with an event in the selected trip
   * @returns Array of trip events
   */
  getSubsequentEvents(eventId: string): Observable<TripEvent[]> {
    return this.http
      .get<ApiResponse<TripEventDto[]>>(
        `${this.environment.apiUrl}/trip/api/v1/TripEvents/${eventId}/DeleteOptions`
      )
      .pipe(
        map((response: ApiResponse<TripEventDto[]>) => {
          if (response?.status === ResponseStatus.Success && response?.result) {
            const model: TripEvent[] = automapper.map(
              'TripEventDto',
              'TripEventModel',
              response.result
            );
            return model;
          }
          return [];
        })
      );
  }

  /**
   * Removes the event from trip that matches the selected eventId
   * @param event - EventId
   */
  removeEventFromTrip(eventId: string): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(
      `${this.environment.apiUrl}/trip/api/v1/TripEvents/${eventId}/ForceDelete`
    );
  }

  validateSelectedEventNumber(
    eventUpsertData: EventUpsert,
    actionType: string,
    numberLabel: string | null
  ): Observable<boolean> {
    const upsertTripEventDto: TripEventUpsertDto = automapper.map(
      'EventUpsertModel',
      'TripEventUpsertDto',
      eventUpsertData
    );
    let subUrl = ``;
    // If this is an edit event action
    if (
      actionType.toLowerCase() === EventActionTypes.Edit.toLowerCase() ||
      actionType.toLowerCase() === EventActionTypes.SwitchTruck.toLowerCase() ||
      actionType.toLowerCase() === EventActionTypes.SwitchTrailer.toLowerCase()
    ) {
      switch (numberLabel) {
        case EventNumberLabel.Truck:
          subUrl = `TruckAvailable`;
          break;
        case EventNumberLabel.Trailer:
          subUrl = `TrailerAvailable`;
          break;
        case EventNumberLabel.Probill:
          subUrl = `ProbillAvailable`;
          break;
      }
      return this.http
        .get<ApiResponse<boolean>>(
          `${this.environment.apiUrl}/trip/api/v1/TripEvents/${eventUpsertData.eventId}/${subUrl}/${eventUpsertData.eventNumber}`
        )
        .pipe(
          map((response: ApiResponse<boolean>) => {
            if (response.status === ResponseStatus.Success) {
              const validationResponse = response?.result || false;
              return validationResponse;
            } else {
              return false;
            }
          })
        );
    } else if (
      actionType.toLowerCase() === EventActionTypes.AddEvent.toLowerCase()
    ) {
      // call add api
      subUrl = `/trip/api/v1/Trips/${eventUpsertData.tripId}/TripEvents/Validate/Add`;
    } else {
      // call insert api
      subUrl = `/trip/api/v1/TripEvents/validate/Insert/${eventUpsertData.eventId}`;
    }

    return this.http
      .post<ApiResponse<boolean>>(
        `${this.environment.apiUrl}${subUrl}`,
        upsertTripEventDto
      )
      .pipe(
        map((response: ApiResponse<boolean>) => {
          if (response.status === ResponseStatus.Success) {
            const validationResponse = response?.result || false;
            return validationResponse;
          } else {
            return false;
          }
        })
      );
  }

  getTripEventById(eventId: string): Observable<TripEvent | null> {
    return this.getTripEventDtoById(eventId).pipe(
      map((response: ApiResponse<TripEventDto>) => {
        if (response?.status === ResponseStatus.Success && response.result) {
          const model: TripEvent = automapper.map(
            'TripEventDto',
            'TripEventModel',
            response.result
          );
          return model;
        } else {
          return null;
        }
      })
    );
  }

  getTripEventDtoById(eventId: string): Observable<ApiResponse<TripEventDto>> {
    return this.http.get<ApiResponse<TripEventDto>>(
      `${this.environment.apiUrl}/trip/api/v1/TripEvents/${eventId}`
    );
  }

  getValidEventTypes(
    actionType: EventActionTypes,
    eventId: string,
    tripId: string
  ): Observable<EventType[]> {
    //  // event types for "Edit" option
    if (
      actionType.toLowerCase() === EventActionTypes.Edit.toLowerCase() ||
      actionType.toLowerCase() === EventActionTypes.SwitchTruck.toLowerCase() ||
      actionType.toLowerCase() === EventActionTypes.SwitchTrailer.toLowerCase()
    ) {
      // return all events
      return this.getEventTypes();
    } else {
      let apiUrl = ``;
      switch (actionType.toLowerCase()) {
        case EventActionTypes.AddEvent.toLowerCase():
          // event types for "Add Event" option
          apiUrl = `${this.environment.apiUrl}/trip/api/v1/Trips/${tripId}/TripEvents/AddOptions`;
          break;
        case EventActionTypes.Insert.toLowerCase():
          // event types for "Insert" option
          apiUrl = `${this.environment.apiUrl}/trip/api/v1/TripEvents/${eventId}/InsertOptions`;
          break;
      }

      return this.http.get<ApiResponse<EventDto[]>>(apiUrl).pipe(
        map((response: ApiResponse<EventDto[]>) => {
          const model: EventType[] = response?.result
            ? automapper.map('EventDto', 'EventTypeModel', response.result)
            : [];
          return model;
        })
      );
    }
  }

  /**
   *
   * @param tripEventId Id of the trip Event for which EventLocationInformation are required
   * @returns Event Location Information
   */
  getEventLocationInformation(
    tripEventId: string
  ): Observable<EventLocationInformation> {
    return this.http
      .get<ApiResponse<EventLocationInformationDto>>(
        `${this.environment.apiUrl}/trip/api/v1/TripEvents/EventLocationInformation/${tripEventId}`
      )
      .pipe(
        map((response: ApiResponse<EventLocationInformationDto>) => {
          const model: EventLocationInformation = automapper.map(
            'EventLocationInformationDto',
            'EventLocationInformationModel',
            response?.result
          );
          return model;
        })
      );
  }

  /**
   *
   * @param tripEventId Id of the trip Event for which Event Location Special Instructions are required
   * @returns Event Location Information
   */
  getEventLocationSpecialInstructions(
    tripEventId: string
  ): Observable<EventLocationSpecialInstruction[]> {
    return this.http
      .get<ApiResponse<EventLocationSpecialInstructionDto[]>>(
        `${this.environment.apiUrl}/trip/api/v1/TripEvents/EventLocationSpecialInstructions/${tripEventId}`
      )
      .pipe(
        map((response: ApiResponse<EventLocationSpecialInstructionDto[]>) => {
          if (response?.status === ResponseStatus.Success && response?.result) {
            const model: EventLocationSpecialInstruction[] = automapper.map(
              'EventLocationSpecialInstructionDto',
              'EventLocationSpecialInstructionModel',
              response.result
            );
            return model;
          }
          return [];
        })
      );
  }

  /**
   * Save the EventLocationInformation
   * @param eventLocationInformation event Location Information details to save
   * @returns response indicating if the save operation was successfull or not
   */
  saveEventLocationInformation(
    eventLocationInformation: EventLocationInformation
  ): Observable<ApiResponse> {
    const eventLocationInformationDto: EventLocationInformationDto =
      automapper.map(
        'EventLocationInformationModel',
        'EventLocationInformationDto',
        eventLocationInformation
      );
    return this.http.put<ApiResponse>(
      `${this.environment.apiUrl}/trip/api/v1/EventLocationInformation`,
      eventLocationInformationDto
    );
  }

  /**
   * Get trip event warning for add, insert and delete.
   * @param eventId - Event Id
   * @param actionType - Add, Insert or Delete
   * @returns - Warning message
   */
  getTripEventWarning(
    eventId: string,
    actionType: EventActionTypes
  ): Observable<ApiResponse> {
    switch (actionType) {
      case EventActionTypes.Delete:
        return this.http.get<ApiResponse>(
          `${this.environment.apiUrl}/trip/api/v1/Trips/${eventId}/TripEvents/deleteEventWarning`
        );

      case EventActionTypes.AddEvent:
        return this.http.get<ApiResponse>(
          `${this.environment.apiUrl}/trip/api/v1/Trips/${eventId}/TripEvents/addEventWarning`
        );

      case EventActionTypes.Insert:
        return this.http.get<ApiResponse>(
          `${this.environment.apiUrl}/trip/api/v1/Trips/${eventId}/TripEvents/insertEventWarning`
        );
    }
    return of({
      message: '',
      status: ResponseStatus.Failure
    });
  }

  /**
   *
   * @param tripEventId EventID : It may be last eventId or selected eventId, depending on the action type
   */
  getTripResources(tripEventId: string): Observable<EventInfo> {
    return this.http
      .get<ApiResponse<EventInfoDto[]>>(
        `${this.environment.apiUrl}/trip/api/v1/TripEvents/${tripEventId}/TripResources`
      )
      .pipe(
        map((response: ApiResponse<EventInfoDto[]>) => {
          return response?.result
            ? automapper.map('EventInfoDto', 'EventInfoModel', response.result)
            : null;
        })
      );
  }

  updateEvent(teDto: TripEventDto): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(
      `${this.environment.apiUrl}/trip/api/v1/tripEvents`,
      teDto
    );
  }

  /**
   * Retrieves the latest Probill Status types as they're stored in the DB
   * @returns - Latest Probill Status from API
   */
  private getProbillStatusesFromDB(): Observable<ProbillStatus[]> {
    return this.http
      .get<ApiResponse<ProbillStatusDto[]>>(
        `${this.environment.apiUrl}/probill/api/v1/ProbillStatuses`
      )
      .pipe(
        map((response: ApiResponse<ProbillStatusDto[]>) => {
          let models: ProbillStatus[] = [];
          if (response && response.result && response.result.length) {
            models = automapper.map(
              'ProbillStatusDto',
              'ProbillStatusModel',
              response.result
            );
            this.setState(
              { probillStatuses: models },
              ProbillStatusStoreAction.GetProbillStatuses
            );
          }
          return models;
        })
      );
  }

  /**
   * Retrieves the Probill Status types coming either from the DB or cache
   * @returns - Array of Probill Status
   */
  getProbillStatuses(): Observable<ProbillStatus[]> {
    const state = this.getState();
    if (state && state.probillStatuses) {
      return of(state.probillStatuses);
    } else {
      return this.getProbillStatusesFromDB();
    }
  }

  updateEventStart(
    tripEventId: string,
    start?: Date | null
  ): Observable<ApiResponse> {
    return this.getTripEventDtoById(tripEventId).pipe(
      switchMap((tripEventResponse: ApiResponse<TripEventDto>) => {
        if (
          tripEventResponse?.status === ResponseStatus.Success &&
          tripEventResponse?.result
        ) {
          tripEventResponse.result.localStartTime =
            DateTimeHelper.stringTruncOffset(start);
          return this.updateEvent(tripEventResponse.result);
        }
        const failureResponse: ApiResponse = {
          message: tripEventResponse.message,
          status: tripEventResponse.status
        };
        return of(failureResponse);
      })
    );
  }

  updateEventEnd(
    tripEventId: string,
    end?: Date | null
  ): Observable<ApiResponse> {
    return this.getTripEventDtoById(tripEventId).pipe(
      switchMap((tripEventResponse: ApiResponse<TripEventDto>) => {
        if (
          tripEventResponse?.status === ResponseStatus.Success &&
          tripEventResponse?.result
        ) {
          tripEventResponse.result.localFinishTime =
            DateTimeHelper.stringTruncOffset(end);
          return this.updateEvent(tripEventResponse.result);
        }
        const failureResponse: ApiResponse = {
          message: tripEventResponse.message,
          status: tripEventResponse.status
        };
        return of(failureResponse);
      })
    );
  }

  updateEventDates(
    tripEventId: string,
    start?: Date | null,
    end?: Date | null
  ): Observable<ApiResponse> {
    return this.getTripEventDtoById(tripEventId).pipe(
      switchMap((tripEventResponse: ApiResponse<TripEventDto>) => {
        if (
          tripEventResponse?.status === ResponseStatus.Success &&
          tripEventResponse?.result
        ) {
          tripEventResponse.result.localStartTime =
            DateTimeHelper.stringTruncOffset(start);
          tripEventResponse.result.localFinishTime =
            DateTimeHelper.stringTruncOffset(end);
          return this.updateEvent(tripEventResponse.result);
        }
        const failureResponse: ApiResponse = {
          message: tripEventResponse.message,
          status: tripEventResponse.status
        };
        return of(failureResponse);
      })
    );
  }

  validateBatch(
    eventUpsertBatchData: EventUpsert[],
    actionType: EventActionTypes
  ): Observable<boolean> {
    const upsertTripEventDto: TripEventUpsertDto = automapper.map(
      'EventUpsertModel',
      'TripEventUpsertDto',
      eventUpsertBatchData
    );
    let subUrl =
      actionType === EventActionTypes.AddEvent ? this.ADD : actionType;

    let url = `/trip/api/v1/Trips/${eventUpsertBatchData[0].tripId}/TripEvents/Validate/Batch${subUrl}`;
    return this.http
      .post<ApiResponse<boolean>>(
        `${this.environment.apiUrl}${url}`,
        upsertTripEventDto
      )
      .pipe(
        map((response: ApiResponse<boolean>) => {
          if (response.status === ResponseStatus.Success) {
            const validationResponse = response?.result || false;
            return validationResponse;
          } else {
            return false;
          }
        })
      );
  }
}
/**
 * Name of the Actions that can be used to trace in the state history.
 */
enum EventStoreAction {
  GetEventTypes = 'GetEventTypes'
}

enum ProbillStatusStoreAction {
  GetProbillStatuses = 'GetProbillStatuses'
}
